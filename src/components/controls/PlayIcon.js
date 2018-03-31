
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Record} from 'immutable';
import subscribe from 'ship-components-subscribe';
import IconClasses from 'ship-components-icon';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import VideoPlayerTimeStore from '../../data/VideoPlayerTimeStore';
import css from './PlayIcon.css';

function PlayIcon(props) {
  const {
    playable,
    className,
    display,
    videoState: {
      isPlaying,
      isAutoPlay,
      canPlay
    },
    timeState: {
      currentTime
    }
  } = props;

  return (
    <CSSTransitionGroup
      className={classNames(className, css.container)}
      transitionName={css}
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
      component='div'
    >
      {display !== 'auto' || (playable && canPlay && !isPlaying && parseFloat(currentTime.toFixed(3)) < 0.04 && !isAutoPlay) ?
        <div className={classNames(css.icon, IconClasses.play_circle_outline)} />
        : null}
    </CSSTransitionGroup>
  );
}

/**
 * Defaults
 */
PlayIcon.defaultProps = {
  display: 'auto',
  playable: true,
  className: undefined
};

/**
 * Types
 */
PlayIcon.propTypes = {
  display: PropTypes.string,
  className: PropTypes.string,
  videoState: PropTypes.instanceOf(Record).isRequired,
  timeState: PropTypes.instanceOf(Record).isRequired,
  playable: PropTypes.bool
};

/**
 * Returns a Component that listens to a store and auto updates itself
 * @return    {React.Component}
 */
export default subscribe({
  WrappedComponent: PlayIcon,
  Store: VideoPlayerTimeStore,
  selectData: store => store.getState(),
  dataKey: 'timeState'
});
