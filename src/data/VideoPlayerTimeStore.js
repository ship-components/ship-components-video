/**
 * Saves real time state of the video player. Triggers many change events
 */
// External
import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import invariant from 'invariant';
import dispatcher from './VideoDispatcher';
import { Record } from 'immutable';
import Constants from './VideoPlayerConstants';

// Internal
import { getBufferedSections } from '../lib/getVideoState';

function getDashStates(dashPlayer) {
  return {
    duration: dashPlayer.duration(),
    bufferLength: dashPlayer.getBufferLength('video')
  };
}


/**
 * Stores timing info that rapidly changes
 */
export const VideoPlayerTimeState = new Record({
  currentTime: 0,
  duration: 0,
  progress: 0,
  buffered: 0,
  bufferedSections: new Immutable.List(),
  bufferLength: 0
});

/**
 * Actions to take
 */
export const ActionMap = {
  /**
   * Called constantly and only saves timing information so
   * components that need the data that changes frequently
   * can listen to this store while other components can
   * listen to VideoPLayerStore for less frequent updates
   */
  [Constants.updateState]: function update(state, action) {
    const {
      video,
      dashPlayer
    } = action;
    // Video will be a <video /> element except during testing
    invariant(
      typeof video !== 'undefined',
      'action.video is not defined'
    );
    let dashState = {};
    const videoState = {
      currentTime: video.currentTime,
      duration: video.duration,
      progress: (video.currentTime / video.duration) * 100,
      buffered: video.buffered.length > 0 ? (video.buffered.end(video.buffered.length - 1) / video.duration * 100) : 0,
      bufferedSections: getBufferedSections(video)
    };

    // Do nothing when there is no dashPlayer object
    // OR video hasn't been processed yet
    // DashJS API will throw an error "video playback has not initialized yet"
    // when running this function for a video that is in a upload process
    // aka not ready to play
    if (dashPlayer && dashPlayer.isReady()) {
      dashState = getDashStates(dashPlayer);
    }

    return state.merge(Object.assign(videoState, dashState));
  }
};

export class VideoPlayerTimeStore extends ReduceStore {
  /**
   * Initial
   */
  getInitialState() {
    return new VideoPlayerTimeState({});
  }

  /**
   * Get a value from the record
   * @param {String} key
   */
  get(key) {
    return this._state[key];
  }

  /**
   * Make current time available with get('currentTime')
   */
  get currentTime() {
    return this._state.currentTime;
  }

  /**
   * Handle incoming actions
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
const instance = new VideoPlayerTimeStore(dispatcher);
export default instance;
