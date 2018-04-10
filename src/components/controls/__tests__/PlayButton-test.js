import React from 'react';
import { mount } from 'enzyme';
import { Record } from 'immutable';

import VideoPlayerActions from '../../../data/VideoPlayerActions';
import VideoControlsButton from '../VideoControlsButton';
import PlayButton from '../PlayButton';

function setupWrapper(isPlaying = false, options = {}) {
  const props = Object.assign({
    className: undefined,
    videoState: new Record({ isPlaying })()
  }, options);
  const enzymeWrapper = mount(<PlayButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('PlayButton', () => {
  let spy = null;
  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should call play function when icon is clicked', () => {
    spy = jest.spyOn(VideoPlayerActions, 'play');
    // When isPlaying is false
    const { enzymeWrapper } = setupWrapper();
    enzymeWrapper.find(VideoControlsButton).simulate('click');
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call pause function when icon is clicked', () => {
    spy = jest.spyOn(VideoPlayerActions, 'pause');
    // When isPlaying is true
    const { enzymeWrapper } = setupWrapper(true);
    enzymeWrapper.find(VideoControlsButton).simulate('click');
    expect(spy).toHaveBeenCalledWith();
  });

  it('should pass in the correct icon prop depending on video playing state', () => {
    const { enzymeWrapper } = setupWrapper();
    const VideoControlsButtonComponent = enzymeWrapper.find(VideoControlsButton).instance();
    // When isPlaying is false
    expect(VideoControlsButtonComponent.props.icon).toEqual('play_arrow');
    // When isPlaying is true
    enzymeWrapper.setProps({ videoState: new Record({ isPlaying: true })() });
    expect(VideoControlsButtonComponent.props.icon).toEqual('pause');
  });

  it('should pass the className prop down to VideoControlsButton component', () => {
    const className = 'play--button';
    const { enzymeWrapper } = setupWrapper(true, { className });
    const VideoControlsButtonComponent = enzymeWrapper.find(VideoControlsButton).instance();
    expect(VideoControlsButtonComponent.props.className).toEqual(className);
  });
});
