import React from 'react';
import { mount } from 'enzyme';

import Video, { VideoEventKeys } from '../Video';
import VideoPlayerActions from '../../../data/VideoPlayerActions';
import VideoDispatcher from '../../../data/VideoDispatcher';
import { VideoPlayerTimeStore } from '../../../data/VideoPlayerTimeStore';

export class MockVideoBuffer {
  constructor(buffers = []) {
    this.buffers = buffers;
  }
  get length() {
    return this.buffers.length;
  }

  start(index) {
    return this.buffers[index].start;
  }

  end(index) {
    return this.buffers[index].end;
  }
}

describe('Video', () => {
  let mockVideo;
  let store;
  let spy = null;

  beforeEach(() => {
    // Reset State
    store = new VideoPlayerTimeStore(VideoDispatcher);

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
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  VideoEventKeys.forEach((key) => {
    it(`should call video.${key}() when VideoPlayerActions.${key}() is called`, () => {
      spy = jest.spyOn(Video.prototype, key);
      const wrapper = mount(
        <Video
          containerHeight={1}
          containerWidth={1}
          src='//test'
        />
      );
      expect(wrapper.ref('video')).toBeTruthy();
      if (key !== 'retrieveManifest') {
        VideoPlayerActions[key](0);
      } else {
        // eslint-disable-next-line max-nested-callbacks
        VideoPlayerActions.retrieveManifest(mockVideo.currentSrc, () => { });
      }
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should update the timeState when currentTime changes', () => {
    jest.useFakeTimers();
    spy = jest.spyOn(VideoPlayerActions, 'updateState');
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    const currentTime = 5;
    mockVideo.currentTime = currentTime;
    instance.updateVideoState(mockVideo);
    jest.runOnlyPendingTimers();
    expect(spy).toHaveBeenCalled();
    expect(store._state.currentTime).toBe(currentTime);
  });

  it('should call VideoPlayerActions.update when componentWillReceiveProps is called', () => {
    spy = jest.spyOn(VideoPlayerActions, 'update');
    const props = {
      frameRate: 30
    };
    Video.prototype.componentWillReceiveProps(props);
    expect(spy).toHaveBeenCalledWith({
      frameRate: props.frameRate
    });
  });

  it('should call seek when seekByPercent is called', () => {
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    instance.refs = {
      video: {
        duration: 2
      }
    };
    spy = jest.spyOn(instance, 'seek');
    instance.seekByPercent(0.5);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call seek when seekByMilliseconds is called', () => {
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    spy = jest.spyOn(instance, 'seek');
    instance.seekByMilliseconds(1000);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call video.play when play is called', () => {
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    spy = jest.spyOn(instance.refs.video, 'play');
    instance.play();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call video.pause when pause is called', () => {
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    spy = jest.spyOn(instance.refs.video, 'pause');
    instance.pause();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call play if the video is paused when togglePlay is called', () => {
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    instance.refs.video = {
      paused: true,
      play: jest.fn()
    };
    instance.togglePlay();
    expect(instance.refs.video.play).toHaveBeenCalledWith();
  });

  it('should call pause if the video is not paused when togglePlay is called', () => {
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    instance.refs.video = {
      paused: false,
      pause: jest.fn()
    };
    instance.togglePlay();
    expect(instance.refs.video.pause).toHaveBeenCalledWith();
  });

  it('should set muted to false when muted is called', () => {
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    instance.refs.video = {
      muted: false
    };
    instance.mute();
    expect(instance.refs.video.muted).toBe(true);
  });

  it('should update playbackRate when playbackRate is called', () => {
    const wrapper = mount(
      <Video
        containerHeight={1}
        containerWidth={1}
        src='//test'
      />
    );
    const instance = wrapper.instance();
    expect(instance.video.playbackRate).toBe(1);
    instance.playbackRate(2);
    expect(instance.video.playbackRate).toBe(2);
  });

  [
    {
      propName: 'loop',
      naturalName: 'loop'
    },
    {
      propName: 'autoPlay',
      naturalName: 'autoplay'
    }
  ].forEach(({ naturalName, propName }) => {
    it(`should set the ${propName} property on the video element`, () => {
      const props = {
        [propName]: true
      };
      const wrapper = mount(
        <Video
          containerHeight={1}
          containerWidth={1}
          src='//test'
          {...props}
        />
      );
      expect(wrapper.ref('video')[naturalName]).toBe(true);
    });
  });
});
