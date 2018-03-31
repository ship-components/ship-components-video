
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Slider.css';

export default class Slider extends Component {
  /**
   * Setup
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    // Keep track of the last value so we can detect changes
    this.lastValue = props.value;

    this.state = {
      dragging: false
    };

    // Bindings
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
  }

  /**
   * Performance check
   * @param {Object} nextProps
   */
  shouldComponentUpdate(nextProps, nextState) {
    return [
      'value',
      'className'
    ].some(key => this.props[key] !== nextProps[key]) ||
      [
        'dragging'
      ].some(key => this.state[key] !== nextState[key]);
  }

  /**
   * Cleanup
   */
  componentWillUnmount() {
    this.removeEventListeners();
  }

  /**
   * Clean up any global event listeners from the drag
   */
  removeEventListeners() {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  /**
   * Start the dragging
   */
  handleMouseDown() {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  /**
   * End the dragging
   */
  handleMouseUp() {
    this.removeEventListeners();
    if (this.state.dragging && typeof this.props.onDragStop === 'function') {
      this.props.onDragStop();
    }
    this.setState({
      dragging: false
    });
  }

  /**
   * Drag is active
   * @param {Event} event
   */
  handleMouseMove(event) {
    this.handleChange(event);
    if (!this.state.dragging && typeof this.props.onDragStart === 'function') {
      this.props.onDragStart();
    }

    if (!this.state.dragging) {
      this.setState({
        dragging: true
      });
    }
  }

  /**
   * Click a specific point on the slider
   * @param {Event} event
   */
  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.handleChange(event);
  }

  getValue() {
    const {
      options,
      value
    } = this.props;
    if (!Array.isArray(options)) {
      return value;
    }
    return options.reduce((previous, current) =>
      (Math.abs(current - value) < Math.abs(previous - value) ? current : previous)
    );
  }

  /**
   * Called for every change either from a click or a drag
   * @param {Event} event
   */
  handleChange(event) {
    const {
      range,
      options,
      onChange
    } = this.props;
    const percent = this.getEventPosition(event);

    let value;
    if (Array.isArray(options)) {
      value = options[Math.round((options.length - 1) * percent)];
    } else {
      value = (range[1] - range[0]) * percent + range[0];
    }

    // Only emit the change event when the value actually changes
    if (this.lastValue !== value) {
      onChange({
        target: {
          value
        }
      });
    }

    this.lastValue = value;
  }

  /**
   * Calculate where the click was relative to the progress bar and return
   * a percent we can pass to our parent
   * @param  {MouseEvent} event
   * @return {Number}
   */
  getEventPosition(event) {
    const { container } = this.refs;
    let el = container;
    const { offsetWidth } = el;
    let source = el;
    let offsetLeft = 0;

    while (source) {
      offsetLeft += source.offsetLeft;
      source = source.offsetParent;
    }

    return Math.max(0, Math.min(1, (event.pageX - offsetLeft) / offsetWidth));
  }

  /**
   * Render
   */
  render() { // eslint-disable-line complexity
    const {
      props: {
        className,
        value,
        range,
        options,
        showTicks,
        hideBackground,
        hideBar,
        hideHandle
      },
      state: {
        dragging
      }
    } = this;

    let adjustedValue;
    if (Array.isArray(options)) {
      const index = options.indexOf(value);
      adjustedValue = index / (options.length - 1);
    } else {
      adjustedValue = (value - range[0]) / (range[1] - range[0]);
    }

    const percent = (adjustedValue * 100) + '%';

    return (
      <div
        className={classNames(css.container, className, {
          [css.dragging]: dragging
        })}
        ref='container'
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
      >
        {!hideBar ?
          <div
            className={css.bar}
            style={{
              width: percent
            }}
          />
          : null}
        {!hideHandle ?
          <div
            className={css.handle}
            style={{
              left: percent
            }}
          />
          : null}
        {!hideBackground ?
          <div className={css.background} />
          : null}
        {showTicks && Array.isArray(options) && options.length > 1 ?
          options.map((option, index) => (
            <div
              key={option}
              className={css.tick}
              style={{
                left: `${(index / (options.length - 1)) * 100}%`
              }}
            />
          ))
          : null}
      </div>
    );
  }
}

/**
 * Defaults
 */
Slider.defaultProps = {
  className: undefined,
  options: undefined,
  onDragStart: undefined,
  onDragStop: undefined,
  range: [0, 1],
  showTicks: false,
  hideBackground: false,
  hideBar: false,
  hideHandle: false
};

/**
 * Types
 */
Slider.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  range: PropTypes.arrayOf(PropTypes.number),
  options: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func.isRequired,
  onDragStart: PropTypes.func,
  onDragStop: PropTypes.func,
  showTicks: PropTypes.bool,
  hideBackground: PropTypes.bool,
  hideBar: PropTypes.bool,
  hideHandle: PropTypes.bool
};
