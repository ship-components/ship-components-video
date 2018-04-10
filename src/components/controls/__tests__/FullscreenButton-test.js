import React from 'react';
import { mount } from 'enzyme';

import VideoPlayerActions from '../../../data/VideoPlayerActions';
import FullscreenButton from '../FullscreenButton';
import VideoControlsButton from '../VideoControlsButton';

function setupWrapper(isFullscreen = true, options = {}) {
  const props = Object.assign({
    className: undefined,
    isFullscreen
  }, options);
  const enzymeWrapper = mount(<FullscreenButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('FullscreenButton', () => {
  let spy = null;

  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should call toggleFullscreen when the FullscreenButton is clicked', () => {
    spy = jest.spyOn(VideoPlayerActions, 'toggleFullscreen');
    const { enzymeWrapper } = setupWrapper();
    enzymeWrapper.find(VideoControlsButton).simulate('click');
    expect(spy).toHaveBeenCalledWith();
  });

  it('should pass in the correct icon prop depending on video fullscreen state', () => {
    const { enzymeWrapper } = setupWrapper();
    const VideoControlsButtonComponent = enzymeWrapper.find(VideoControlsButton).instance();
    // When isFullscreen is true
    expect(VideoControlsButtonComponent.props.icon).toEqual('fullscreen_exit');
    // When isFullscreen is false
    enzymeWrapper.setProps({ isFullscreen: false });
    expect(VideoControlsButtonComponent.props.icon).toEqual('fullscreen');
  });

  it('should pass the className prop down to VideoControlsButton component', () => {
    const className = 'fullscreen--button';
    const { enzymeWrapper } = setupWrapper(true, { className });
    const VideoControlsButtonComponent = enzymeWrapper.find(VideoControlsButton).instance();
    expect(VideoControlsButtonComponent.props.className).toEqual(className);
  });
});
