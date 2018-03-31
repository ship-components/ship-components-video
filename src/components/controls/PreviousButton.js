
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VideoControlsButton from '../controls/VideoControlsButton';

export default function PreviousButton(props) {
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
      icon='skip_previous'
      onClick={onClick}
    />
  );
}

/**
 * Defaults
 */
PreviousButton.defaultProps = {
  className: undefined,
  onClick: undefined
};

/**
 * Types
 */
PreviousButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};
