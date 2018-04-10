
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Record} from 'immutable';

import VideoPlayerActions from '../../data/VideoPlayerActions';
import VideoControlsButton from './VideoControlsButton';

export default function PlayButton(props) {
  const {
    className,
    videoState: {
      isPlaying
    }
  } = props;

  return (
    <VideoControlsButton
      className={classNames(className)}
      icon={isPlaying ? 'pause' : 'play_arrow'}
      onClick={() => {
        if (isPlaying) {
          VideoPlayerActions.pause();
        } else {
          VideoPlayerActions.play();
        }
      }}
    />
  );
}

/**
 * Defaults
 */
PlayButton.defaultProps = {
  className: undefined,
  videoState: undefined
};

/**
 * Types
 */
PlayButton.propTypes = {
  className: PropTypes.string,
  videoState: PropTypes.instanceOf(Record)
};
