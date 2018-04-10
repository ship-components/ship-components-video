import React from 'react';
import { mount } from 'enzyme';

import VideoControlSlider from '../VideoControlSlider';

function setupWrapper(options = {}) {
  const props = Object.assign({
    className: undefined,
    children: 'Mock'
  }, options);

  const enzymeWrapper = mount(<VideoControlSlider {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('VideoControlSlider', () => {
  let spy = null;

  afterEach(() => {
    // Reset spies
    if (spy) {
      spy.mockClear();
      spy = null;
    }
  });

  it('should set the dragging state to true on when handleDragStart is called', () => {
    const { enzymeWrapper } = setupWrapper();

    enzymeWrapper.setState({
      dragging: false
    });
    enzymeWrapper.instance().handleDragStart();
    expect(enzymeWrapper.state('dragging')).toBe(true);
  });

  it('should set the dragging state to false on when handleDragStop is called', () => {
    const { enzymeWrapper } = setupWrapper();

    enzymeWrapper.setState({
      dragging: true
    });
    enzymeWrapper.instance().handleDragStop();
    expect(enzymeWrapper.state('dragging')).toBe(false);
  });

  it('should set the hover state to true on when handleMouseEnter is called', () => {
    const { enzymeWrapper } = setupWrapper();
    jest.useFakeTimers();
    enzymeWrapper.setState({
      hover: false
    });
    enzymeWrapper.instance().handleMouseEnter();
    jest.runAllTimers();
    expect(enzymeWrapper.state('hover')).toBe(true);
  });

  it('should set the hover state to false on when handleMouseLeave is called', () => {
    const { enzymeWrapper } = setupWrapper();
    jest.useFakeTimers();
    enzymeWrapper.setState({
      hover: true
    });
    enzymeWrapper.instance().handleMouseLeave();
    expect(enzymeWrapper.state('hover')).toBe(true);
    jest.runAllTimers();
    expect(enzymeWrapper.state('hover')).toBe(false);
  });
});
