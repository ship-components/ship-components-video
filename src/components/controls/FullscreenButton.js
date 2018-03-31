
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import VideoPlayerActions from '../../data/VideoPlayerActions';
import VideoControlsButton from './VideoControlsButton';

export default function FullscreenButton(props) {
  const {
    className,
    isFullscreen
  } = props;

  return (
    <VideoControlsButton
      className={classNames(className)}
      icon={isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
      onClick={() => {
        VideoPlayerActions.toggleFullscreen();
      }}
    />
  );
}

/**
 * Defaults
 */
FullscreenButton.defaultProps = {
  className: undefined
};

/**
 * Types
 */
FullscreenButton.propTypes = {
  className: PropTypes.string,
  isFullscreen: PropTypes.bool.isRequired
};
