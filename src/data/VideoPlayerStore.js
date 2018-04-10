/**
 * Stores information related to the <video /> element currently playing
 */

// External
import {ReduceStore} from 'flux/utils';
import Immutable, { Record } from 'immutable';
import invariant from 'invariant';
import dispatcher from './VideoDispatcher';

// Internal
import { getIsPlaying } from '../lib/getVideoState';
import Constants from './VideoPlayerConstants';

function getDashStates(dashPlayer, state) {
  if (!dashPlayer.isReady()) {
    return {};
  }

  // Extract the buffer level and current bitrate
  const metrics = dashPlayer.getMetricsFor('video');
  const dashMetrics = dashPlayer.getDashMetrics();
  let bitrate;
  if (metrics && dashMetrics && state.streamInfo) {
    const periodIdx = state.streamInfo.index;
    const repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
    bitrate = repSwitch ? Math.round(dashMetrics.getBandwidthForRepresentation(repSwitch.to, periodIdx) / 1000) : NaN;
  }

  return {
    bitrates: state.streamInitialized ? dashPlayer.getBitrateInfoListFor('video') : null,
    bitrate,
    volume: dashPlayer.getVolume()
  };
}

/**
 * Store configuration options for the Video Player
 */
export const VideoPlayerOptions = new Record({
  keyboardShortcuts: false
}, 'VideoPlayerOptions');

/**
 * Stores data that doesn't change as frequently as the
 * timing data stored in VideoPlayerTimeStore. Anything
 * that updates constantly should be there and not here
 */
export const VideoPlayerState = new Record({
  isPlaying: false,
  isScrubbing: false,
  isMuted: false,
  isAutoPlay: false,
  isEnded: false,
  isLooping: false,
  canPlay: false,
  currentSrc: undefined,
  error: null,
  networkState: 0,
  readyState: 0,
  playbackRate: 1,
  videoWidth: 0,
  videoHeight: 0,
  volume: 1,
  aspectRatio: 16 / 9,
  frameRate: 30,
  options: new VideoPlayerOptions(),
  // DashPlayer States
  bitrates: null,
  bitrate: null,
  streamInitialized: null,
  periodSwitch: null,
  qualityIndex: null,
  streamInfo: null
}, 'VideoPlayerState');

/**
 * Handles incoming events
 */
export const ActionMap = {
  /**
   * Updates the state based on a video element
   */
  [Constants.updateState]: function update(state, action) {
    const {
      video,
      dashPlayer
    } = action;

    let dashState = {};
    // Video will normally be a <video /> element except during tests
    invariant(
      typeof video !== 'undefined',
      'action.video is not defined'
    );

    const videoState = {
      isPlaying: getIsPlaying(video),
      isMuted: video.muted,
      isAutoPlay: video.autoplay,
      isEnded: video.ended,
      isLooping: video.loop,
      // Ignore the playback rate when it's zero when it shouldn't be
      playbackRate: video.playbackRate !== 0 ? video.playbackRate : state.playbackRate,
      currentSrc: video.currentSrc,
      error: video.error,
      networkState: video.networkState,
      readyState: video.readyState,
      canPlay: video.readyState >= 3,
      videoHeight: video.videoHeight,
      videoWidth: video.videoWidth,
      volume: video.volume,
      aspectRatio: video.videoWidth / video.videoHeight
    };

    if (dashPlayer) {
      dashState = getDashStates(dashPlayer, state);
    }

    return state.merge(Object.assign(videoState, dashState));
  },

  /**
   * Updates a friend directly on the store.
   */
  [Constants.update]: function update(state, action) {
    const { body } = action;
    invariant(
      typeof body === 'object' && body !== null,
      'action.body is not an object'
    );
    return state.merge(body);
  },

  /**
   * Update the options record
   */
  [Constants.updateOptions]: function updateOptions(state, action) {
    const { body } = action;
    invariant(
      typeof body === 'object' && body !== null,
      'action.body is not an object'
    );
    const options = state.options.merge(body);
    return state.set('options', options);
  },

  [Constants.streamInitialized]: function streamInitialized(state) {
    return state.set('streamInitialized', true);
  },

  [Constants.reset]: function reset() {
    return new VideoPlayerState({
      // Don't reset options. Just the video state
      options: this.options
    });
  },

  [Constants.periodSwitch]: function periodSwitch(state, action) {
    return state.set('streamInfo', action.streamInfo);
  },

  [Constants.updateQualityIndex]: function updateQualityIndex(state, action) {
    // This is the current bitrate
    const { bitrate } = action;
    const qualityIndex = bitrate ? bitrate.qualityIndex : null;
    return state.set('qualityIndex', qualityIndex);
  }
};

export class VideoPlayerStore extends ReduceStore {
  /**
   * Initial
   */
  getInitialState() {
    return new VideoPlayerState({});
  }

  /**
   * Get a value from the record
   * @param {String} key
   */
  get(key) {
    return this._state[key];
  }

  /**
   * Get a deeply nested value
   * @param {Array<String>} path
   */
  getIn(path) {
    return this._state.getIn(path);
  }

  /**
   * Alias to get('isPlaying')
   */
  get isPlaying() {
    return this._state.isPlaying;
  }

  /**
   * Alias to get('isMuted')
   */
  get isMuted() {
    return this._state.isMuted;
  }

  /**
   * Alias to get('playbackRate')
   */
  get playbackRate() {
    return this._state.playbackRate;
  }

  /**
   * Alias to get('frameRate')
   */
  get frameRate() {
    return this._state.frameRate;
  }

  /**
   * Alias to get('options')
   */
  get options() {
    return this._state.options;
  }

  /**
   * Calculate how long each frame is in milliseconds
   */
  getFrameRateMilliseconds() {
    return (1 / this._state.frameRate) * 1000;
  }

  /**
   * Event Handler
   * @param {Record} state
   * @param {Object} action
   */
  reduce(state, action) {
    invariant(
      typeof action.type === 'string',
      'action.type is not a string'
    );
    const handler = ActionMap[action.type];
    if (typeof handler === 'function' && typeof action.type === 'string') {
      const updatedState = handler.call(this, state, action);
      // Verify the state changed otherwise return the original state. This should
      // hopefully reduce some of the updates
      return Immutable.is(updatedState, state) ? state : updatedState;
    }

    return state;
  }
}

/**
 * Create a singleton
 */
const instance = new VideoPlayerStore(dispatcher);
export default instance;
