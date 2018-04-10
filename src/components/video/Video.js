import React, { Component } from 'react';
import classNames from 'classnames';
import invariant from 'invariant';
import PropTypes from 'prop-types';

import VideoPlayerActions from '../../data/VideoPlayerActions';

import css from './Video.css';

/**
 * HMTLVideoElementMethods
 */
export const VideoEventKeys = [
  'play',
  'pause',
  'playbackRate',
  'mute',
  'unmute',
  'volume',
  'seekByPercent',
  'seekByMilliseconds',
  'seek'
];

export default class Video extends Component {
  /**
   * Setup
   * @param Object} props
   */
  constructor(props) {
    super(props);

    [].concat(
      VideoEventKeys,
      [
        'updateVideoState',
        'handleClick'
      ]
    )
      .forEach((key) => {
        this[key] = this[key].bind(this);
      });
  }

  /**
   * Listen
   */
  componentDidMount() {
    // clean video player state before initializing
    VideoPlayerActions.reset();
    this.listeners = VideoEventKeys.map(key => VideoPlayerActions.addChangeListener(key, this[key]));
    this.updateVideoState();
    this.startOrResetVideoUpdateLoop();
    VideoPlayerActions.update({
      frameRate: this.props.frameRate
    });
  }

  /**
   * Update the framerate
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    VideoPlayerActions.update({
      frameRate: nextProps.frameRate
    });
  }

  /**
   * Cleanup
   */
  componentWillUnmount() {
    this.listeners.forEach(listener => listener.remove());
    clearInterval(this.videoProgressId);
  }

  /**
   * Seek to a specific percent in the video
   * @param {Number} percent
   */
  seekByPercent(percent) {
    invariant(
      !isNaN(percent) && percent >= 0 && percent <= 1,
      'percent is not number between 0 and 1'
    );
    this.seek(this.video.duration * percent);
  }

  /**
   * Seek to a specific point in the video by milliseconds
   * @param {Number} time
   */
  seekByMilliseconds(time) {
    this.seek(time / 1000);
  }

  /**
   * Seek to a specific time
   * @param {Number} currentTime
   */
  seek(currentTime) {
    invariant(
      !isNaN(currentTime),
      'currentTime is not a number'
    );
    this.video.currentTime = currentTime;
  }

  /**
  * Start or restart the loop that updates time and other video stats. We only
  * update it every 33 so the client responds faster. CSS transitions should
  * match this so the progress bar is still smooth
  */
  startOrResetVideoUpdateLoop() {
    clearInterval(this.videoProgressId);
    this.videoProgressId = setInterval(this.updateVideoState, 33);
  }

  /**
   * Helper function to quickly access the video html object
   */
  get video() {
    return this.refs.video;
  }

  /**
   * Play
   */
  play() {
    this.video.play();
  }

  /**
   * Toggle play state
   */
  togglePlay() {
    if (this.video.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  /**
   * Pause
   */
  pause() {
    this.video.pause();
  }

  /**
   * Set the playback speed of the video
   * @param {Number} playbackRate
   */
  playbackRate(playbackRate) {
    invariant(
      !isNaN(playbackRate),
      'playbackRate is not a number'
    );
    this.video.playbackRate = playbackRate;
  }

  /**
   * Mute the video
   */
  mute() {
    this.video.muted = true;
  }

  /**
   * Unmute the video
   */
  unmute() {
    this.video.muted = false;
  }

  /**
   * Set the volume of the video element
   * @param {Number} volume
   */
  volume(volume) {
    invariant(
      !isNaN(volume) && volume >= 0 && volume <= 1,
      'volume is not number between 0 and 1'
    );
    this.video.volume = volume;
  }

  /**
   * Get the state and update the stores
   */
  updateVideoState(video = this.refs.video) {
    VideoPlayerActions.updateState(video);
  }


  /**
   * find left x position of a dom node relative to client.
   * @param  {Object} node
   * @return {Number}      left edge x coordinate
   */
  findPos(key, node) {
    let val = node[key];
    while ((node = node.offsetParent)) {
      val += node[key];
    }
    return val;
  }

  /**
   * Calculates the click position relative to the native
   * video dimensions
   * @param {Event} event
   */
  calculateClickPosition(event) {
    const video = this.video;

    // Get mouse position
    const mouseX = event.pageX - this.findPos('offsetLeft', video);
    const mouseY = event.pageY - this.findPos('offsetTop', video);

    const {
      videoWidth,
      videoHeight,
      offsetWidth,
      offsetHeight
    } = this.video;

    const videoRatio = videoWidth / videoHeight;
    const containerRatio = offsetWidth / offsetHeight;

    let height = offsetHeight;
    let width = offsetWidth;
    if (containerRatio > videoRatio) {
      width = Math.floor(offsetHeight * videoRatio);
    } else {
      height = Math.floor(offsetWidth / videoRatio);
    }

    const widthPadding = Math.floor((offsetWidth - width) / 2);
    const heightPadding = Math.floor((offsetHeight - height) / 2);

    const scaleRatio = videoWidth / width;

    const x = (mouseX - widthPadding) * scaleRatio;
    const y = (mouseY - heightPadding) * scaleRatio;

    return {
      x,
      y
    };
  }

  /**
   * Handles clicks on the video
   * @param {Event} event
   */
  handleClick(event) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(event, this.calculateClickPosition(event));
    }

    // Let the prop prevent this
    if (!event.defaultPrevented) {
      this.togglePlay();
    }
  }

  /**
   * Render
   */
  render() {
    const {
      className,
      onError,
      onPlay,
      onPause,
      onCanPlay,
      onEnded,
      onLoadedMetadata,
      onCanPlayThrough,
      onSeeking,
      onWaiting,
      onContextMenu,
      autoPlay,
      src,
      loop
    } = this.props;
    return (
      <video
        className={classNames(className, css.container)}
        ref='video'
        src={src}
        autoPlay={autoPlay}
        onClick={this.handleClick}
        onCanPlay={onCanPlay}
        onCanPlayThrough={onCanPlayThrough}
        onError={onError}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onLoadedMetadata={onLoadedMetadata}
        onSeeking={onSeeking}
        onWaiting={onWaiting}
        onContextMenu={onContextMenu}
        loop={loop}
      />
    );
  }
}

/**
 * Defaults
 */
Video.defaultProps = {
  className: undefined,
  onClick: undefined,
  onError: undefined,
  onPlay: undefined,
  onPause: undefined,
  onCanPlay: undefined,
  onCanPlayThrough: undefined,
  onEnded: undefined,
  onLoadedMetadata: undefined,
  onSeeking: undefined,
  onWaiting: undefined,
  onContextMenu: undefined,
  containerHeight: undefined,
  containerWidth: undefined,
  src: undefined,
  frameRate: 30,
  autoPlay: false,
  loop: false
};

/**
 * Types
 */
Video.propTypes = {
  autoPlay: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onError: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onCanPlay: PropTypes.func,
  onCanPlayThrough: PropTypes.func,
  onEnded: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onSeeking: PropTypes.func,
  onWaiting: PropTypes.func,
  onContextMenu: PropTypes.func,
  src: PropTypes.string,
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  frameRate: PropTypes.number,
  loop: PropTypes.bool
};
