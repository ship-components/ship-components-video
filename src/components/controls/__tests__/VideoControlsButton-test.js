import React from 'react';
import { mount } from 'enzyme';

import VideoControlsButton from '../VideoControlsButton';
import VideoControl from '../VideoControl';

function setupProps(options) {
  return Object.assign({
    tag: 'button',
    className: 'container',
    onClick: jest.fn(),
    icon: 'fullscreen',
    onContextMenu: jest.fn(),
    onDoubleClick: jest.fn(),
    onMouseDown: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    onMouseMove: jest.fn(),
    onMouseOut: jest.fn(),
    onMouseOver: jest.fn(),
    onMouseUp: jest.fn(),
    children: 'div'
  }, options);
}
function setupWrapper(options = {}) {
  const props = setupProps(options);
  const enzymeWrapper = mount(
    <VideoControlsButton {...props} >
      <props.children />
    </VideoControlsButton>
  );

  return {
    props,
    enzymeWrapper
  };
}

describe('VideoControlsButton', () => {
  let spy = null;
  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should render component when passed in as a children prop', () => {
    // Testing to make sure it's passing the children down to VideoControl component
    const children = 'section';
    const { enzymeWrapper } = setupWrapper({ children });
    expect(enzymeWrapper.find(children).length).toBe(1);
  });

  it('should pass the className prop down to VideoControl component', () => {
    const className = 'VideoControlsButton--container';
    const { enzymeWrapper } = setupWrapper({ className });
    const VideoControlsButtonComponent = enzymeWrapper.find(VideoControl).first().instance();
    expect(VideoControlsButtonComponent.props.className).toMatch(className);
  });

  it('should have container className', () => {
    const { enzymeWrapper } = setupWrapper();
    const VideoControlsButtonComponent = enzymeWrapper.find(VideoControl).first().instance();
    expect(VideoControlsButtonComponent.props.className).toMatch('container');
  });

  // it('should have icon classNames in children span tag', () => {
  //   const { enzymeWrapper } = setupWrapper();
  //   const spanComponent = enzymeWrapper.find('span').last();
  //   expect(spanComponent.props().className).toMatch('icon');
  // });

  it('should fires props.onClick when user clicks on VideoControl component', () => {
    const { enzymeWrapper } = setupWrapper();
    spy = jest.spyOn(enzymeWrapper.props(), 'onClick');
    enzymeWrapper.simulate('click');
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
