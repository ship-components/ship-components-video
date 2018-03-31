
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import VideoControlsButton from '../controls/VideoControlsButton';

export default function NextButton(props) {
  const {
    className,
    onClick
  } = props;

  if (typeof onClick !== 'function') {
    return null;
  }

  return (
    <VideoControlsButton
      className={classNames(className)}
      icon='skip_next'
      onClick={onClick}
    />
  );
}

/**
 * Defaults
 */
NextButton.defaultProps = {
  className: undefined,
  onClick: undefined
};

/**
 * Types
 */
NextButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};
