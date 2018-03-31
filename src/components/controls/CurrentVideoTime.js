import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Record } from 'immutable';
import subscribe from 'ship-components-subscribe';

import VideoPlayerTimeStore from '../../data/VideoPlayerTimeStore';
import VideoControl from './VideoControl';

import VideoTimeService from '../../lib/VideoTimeService';

import css from './CurrentVideoTime.css';

export class CurrentVideoTime extends Component { // eslint-disable-line react/require-optimization
  constructor(props) {
    super(props);
    this.state = {
      mode: 'time'
    };

    this.handleToggleMode = this.handleToggleMode.bind(this);
  }

  handleToggleMode() {
    this.setState({
      mode: this.state.mode === 'time' ? 'frames' : 'time'
    });
  }

  render() {
    const {
      state: {
        mode
      },
      props: {
        className,
        videoState: { frameRate },
        timeState: {
          currentTime
        }
      }
    } = this;

    return (
      <VideoControl
        className={classNames(css.container, className)}
        onClick={this.handleToggleMode}
      >
        {mode === 'frames' ?
          Math.floor(currentTime * frameRate).toLocaleString()
          :
          VideoTimeService.seconds2String(currentTime, frameRate)
        }
      </VideoControl>
    );
  }
}

/**
 * Defaults
 */
CurrentVideoTime.defaultProps = {
  className: undefined
};

/**
 * Types
 */
CurrentVideoTime.propTypes = {
  className: PropTypes.string,
  timeState: PropTypes.instanceOf(Record).isRequired,
  videoState: PropTypes.instanceOf(Record).isRequired
};

/**
 * Returns a Component that listens to a store and auto updates itself
 * @return    {React.Component}
 */
export default subscribe({
  WrappedComponent: CurrentVideoTime,
  Store: VideoPlayerTimeStore,
  selectData: store => store.getState(),
  dataKey: 'timeState'
});
