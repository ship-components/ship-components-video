
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Record } from 'immutable';

import VideoControlsButton from '../controls/VideoControlsButton';
import VideoPlayerActions from '../../data/VideoPlayerActions';

export default function MuteButton(props) {
  const {
    className,
    videoState: {
      isMuted
    }
  } = props;

  return (
    <VideoControlsButton
      className={classNames(className)}
      icon={isMuted ? 'volume_off' : 'volume_up'}
      onClick={() => {
        if (isMuted) {
          VideoPlayerActions.unmute();
        } else {
          VideoPlayerActions.mute();
        }
      }}
    />
  );
}

/**
 * Defaults
 */
MuteButton.defaultProps = {
  className: undefined,
  videoState: undefined
};

/**
 * Types
 */
MuteButton.propTypes = {
  className: PropTypes.string,
  videoState: PropTypes.instanceOf(Record)
};

