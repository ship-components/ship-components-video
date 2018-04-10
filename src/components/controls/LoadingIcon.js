
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Record} from 'immutable';
import Transition from 'react-addons-css-transition-group';

import css from './LoadingIcon.css';

export default function LoadingIcon(props) {
  const {
    className,
    visible,
    videoState: {
      canPlay,
      isEnded
    }
  } = props;

  return (
    <Transition
      className={classNames(className, css.container)}
      transitionName={css}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      component='div'
    >
      {visible && !canPlay && !isEnded ?
        <svg
          className={css.loader}
          viewBox='0 0 66 66'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            className={css.path}
            fill='none'
            cx='33'
            cy='33'
            r='30'
          />
        </svg>
        : null}
    </Transition>
  );
}

/**
 * Defaults
 */
LoadingIcon.defaultProps = {
  className: undefined,
  visible: false,
  videoState: undefined
};

/**
 * Types
 */
LoadingIcon.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
  videoState: PropTypes.instanceOf(Record)
};
