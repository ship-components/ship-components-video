
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Record} from 'immutable';

import VideoPlayerActions from '../../data/VideoPlayerActions';
import VideoControlSlider from '../controls/VideoControlSlider';

import Slider from './Slider';
import PlaybackRateOptions from '../../config/PlaybackRateOptions';

import css from './PlaybackRate.css';

/**
 * Shows the current playback rate
 * @param {Object} props
 */
export default function PlaybackRate(props) {
  const {
    className,
    visible,
    videoState: {
      playbackRate
    }
  } = props;

  if (!visible) {
    return null;
  }

  // Look up the rate in the options so we can get
  // the friendly label
  const currentRate = PlaybackRateOptions
    .find(option =>
      option.value === playbackRate
    );

  return (
    <VideoControlSlider className={classNames(css.container, className)}>
      <div
        className={css.value}
      >
        {currentRate ? currentRate.label : playbackRate}x
      </div>
      <Slider
        className={css.control}
        hideBar
        options={PlaybackRateOptions.map(option => option.value)}
        range={[PlaybackRateOptions[0].value, PlaybackRateOptions[PlaybackRateOptions.length - 1].value]}
        value={playbackRate}
        onChange={(event) => {
          VideoPlayerActions.playbackRate(event.target.value);
        }}
      />
    </VideoControlSlider>
  );
}

/**
 * Defaults
 */
PlaybackRate.defaultProps = {
  className: undefined,
  visible: false,
  videoState: undefined
};

/**
 * Types
 */
PlaybackRate.propTypes = {
  className: PropTypes.string,
  videoState: PropTypes.instanceOf(Record),
  visible: PropTypes.bool
};
