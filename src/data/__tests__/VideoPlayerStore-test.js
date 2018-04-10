import VideoDispatcher from '../VideoDispatcher';
import VideoPlayerConstants from '../VideoPlayerConstants';
import { VideoPlayerStore, VideoPlayerState, ActionMap} from '../VideoPlayerStore';

import {MockVideoBuffer} from './Video-test';

describe('VideoPlayerStore', () => {
  let store;
  let spy;

  let mockVideo;

  beforeEach(() => {
    store = new VideoPlayerStore(VideoDispatcher);
    mockVideo = {
      currentTime: 0,
      paused: false,
      ended: false,
      readyState: 0,
      muted: false,
      autoplay: false,
      loop: false,
      seekable: false,
      playbackRate: 1,
      currentSrc: '//video.mp4',
      error: null,
      networkState: 0,
      buffered: new MockVideoBuffer()
    };
  });

  afterEach(() => {
    store = null;
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  [
    {
      key: 'isPlaying',
      value: true,
      video: {
        currentTime: 1,
        paused: false,
        ended: false,
        readyState: 4
      }
    },
    {
      key: 'isMuted',
      value: true,
      video: {
        muted: true
      }
    },
    {
      key: 'isAutoPlay',
      value: true,
      video: {
        autoplay: true
      }
    },
    {
      key: 'isEnded',
      value: true,
      video: {
        ended: true
      }
    },
    {
      key: 'isLooping',
      value: true,
      video: {
        loop: true
      }
    },
    {
      key: 'error',
      value: 'Script Error',
      video: {
        error: 'Script Error'
      }
    },
    {
      key: 'networkState',
      value: 4,
      video: {
        'networkState': 4
      }
    },
    {
      key: 'playbackRate',
      value: 2,
      video: {
        'playbackRate': 2
      }
    },
    {
      key: 'readyState',
      value: 4,
      video: {
        'readyState': 4
      }
    },
    {
      key: 'videoHeight',
      value: 540,
      video: {
        'videoHeight': 540
      }
    },
    {
      key: 'videoWidth',
      value: 360,
      video: {
        'videoWidth': 360
      }
    }
  ].forEach(({key, value, video}) => {
    it(`should update state.${key} in the store when the "update" action is called`, () => {
      const type = VideoPlayerConstants.updateState;
      spy = jest.spyOn(ActionMap, type);
      const defaultState = new VideoPlayerState();
      VideoDispatcher.dispatch({
        type,
        video: Object.assign(mockVideo, video)
      });
      expect(spy).toHaveBeenCalled();
      expect(store._state[key]).not.toBe(defaultState[key]);
      expect(store._state[key]).toBe(value);
    });
  });
});
