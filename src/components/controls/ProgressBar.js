import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Record} from 'immutable';
import subscribe from 'ship-components-subscribe';

import VideoPlayerActions from '../../data/VideoPlayerActions';
import VideoPlayerTimeStore from '../../data/VideoPlayerTimeStore';

import css from './ProgressBar.css';

export class ProgressBar extends Component {

  /**
   * Setup
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: -1,
      containerHeight: -1,
      mouseDown: false,
      wasPlaying: false
    };

    this.scrubToPercent = this.scrubToPercent.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMoveScrub = this.handleMoveScrub.bind(this);
    this.getEventPosition = this.getEventPosition.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  /**
   * Listen
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  /**
 * Update
 */
  componentDidUpdate() {
    this.updateDimensions();
  }

  /**
   * Cleanup
   */
  componentWillUnmount() {
    VideoPlayerActions.update({
      isScrubbing: false
    });
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMoveScrub);
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Calculate where the click was relative to the progress bar and return
   * a percent we can pass to our parent
   * @param  {MouseEvent} event
   * @return {Number}
   */
  getEventPosition(event) {
    const {container} = this.refs;
    let el = container;
    const { offsetWidth } = el;
    let source = el;
    let offsetLeft = 0;
    while (source) {
      offsetLeft += source.offsetLeft;
      source = source.offsetParent;
    }

    return Math.max(0, Math.min(1, (event.pageX - offsetLeft) / offsetWidth));
  }

  /**
   * Update the container heights and widths
   */
  updateDimensions() {
    let { containerWidth, containerHeight } = this.getContainerSize();
    if ((!isNaN(containerWidth) && this.state.containerWidth !== containerWidth) || (!isNaN(containerHeight) && this.state.containerHeight !== containerHeight)) {
      this.setState({
        containerWidth,
        containerHeight
      });
    }
  }

  /**
   * Look up the props
   */
  getContainerSize() {
    const {
      refs: {
        container
      }
    } = this;

    if (!container) {
      return {
        containerWidth: -1,
        containerHeight: -1
      };
    }

    return {
      containerWidth: parseInt(container.clientWidth, 10),
      containerHeight: parseInt(container.clientHeight, 10)
    };
  }

  /**
   * Start the scrub and add some handlers so we can track the mouse outside
   * of the progress bar
   * @param  {MouseEvent} event
   */
  handleMouseDown(event) {
    let percent = this.getEventPosition(event);

    if (percent) {
      this.scrubToPercent(percent, event);
    }

    this.setState({
      mouseDown: true,
      wasPlaying: this.props.videoState.isPlaying
    });

    VideoPlayerActions.scrubStart();

    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMoveScrub);
    if (typeof this.props.onMouseDown === 'function') {
      this.props.onMouseDown(event);
    }
  }

  /**
   * End the scrub
   */
  handleMouseUp() {
    VideoPlayerActions.scrubStop({
      play: this.state.wasPlaying
    });

    this.setState({
      wasPlaying: false,
      mouseDown: false
    });

    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMoveScrub);
    if (this.props.onScrubEnd) {
      this.props.onScrubEnd();
    }
  }

  /**
   * Trigger the action to seek to someplace new by percent 0..1
   * @param {Number} percent
   */
  scrubToPercent(percent, event) {
    VideoPlayerActions.seekByPercent(percent);
    if (typeof this.props.onScrub === 'function') {
      this.props.onScrub(percent, event);
    }
  }

  /**
   * Update the scrub when we move the mouse regardless if its over then
   * progress containerWidth
   * @param  {MouseEvent} event
   */
  handleMoveScrub(event) {
    // Check to see if we're actually scrubbing or not
    if (!this.state.mouseDown) {
      return;
    }

    let percent = this.getEventPosition(event);
    if (percent) {
      this.scrubToPercent(percent, event);
    }
  }

  render() {
    const {
      props: {
        children,
        className,
        videoState,
        timeState,
        timeState: {
          progress,
          bufferedSections
        }
      },
      state: {
        mouseDown,
        containerHeight,
        containerWidth
      }
    } = this;

    return (
      <div
        ref='container'
        className={classNames(css.container, className, {
          [css.mouseDown] : mouseDown
        })}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.props.onMouseEnter}
        onMouseOver={this.props.onMouseOver}
        onMouseLeave={this.props.onMouseLeave}
      >
        {React.Children.map(children, (child) => {
          if (!child || typeof child.type !== 'function') {
            return child;
          }
          return React.cloneElement(child, {
            videoState,
            timeState,
            containerHeight,
            containerWidth
          });
        })}
        <div className={classNames(css.wrapper, css.buffered)}>
          {bufferedSections && bufferedSections.map(buff => (
            <div
              key={buff.key}
              className={css.bar}
              style={{
                left: `${buff.start}%`,
                width: `${buff.end - buff.start}%`
              }}
            />
          ))}
        </div>
        <div className={classNames(css.wrapper, css.progress)}>
          <div
            className={css.bar}
            style={{
              width: `${progress}%`
            }}
          />
        </div>
      </div>
    );
  }
}

/**
 * Defaults
 */
ProgressBar.defaultProps = {
  className: undefined,
  onScrub: undefined,
  onScrubEnd: undefined,
  onMouseDown: undefined,
  onMouseEnter: undefined,
  onMouseOver: undefined,
  onMouseLeave: undefined,
  children: null
};

/**
 * Types
 */
ProgressBar.propTypes = {
  onScrub: PropTypes.func,
  onScrubEnd: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseLeave: PropTypes.func,
  className: PropTypes.string,
  videoState: PropTypes.instanceOf(Record).isRequired,
  timeState: PropTypes.instanceOf(Record).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};

/**
 * Returns a Component that listens to a store and auto updates itself
 * @return    {React.Component}
 */
export default subscribe({
  WrappedComponent: ProgressBar,
  Store: VideoPlayerTimeStore,
  selectData: store => store.getState(),
  dataKey: 'timeState'
});
