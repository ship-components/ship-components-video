import React from 'react';
import { mount } from 'enzyme';
import {Record} from 'immutable';

import VideoPlayerActions from '../../../data/VideoPlayerActions';
import VideoControlsButton from '../VideoControlsButton';
import MuteButton from '../MuteButton';

function setupWrapper(isMuted = false, options = {}) {
  const props = Object.assign({
    className: undefined,
    videoState: new Record({ isMuted })()
  }, options);
  const enzymeWrapper = mount(<MuteButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('MuteButton', () => {
  let spy = null;
  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should call mute function when icon is clicked', () => {
    spy = jest.spyOn(VideoPlayerActions, 'mute');
    // When isMuted is false
    const { enzymeWrapper } = setupWrapper();
    enzymeWrapper.find(VideoControlsButton).simulate('click');
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call unmute function when icon is clicked', () => {
    spy = jest.spyOn(VideoPlayerActions, 'unmute');
    // When isMuted is true
    const { enzymeWrapper } = setupWrapper(true);
    enzymeWrapper.find(VideoControlsButton).simulate('click');
    expect(spy).toHaveBeenCalledWith();
  });

  it('should pass in the correct icon prop depending on video volume state', () => {
    const { enzymeWrapper } = setupWrapper();
    const VideoControlsButtonComponent = enzymeWrapper.find(VideoControlsButton).instance();
    // When isMuted is false
    expect(VideoControlsButtonComponent.props.icon).toEqual('volume_up');
    // When isMuted is true
    enzymeWrapper.setProps({ videoState: new Record({ isMuted: true })()});
    expect(VideoControlsButtonComponent.props.icon).toEqual('volume_off');
  });

  it('should pass the className prop down to VideoControlsButton component', () => {
    const className = 'mute--button';
    const { enzymeWrapper } = setupWrapper(true, { className });
    const VideoControlsButtonComponent = enzymeWrapper.find(VideoControlsButton).instance();
    expect(VideoControlsButtonComponent.props.className).toEqual(className);
  });
});
