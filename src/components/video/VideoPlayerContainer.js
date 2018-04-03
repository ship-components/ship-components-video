import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import subscribe from 'ship-components-subscribe';
import { Record } from 'immutable';

import VideoPlayerStore from '../../data/VideoPlayerStore';
import VideoPlayerActions from '../../data/VideoPlayerActions';
import FullscreenService from '../../lib/FullscreenService';
import { VideoPlayerControls } from '../controls/VideoPlayerControls';

import css from './VideoPlayerContainer.css';

export class VideoPlayerContainer extends Component {

  /**
   * Setup
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      containerWidth: -1,
      containerHeight: -1,
      isMouseOver: false,
      isFullscreen: FullscreenService.getIsFullscreen()
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleFullScreenChange = this.handleFullScreenChange.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  /**
   * Start listening
   */
  componentDidMount() {
    this.updateDimensions();
    const { container } = this.refs;
    window.addEventListener('resize', this.updateDimensions);

    // Listeners all have the remove function to be called on unmount
    this.listeners = [
      'toggleFullscreen'
    ].map(key => VideoPlayerActions.addChangeListener(key, this[key]));
    this.listeners.push(
      FullscreenService.addEventListener(container, this.handleFullScreenChange)
    );
  }

  /**
   * Update dimensions
   */
  componentDidUpdate() {
    this.updateDimensions();
  }

  /**
   * Cleanup
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    this.listeners.forEach(listener => listener.remove());
    clearTimeout(this.isMouseOverTimeoutId);
  }

  /**
   * Look up the current dimensions of the container
   */
  getContainerSize() {
    if (!this.refs.container) {
      return {
        containerWidth: -1,
        containerHeight: -1
      };
    }

    return {
      containerWidth: parseInt(this.refs.container.clientWidth, 10),
      containerHeight: parseInt(this.refs.container.clientHeight, 10)
    };
  }

  /**
   * Update the state only if the dimensions have changed. This can cause
   * an infinite loop so be careful here
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
   * Listen to changes to the fullscreen state
   */
  handleFullScreenChange() {
    this.setState({
      isFullscreen: FullscreenService.getIsFullscreen()
    });
  }

  /**
   * Toggle fullscreen mode
   */
  toggleFullscreen() {
    /* NOTE: Fullscreen requests need to be called from within an event handler, otherwise they will be denied. */
    FullscreenService.toggleFullscreen(this.refs.container);
  }

  /**
   * Called when the mouse is over video player
   */
  handleMouseOver() {
    this.setState({
      isMouseOver: true
    });

    clearTimeout(this.isMouseOverTimeoutId);
    this.isMouseOverTimeoutId = setTimeout(() => {
      this.setState({
        isMouseOver: false
      });
    }, 2000);
  }

  /**
   * Render
   */
  render() {
    const {
      props: {
        className,
        children,
        videoState
      },
      state: {
        isFullscreen
      }
    } = this;

    const controlsComponent = React.Children.toArray(children).find(child => child.type === VideoPlayerControls && !child.props.row);
    const videoComponents = React.Children.toArray(children).filter(child => child.type !== VideoPlayerControls && !child.props.row);
    const rowComponents = React.Children.toArray(children).filter(child => child.props.row);

    const childProps = Object.assign({}, this.state, {
      videoState,
      onToggleFullscreen: this.toggleFullscreen
    });

    return (
      <div
        className={classNames(css.container, className, {
          [css.fullscreen]: isFullscreen
        })}
        ref='container'
        style={{
          height: '100%'
        }}
        onMouseOver={this.handleMouseOver}
        onMouseMove={this.handleMouseOver}
      >
        <div className={css.wrapper}>
          {!isNaN(this.state.containerWidth) && !isNaN(this.state.containerHeight) && this.state.containerWidth > -1 && this.state.containerHeight > -1 ?
            videoComponents.map((child) => {
              if (!child || typeof child.type !== 'function') {
                return child;
              }
              return React.cloneElement(child, childProps);
            })
            : null}
        </div>
        {rowComponents.map(child => React.cloneElement(child, childProps))}
        {controlsComponent && React.cloneElement(controlsComponent, childProps)}
      </div>
    );
  }
}

/**
 * Defaults
 */
VideoPlayerContainer.defaultProps = {
  className: undefined
};

/**
 * Types
 */
VideoPlayerContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]).isRequired,
  videoState: PropTypes.instanceOf(Record).isRequired
};

/**
 * Returns a Component that listens to a store and auto updates itself
 * @return    {React.Component}
 */
export default subscribe({
  WrappedComponent: VideoPlayerContainer,
  Store: VideoPlayerStore,
  selectData: store => store.getState(),
  dataKey: 'videoState'
});
