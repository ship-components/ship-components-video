import React from 'react';
import { mount } from 'enzyme';

import VideoControl from '../VideoControl';
import VideoControlIcon from '../VideoControlIcon';
import Slider from '../Slider';

function setupProps(options) {
  return Object.assign({
    tag: 'div',
    className: 'container',
    onClick: jest.fn(),
    onContextMenu: jest.fn(),
    onDoubleClick: jest.fn(),
    onMouseDown: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    onMouseMove: jest.fn(),
    onMouseOut: jest.fn(),
    onMouseOver: jest.fn(),
    onMouseUp: jest.fn(),
    children: { VideoControlIcon, Slider }
  }, options);
}
function setupWrapper(options = {}) {
  const props = setupProps(options);
  const enzymeWrapper = mount(
    <VideoControl {...props} >
      <props.children.VideoControlIcon icon='volume_off'/>
      <props.children.Slider
        value={0}
        onChange={jest.fn()}
      />
    </VideoControl>
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('VideoControl', () => {
  let spy = null;
  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should render VideoControlIcon and slider when passed in as a children prop', () => {
    const { enzymeWrapper } = setupWrapper();
    expect(enzymeWrapper.find('VideoControlIcon').length).toBe(1);
    expect(enzymeWrapper.find('Slider').length).toBe(1);
  });

  it('should pass the className prop down to VideoControl component', () => {
    const className = 'videoControl--container';
    const { enzymeWrapper } = setupWrapper({ className });
    const VideoControlComponent = enzymeWrapper.find(VideoControl);
    expect(VideoControlComponent.props().className).toEqual(className);
  });

  it('should have container className', () => {
    const { enzymeWrapper } = setupWrapper();
    const VideoControlComponent = enzymeWrapper.find(VideoControl);
    expect(VideoControlComponent.props().className).toEqual('container');
  });

  it('should pass the className prop down to VideoControl component', () => {
    const className = 'videoControl--container';
    const { enzymeWrapper } = setupWrapper({ className });
    const VideoControlComponent = enzymeWrapper.find(VideoControl);
    expect(VideoControlComponent.props().className).toEqual(className);
  });

  it('should fires props.onClick when user clicks on VideoControl component', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onClick');
    enzymeWrapper.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires blur() when user clicks on VideoControl component', () => {
    const { enzymeWrapper } = setupWrapper();
    const blur = jest.fn();
    const event = {
      target: {
        blur
      }
    };
    // Prevent spacebar from triggering click event in FF
    spy = jest.spyOn(event.target, 'blur');
    enzymeWrapper.simulate('click', event);
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onDoubleClick()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onDoubleClick');
    enzymeWrapper.simulate('doubleClick');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onContextMenu()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onContextMenu');
    enzymeWrapper.simulate('contextMenu');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onMouseDown()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onMouseDown');
    enzymeWrapper.simulate('mouseDown');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onMouseEnter()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onMouseEnter');
    enzymeWrapper.simulate('mouseEnter');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onMouseLeave()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onMouseLeave');
    enzymeWrapper.simulate('mouseLeave');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onMouseMove()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onMouseMove');
    enzymeWrapper.simulate('mouseMove');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onMouseOut()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onMouseOut');
    enzymeWrapper.simulate('mouseOut');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onMouseOver()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onMouseOver');
    enzymeWrapper.simulate('mouseOver');
    expect(spy).toHaveBeenCalled();
  });

  it('should fires props.onMouseUp()', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onMouseUp');
    enzymeWrapper.simulate('mouseUp');
    expect(spy).toHaveBeenCalled();
  });
});
