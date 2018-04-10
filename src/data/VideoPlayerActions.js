/**
 * These actions can be called from anywhere in the app
 * and control the video currently playing.
 */

// External
import Events from 'events';
import invariant from 'invariant';

// Internal
import VideoDispatcher from './VideoDispatcher';
import Constants from './VideoPlayerConstants';
import VideoPlayerStore from './VideoPlayerStore';
import VideoPlayerTimeStore from './VideoPlayerTimeStore';
import PlaybackRateOptions from '../config/PlaybackRateOptions';

export class VideoPlayerActions extends Events {
  constructor() {
    super();
    const self = this;

    // Re-emit the following events
    [
      'play',
      'pause',
      'mute',
      'unmute',
      'playbackRate',
      'volume',
      'seek',
      'seekByPercent',
      'seekByMilliseconds',
      'toggleFullscreen',
      'retrieveManifest'
    ]
      .forEach((key) => {
        this[key] = function emit() {
          const args = Array.prototype.slice.call(arguments);
          this.emit.apply(self, [key].concat(args));
        }.bind(this);
      });

    // Bindings
    [
      'togglePlay',
      'toggleMute',
      'step',
      'stepBack',
      'stepForward',
      'increasePlaybackRate',
      'decreasePlaybackRate',
      'resetPlaybackRate'
    ].forEach((key) => {
      this[key] = this[key].bind(this);
    });

    // Define keyboard shortcuts
    this.keyboardShortcuts = {
      // space
      32: this.togglePlay,
      // m
      77: this.toggleMute,
      //  left
      37: this.stepBack,
      // right
      39: this.stepForward,
      // >
      190: this.increasePlaybackRate,
      // <
      188: this.decreasePlaybackRate,
      // /
      191: this.resetPlaybackRate
    };

    // Listen to all keys down, use capture so we can avoid other event handlers
    // stopping this
    document.addEventListener('keydown', this.handleKeyDown.bind(this), true);
  }

  /**
   * Keyboard shortcuts for the Video Player
   * @param {Event} event
   */
  handleKeyDown(event) {
    // we don't support any modifiers at the moment
    if (!VideoPlayerStore.options.keyboardShortcuts || event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
      return;
    }

    const {
      keyCode
    } = event;

    if (typeof this.keyboardShortcuts[keyCode] === 'function') {
      event.preventDefault();
      this.keyboardShortcuts[keyCode](event);
    }
  }

  /**
   * Listen to an event and return an object
   * we can use to unmount it when we're done.
   * @param {String} type
   * @param {Function} fn
   */
  addChangeListener(type, fn) {
    this.addListener(type, fn);
    return {
      remove: () => {
        this.removeListener(type, fn);
      }
    };
  }

  /**
   * Set volume of the video player
   * @param {Number} volume
   */
  setVolume(volume) {
    invariant(
      !isNaN(volume) && volume >= 0 && volume <= 1,
      'volume is not number between 0 and 1'
    );
    if (VideoPlayerStore.isMuted && volume > 0) {
      this.unmute();
    }
    this.emit('volume', volume);
  }

  /**
   * Double current playback rate
   */
  increasePlaybackRate() {
    const playbackRate = Math.min(PlaybackRateOptions[PlaybackRateOptions.length - 1].value, VideoPlayerStore.playbackRate * 2);
    this.playbackRate(playbackRate);
  }

  /**
   * Decrease playback rate by half
   */
  decreasePlaybackRate() {
    const playbackRate = Math.max(PlaybackRateOptions[0].value, VideoPlayerStore.playbackRate / 2);
    this.playbackRate(playbackRate);
  }

  /**
   * Reset playback rate to normal
   */
  resetPlaybackRate() {
    this.playbackRate(1);
  }

  /**
   * Jump forward or backward a set number of ms
   * @param {Number} ms
   */
  step(ms) {
    invariant(
      !isNaN(ms),
      'ms is not a number'
    );
    const { currentTime } = VideoPlayerTimeStore;
    this.seekByMilliseconds((currentTime * 1000) + ms);
  }

  /**
   * Move slightly back
   */
  stepBack() {
    this.step(VideoPlayerStore.getFrameRateMilliseconds() * -1);
  }

  /**
   * Move slightly forward
   */
  stepForward() {
    this.step(VideoPlayerStore.getFrameRateMilliseconds());
  }

  /**
   * Toggle the play state
   */
  togglePlay() {
    if (VideoPlayerStore.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  /**
 * Toggle the mute state
 */
  toggleMute() {
    if (VideoPlayerStore.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }

  /**
   * Seek to a part of a video by percent
   * @param {Number} percent
   */
  seekByPercent(percent) {
    invariant(
      !isNaN(percent) && percent >= 0 && percent <= 1,
      'percent is not number between 0 and 1'
    );
    this.emit('seekByPercent', percent);
  }

  /**
   * Update the store based on the raw video element
   * @param {Node} video
   */
  updateState(video) {
    setTimeout(() => {
      VideoDispatcher.dispatch({
        type: Constants.updateState,
        video
      });
    }, 0);
  }

  /**
   * Directly update the store
   * @param {Object} body
   */
  update(body) {
    setTimeout(() => {
      VideoDispatcher.dispatch({
        type: Constants.update,
        body
      });
    }, 0);
  }

  /**
 * Update the options
 * @param {Object} body
 */
  updateOptions(body) {
    setTimeout(() => {
      VideoDispatcher.dispatch({
        type: Constants.updateOptions,
        body
      });
    }, 0);
  }

  /**
   * Update Dash State
   * @param {Object} body
   */
  updateDashState(video, dashPlayer) {
    setTimeout(() => {
      VideoDispatcher.dispatch({
        type: Constants.updateState,
        video,
        dashPlayer
      });
    }, 0);
  }

  /**
   * Initialize dash player stream
   * @param {Object} body
   */

  streamInitialized() {
    setTimeout(() => {
      VideoDispatcher.dispatch({
        type: Constants.streamInitialized
      });
    }, 0);
  }

  /**
   * Reset dash player state
   * @param {Object} body
   */
  reset() {
    this.emit('reset');
    setTimeout(() => {
      VideoDispatcher.dispatch({
        type: Constants.reset
      });
    }, 0);
  }

  periodSwitch(event) {
    setTimeout(() => {
      VideoDispatcher.dispatch({
        type: Constants.periodSwitch,
        streamInfo: event.toStreamInfo
      });
    }, 0);
  }

  updateQualityIndex(bitrate) {
    setTimeout(() => {
      VideoDispatcher.dispatch({
        type: Constants.updateQualityIndex,
        bitrate
      });
    }, 0);
  }

  /**
   * Start scrubbing
   */
  scrubStart() {
    // Always pause on scrub start
    this.pause();

    this.update({
      isScrubbing: true
    });
  }

  /**
   * Stop scrubbing and optionally play
   * @param {Object} args
   */
  scrubStop({play}) {
    this.update({
      isScrubbing: false
    });

    if (play) {
      this.play();
    }
  }
}

const instance = new VideoPlayerActions();
export default instance;
