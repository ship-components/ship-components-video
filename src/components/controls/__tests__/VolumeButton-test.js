import React from 'react';
import { mount } from 'enzyme';
import {Record} from 'immutable';

import VideoPlayerActions from '../../../data/VideoPlayerActions';
import VideoControlIcon from '../VideoControlIcon';
import Slider from '../Slider';

import VolumeButton from '../VolumeButton';

function setupWrapper(volume = 1, options = {}) {
  const props = Object.assign({
    className: undefined,
    videoState: new Record({
      volume
    })()
  }, options);
  const enzymeWrapper = mount(<VolumeButton {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('VolumeButton', () => {
  let spy = null;

  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should call toggleMute when the icon is clicked', () => {
    spy = jest.spyOn(VideoPlayerActions, 'toggleMute');
    const { enzymeWrapper } = setupWrapper();
    enzymeWrapper.find(VideoControlIcon).simulate('click');
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call setVolume when the slider changes', () => {
    spy = jest.spyOn(VideoPlayerActions, 'setVolume')
      .mockImplementation(() => {});
    const { enzymeWrapper } = setupWrapper();
    enzymeWrapper.find(Slider).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
