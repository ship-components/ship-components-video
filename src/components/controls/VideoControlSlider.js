
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import VideoControl from './VideoControl';

import css from './VideoControlSlider.css';

/**
 * Shows the current playback rate
 * @param {Object} props
 */
export default class VideoControlSlider extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      hover: false,
      dragging: false
    };

    // Bindings
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
  }

  /**
  * Cleanup
  */
  componentWillUnmount() {
    clearTimeout(this.leaveTimeoutId);
    clearTimeout(this.enterTimeoutId);
  }

  /**
   * Start the hover
   */
  handleMouseEnter() {
    clearTimeout(this.leaveTimeoutId);
    clearTimeout(this.enterTimeoutId);
    this.enterTimeoutId = setTimeout(() => {
      this.setState({
        hover: true
      });
    }, 500);
  }

  /**
   * End the hover
   */
  handleMouseLeave() {
    clearTimeout(this.leaveTimeoutId);
    clearTimeout(this.enterTimeoutId);
    this.leaveTimeoutId = setTimeout(() => {
      this.setState({
        hover: false
      });
    }, 500);
  }

  /**
   * User is dragging the slider
   */
  handleDragStart() {
    this.setState({
      dragging: true
    });
  }

  /**
   * User stops dragging
   */
  handleDragStop() {
    this.setState({
      dragging: false
    });
  }

  /**
   * Render
   */
  render() {
    const {
      props: {
        className,
        children
      },
      state: {
        hover,
        dragging
      }
    } = this;

    return (
      <VideoControl
        className={classNames(css.container, className, {
          [css.hover]: hover || dragging
        })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {React.Children.map(children, (child) => {
          if (!child || typeof child.type !== 'function') {
            return child;
          }
          return React.cloneElement(child, {
            onDragStart: this.handleDragStart,
            onDragStop: this.handleDragStop
          });
        })}
      </VideoControl>
    );
  }
}

/**
 * Defaults
 */
VideoControlSlider.defaultProps = {
  className: undefined
};

/**
 * Types
 */
VideoControlSlider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]).isRequired
};
