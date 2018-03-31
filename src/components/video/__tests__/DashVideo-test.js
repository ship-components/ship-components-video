import React from 'react';
import { mount } from 'enzyme';

import DashVideo from '../DashVideo';
import Video from '../Video';

function setupWrapper() {
  const props = {
    src: '/api/1/video/Kyg7y/stream/cfdb8753e069.mpd',
    frameRate: 29.97,
    autoPlay: false,
    onPlay: jest.fn(),
    onPause: jest.fn(),
    onEnded: jest.fn()
  };
  const enzymeWrapper = mount(<DashVideo {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('DashVideo', () => {
  let spy = null;
  let spy2 = null;

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

  it('should call Video componentDidMount method when DashVideo mounts', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(Video.prototype, 'componentDidMount');

    expect(spy).not.toHaveBeenCalled();
    enzymeWrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('should call setup method when DashVideo mounts', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(DashVideo.prototype, 'setup');

    expect(spy).not.toHaveBeenCalled();
    enzymeWrapper.instance().componentDidMount();
    expect(spy).toHaveBeenCalled();
  });

  it('should create a new MediaPlayer when setup method calls', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    expect(dashPlayer).toBeDefined();
    expect(typeof dashPlayer).toBe('object');
  });

  it('should call the initiaize method when setup method calls', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'initialize');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the setInitialBitrateFor method when setup method calls', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'setInitialBitrateFor');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the setFastSwitchEnabled method when setup method calls', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'setFastSwitchEnabled');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the getDebug method when setup method calls', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'getDebug');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the clearDefaultUTCTimingSources method when setup method calls', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'clearDefaultUTCTimingSources');
    expect(spy).toHaveBeenCalled();
  });

  it('should call the addUTCTimingSource method when setup method calls', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'addUTCTimingSource');
    expect(spy).toHaveBeenCalled();
  });

  it('should create a dashPlayerCreatedAt variable when setup method calls', () => {
    const { enzymeWrapper } = setupWrapper();
    const instance = enzymeWrapper.instance();
    expect(instance.dashPlayerCreatedAt).toBeDefined();
    expect(typeof instance.dashPlayerCreatedAt).toBe('object');
  });

  it('should override the play method with native Dashjs play method', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'play');
    expect(spy).not.toHaveBeenCalled();
    enzymeWrapper.instance().play();
    expect(spy).toHaveBeenCalled();
  });

  it('should override the pause method with native Dashjs pause method', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'pause');
    expect(spy).not.toHaveBeenCalled();
    enzymeWrapper.instance().pause();
    expect(spy).toHaveBeenCalled();
  });

  it('should override the mute method with native Dashjs mute method', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'setMute');
    expect(spy).not.toHaveBeenCalled();
    enzymeWrapper.instance().mute();
    expect(spy).toHaveBeenCalled();
  });

  it('should override the unmute method with native Dashjs unmute method', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'setMute');
    expect(spy).not.toHaveBeenCalled();
    enzymeWrapper.instance().unmute();
    expect(spy).toHaveBeenCalled();
  });

  it('should override the reset method with native Dashjs reset method', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'reset');
    expect(spy).not.toHaveBeenCalled();
    enzymeWrapper.instance().reset();
    expect(spy).toHaveBeenCalled();
  });

  it('should override the seek method with native Dashjs seek method', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'seek');
    expect(spy).not.toHaveBeenCalled();
    enzymeWrapper.instance().seek(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should override the setAutoPlay method with native Dashjs setAutoPlay method', () => {
    const { enzymeWrapper } = setupWrapper();
    const dashPlayer = enzymeWrapper.instance().dashPlayer;
    spy = jest.spyOn(dashPlayer, 'setAutoPlay');
    enzymeWrapper.instance().setAutoPlay(true);
    expect(spy).toHaveBeenCalledWith(true);
  });
});
