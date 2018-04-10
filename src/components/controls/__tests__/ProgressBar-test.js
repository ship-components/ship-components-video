import React from 'react';
import { mount } from 'enzyme';

import { ProgressBar } from '../ProgressBar';
import VideoDispatcher from '../../../data/VideoDispatcher';
import { VideoPlayerTimeState } from '../../../data/VideoPlayerTimeStore';
import { VideoPlayerState } from '../../../data/VideoPlayerStore';
import VideoPlayerActions from '../../../data/VideoPlayerActions';

describe('ProgressBar', () => {
  let timeState;
  let videoState;
  let spy = null;
  let spy2 = null;

  beforeEach(() => {
    // Reset State
    timeState = new VideoPlayerTimeState(VideoDispatcher);
    videoState = new VideoPlayerState(VideoDispatcher);
  });

  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }

    if (spy2) {
      spy2.mockClear();
      spy2 = null;
    }
  });

  it('should call scrubToPercent method on handleMouseDown with valid percent value', () => {
    spy = jest.spyOn(ProgressBar.prototype, 'scrubToPercent');
    spy2 = jest.spyOn(ProgressBar.prototype, 'getEventPosition').mockReturnValue(0.2);

    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
      />
    );
    wrapper.simulate('mouseDown');
    expect(spy).toHaveBeenCalled();
  });

  it('should not call scrubToPercent method on handleMouseDown when percent is undefined', () => {
    spy = jest.spyOn(ProgressBar.prototype, 'scrubToPercent');
    spy2 = jest.spyOn(ProgressBar.prototype, 'getEventPosition').mockReturnValue(undefined);

    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
      />
    );
    wrapper.simulate('mouseDown');
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update the mouseDown state on handleMouseDown', () => {
    spy = jest.spyOn(ProgressBar.prototype, 'handleMouseDown');
    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
      />
    );
    expect(wrapper.state('mouseDown')).toBeFalsy();
    wrapper.simulate('mouseDown');
    expect(spy).toHaveBeenCalled();
    expect(wrapper.state('mouseDown')).toBeTruthy();
  });

  it('should call VideoPlayerActions scrubStart method on handleMouseDown', () => {
    spy = jest.spyOn(VideoPlayerActions, 'scrubStart');
    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
      />
    );
    wrapper.simulate('mouseDown');
    expect(spy).toHaveBeenCalled();
  });

  it('should call props.onMouseDown method on handleMouseDown if available', () => {
    const myMockFn = jest.fn();
    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
        onMouseDown={myMockFn}
      />
    );
    expect(myMockFn).not.toHaveBeenCalled();
    wrapper.simulate('mouseDown');
    expect(myMockFn).toHaveBeenCalled();
  });

  it('should update the mouseDown state on handleMouseUp', () => {
    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
      />
    );
    wrapper.simulate('mouseDown');
    expect(wrapper.state('mouseDown')).toBeTruthy();
    wrapper.instance().handleMouseUp();
    expect(wrapper.state('mouseDown')).toBeFalsy();
  });

  it('should call VideoPlayerActions scrubStop method on handleMouseUp', () => {
    spy = jest.spyOn(VideoPlayerActions, 'scrubStop');
    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
      />
    );
    wrapper.instance().handleMouseUp();
    expect(spy).toHaveBeenCalled();
  });

  it('should call VideoPlayerActions seekByPercent method when scrubToPercent calls', () => {
    spy = jest.spyOn(VideoPlayerActions, 'seekByPercent');
    spy2 = jest.spyOn(ProgressBar.prototype, 'getEventPosition').mockReturnValue(0.2);
    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
      />
    );
    wrapper.simulate('mouseDown');
    expect(spy).toHaveBeenCalled();
  });

  it('should call props.onScrub method when scrubToPercent calls if available', () => {
    spy = jest.spyOn(VideoPlayerActions, 'seekByPercent');
    spy2 = jest.spyOn(ProgressBar.prototype, 'getEventPosition').mockReturnValue(0.2);
    const myMockFn = jest.fn();
    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
        onScrub={myMockFn}
      />
    );
    wrapper.simulate('mouseDown');
    expect(myMockFn).toHaveBeenCalled();
  });

  it('should call scrubToPercent on handleMoveScrub when percent is defined', () => {
    spy = jest.spyOn(ProgressBar.prototype, 'scrubToPercent');
    spy2 = jest.spyOn(ProgressBar.prototype, 'getEventPosition').mockReturnValue(0.2);
    const wrapper = mount(
      <ProgressBar
        timeState={timeState}
        videoState={videoState}
      />
    );
    wrapper.setState({ mouseDown: true });
    wrapper.instance().handleMoveScrub(new Event('mousedown'));
    expect(spy).toHaveBeenCalled();
  });
});
