
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Record} from 'immutable';

import Slider from './Slider';

import VideoPlayerActions from '../../data/VideoPlayerActions';
import VideoControlSlider from './VideoControlSlider';
import VideoControlIcon from './VideoControlIcon';

import css from './VolumeButton.css';

/**
 * Controls the volume of the Video
 */
export default function VolumeButton(props) {
  const {
    className,
    videoState: {
      isMuted,
      volume
    }
  } = props;

  return (
    <VideoControlSlider className={classNames(className, css.container)}>
      <VideoControlIcon
        icon={isMuted || volume === 0 ? 'volume_off' : 'volume_up'}
        onClick={() => {
          VideoPlayerActions.toggleMute();
        }}
      />
      <Slider
        className={css.control}
        value={isMuted ? 0 : volume}
        onChange={(event) => {
          VideoPlayerActions.setVolume(event.target.value);
        }}
      />
    </VideoControlSlider>
  );
}

/**
 * Defaults
 */
VolumeButton.defaultProps = {
  className: undefined,
  videoState: undefined
};

/**
 * Types
 */
VolumeButton.propTypes = {
  className: PropTypes.string,
  videoState: PropTypes.instanceOf(Record)
};
