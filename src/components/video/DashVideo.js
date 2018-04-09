import invariant from 'invariant';
import PropTypes from 'prop-types';
import { MediaPlayer } from 'dashjs';
import VideoPlayerActions from '../../data/VideoPlayerActions';

import Video from './Video';

export const DashVideoEventKeys = ['retrieveManifest', 'reset'];

/**
 * Dash Adaptive Video Player
 * @see http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html
 */
export default class DashVideo extends Video {
  /**
   * Listen
   */
  componentDidMount() {
    Video.prototype.componentDidMount.call(this);
    // Extending Video.js listeners
    this.listeners = this.listeners
      .concat(DashVideoEventKeys
        .map(key => VideoPlayerActions
          .addChangeListener(key, this[key].bind(this))
        )
      );

    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.videoState.qualityIndex !== nextProps.videoState.qualityIndex) {
      this.updateQuality(nextProps.videoState.qualityIndex);
    }
    // Playlist mode to setup the nextvideo comes in
    if (this.props.src !== nextProps.src) {
      this.setup(nextProps);
    }
  }

  setup(props = this.props) {
    this.dashPlayer = new MediaPlayer().create();
    this.dashPlayer.on(MediaPlayer.events.STREAM_INITIALIZED, this.handleStreamInitialized, true);
    this.dashPlayer.on(MediaPlayer.events.PERIOD_SWITCH_COMPLETED, this.handlePeriodSwitch, true);
    this.dashPlayer.initialize(this.refs.video, props.src, false);
    this.setAutoPlay(props.autoPlay);
    this.dashPlayer.setInitialBitrateFor('video', props.initialBitrate);
    this.dashPlayer.setFastSwitchEnabled(true);
    this.dashPlayer.getDebug().setLogToBrowserConsole(props.setLogToBrowserConsole);
    this.dashPlayer.clearDefaultUTCTimingSources();
    this.dashPlayer.addUTCTimingSource('urn:mpeg:dash:utc:http-iso:2014', props.liveStreamingTimeURL);
    this.dashPlayerCreatedAt = new Date();
  }

  /**
 * Need to track when the stream is initialized so we can get the updated
 * birates
 */
  handleStreamInitialized() {
    VideoPlayerActions.streamInitialized();
  }

  handlePeriodSwitch(event) {
    VideoPlayerActions.periodSwitch(event);
  }

  /**
   * Plays the video
   * @see http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html#play__anchor
   */
  play() {
    if (!this.dashPlayer.isReady()) {
      return;
    }

    this.dashPlayer.play();
  }

  /**
   * This method will call pause on the native Video Element.
   */
  pause() {
    if (!this.dashPlayer.isReady()) {
      return;
    }

    this.dashPlayer.pause();
  }

  /**
   * Use this method to set the native Video Element's muted state.
   * Takes a Boolean that determines whether audio is muted. true if the audio is muted and false otherwise.
   */
  mute() {
    this.dashPlayer.setMute(true);
  }

  /**
   * Use this method to set the native Video Element's muted state.
   * Takes a Boolean that determines whether audio is muted. true if the audio is muted and false otherwise.
   */
  unmute() {
    this.dashPlayer.setMute(false);
  }

  /**
   * Retrieve the video's manifest
   * @param {String} url
   * @param {Function} callback
   */
  retrieveManifest(url, callback) {
    invariant(
      typeof url === 'string',
      'url must be a string'
    );
    invariant(
      typeof callback === 'function',
      'callback must be a function'
    );

    this.dashPlayer.retrieveManifest(url, callback);
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
    this.dashPlayer.setVolume(volume);
  }

  /**
   * Resets the dash player state. Should be called to clean up
   * any videos alreay setup
   */
  reset() {
    this.dashPlayer.reset();
  }

  /**
   * Sets the currentTime property of the attached video element.
   * If it is a live stream with a timeShiftBufferLength, then the DVR window offset will be automatically calculated.
   * {Number} currentTime
   */
  seek(currentTime) {
    invariant(
      !isNaN(currentTime),
      'currentTime is not a number'
    );
    this.dashPlayer.seek(currentTime);
  }

  /**
   * Set to false to prevent stream from auto-playing when the view is attached.
   * {Boolean} value
   */
  setAutoPlay(value) {
    this.dashPlayer.setAutoPlay(value);
    this.refs.video.autoplay = value;
  }

  /**
   * Get the state and update the stores
   */
  updateVideoState(video = this.refs.video) {
    VideoPlayerActions.updateDashState(video, this.dashPlayer);
  }

  updateQuality(qualityIndex) {
    if (typeof qualityIndex === 'number') {
      this.dashPlayer.setAutoSwitchQualityFor('video', false);
      this.dashPlayer.setQualityFor('video', qualityIndex);
    } else {
      this.dashPlayer.setAutoSwitchQualityFor('video', true);
    }
  }
}

DashVideo.defaultProps = {
  setLogToBrowserConsole: false,
  liveStreamingTimeURL: undefined
};

DashVideo.propTypes = {
  setLogToBrowserConsole: PropTypes.bool,
  liveStreamingTimeURL: PropTypes.string
};
