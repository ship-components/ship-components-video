import React from 'react';
import { mount } from 'enzyme';
import { Record } from 'immutable';

import VideoPlayerActions from '../../../data/VideoPlayerActions';
import Slider from '../Slider';

import PlaybackRate from '../PlaybackRate';

function setupWrapper(playbackRate = 1, options = {}) {
  const props = Object.assign({
    className: undefined,
    visible: true,
    videoState: new Record({
      playbackRate
    })()
  }, options);

  const enzymeWrapper = mount(<PlaybackRate {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('PlaybackRate', () => {
  let spy = null;

  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should call VideoPlayerActions.playbackRate when a change happens', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(VideoPlayerActions, 'playbackRate');
    enzymeWrapper.find(Slider).simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
