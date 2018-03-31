import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Record} from 'immutable';

import css from './VideoPlayerControls.css';

export default function VideoPlayerControls(props) {
  const {
    className,
    children,
    autoHide,
    isMouseOver,
    visible,
    videoState,
    isFullscreen,
    videoState: {
      isPlaying
    }
  } = props;

  // In processing mode, controls shouldn't be visible
  if (!visible) {
    return null;
  }

  return (
    <div
      className={classNames(css.container, className, {
        [css.autoHide]: autoHide,
        [css.show]: isMouseOver || !isPlaying
      })}
    >
      {React.Children.map(children, (child) => {
        if (!child || typeof child.type !== 'function') {
          return child;
        }
        return React.cloneElement(child, {
          isFullscreen,
          videoState
        });
      })}
    </div>
  );
}

/**
 * Defaults
 */
VideoPlayerControls.defaultProps = {
  autoHide: false,
  isMouseOver: false,
  className: undefined,
  children: null,
  isFullscreen: false,
  videoState: undefined,
  visible: true
};

/**
 * Types
 */
VideoPlayerControls.propTypes = {
  autoHide: PropTypes.bool,
  isMouseOver: PropTypes.bool,
  className: PropTypes.string,
  isFullscreen: PropTypes.bool,
  visible: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
  videoState: PropTypes.instanceOf(Record)
};
