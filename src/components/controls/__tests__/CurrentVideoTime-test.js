import React from 'react';
import { mount } from 'enzyme';
import { Record } from 'immutable';

import VideoDispatcher from '../../../data/VideoDispatcher';
import { VideoPlayerState } from '../../../data/VideoPlayerStore';
import { CurrentVideoTime } from '../CurrentVideoTime';
import VideoControl from '../VideoControl';

function setupWrapper(options = {}) {
  const props = Object.assign({
    className: options.className || undefined,
    videoState: new VideoPlayerState(VideoDispatcher),
    version: {meta_data: { frame_rate: 30 }},
    timeState: options.timeState || new Record({ currentTime: 0 })()
  }, options);
  const enzymeWrapper = mount(
    <CurrentVideoTime
      {...props}
      mode={'time'}
    />
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('CurrentVideoTime', () => {
  let spy = null;
  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should toggle modes when clicking on VideoControl', () => {
    const { enzymeWrapper } = setupWrapper();
    const instance = enzymeWrapper.instance();
    expect(instance.state.mode).toBe('time');
    enzymeWrapper.find(VideoControl).simulate('click');
    expect(instance.state.mode).toBe('frames');
  });

  it('should show the correct video time', () => {
    const { enzymeWrapper } = setupWrapper({
      timeState: new Record({ currentTime: 50 })()
    });
    const videoTime = '0:00:50:00';
    const children = enzymeWrapper.find('span').props().children;
    expect(children).toEqual(videoTime);
  });

  it('should show the correct video frames', () => {
    const { enzymeWrapper } = setupWrapper({
      timeState: new Record({ currentTime: 50 })()
    });
    // toggle to frames mode
    enzymeWrapper.find(VideoControl).simulate('click');
    const videoFrames = '1,500';
    const children = enzymeWrapper.find('span').props().children;
    expect(children).toEqual(videoFrames);
  });

  it('should pass the className prop down to VideoControl component', () => {
    const className = 'current-video-time container';
    const { enzymeWrapper } = setupWrapper({ className });
    const VideoControlComponent = enzymeWrapper.find(VideoControl);
    expect(VideoControlComponent.props().className).toContain(className);
    // Should also have the container classname
    expect(VideoControlComponent.props().className).toContain('container');
  });
});
