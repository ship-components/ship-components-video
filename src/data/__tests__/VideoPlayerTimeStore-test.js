import VideoDispatcher from '../VideoDispatcher';
import VideoPlayerConstants from '../VideoPlayerConstants';
import { VideoPlayerTimeStore, ActionMap} from '../VideoPlayerTimeStore';

import { MockVideoBuffer } from './Video-test';

describe('VideoPlayerTimeStore', () => {
  let store;
  let spy;

  beforeEach(() => {
    store = new VideoPlayerTimeStore(VideoDispatcher);
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
      key: 'currentTime',
      value: 100,
      video: {
        currentTime: 100,
        duration: 0,
        buffered: new MockVideoBuffer()
      }
    },
    {
      key: 'duration',
      value: 100,
      video: {
        currentTime: 0,
        duration: 100,
        buffered: new MockVideoBuffer()
      }
    },
    {
      key: 'progress',
      value: 50,
      video: {
        currentTime: 5,
        duration: 10,
        buffered: new MockVideoBuffer()
      }
    }
  ].forEach(({key, value, video}) => {
    it(`should update state.${key} in the store when the "update" action is called`, () => {
      const type = VideoPlayerConstants.updateState;
      spy = jest.spyOn(ActionMap, type);
      VideoDispatcher.dispatch({
        type,
        video
      });
      expect(spy).toHaveBeenCalled();
      expect(store._state[key]).toBe(value);
    });
  });
});
