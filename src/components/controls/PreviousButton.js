
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import VideoControlsButton from '../controls/VideoControlsButton';
import invariant from 'invariant';

export default function PreviousButton(props) {
  const {
    className,
    onClick
  } = props;

  invariant(
    typeof onClick === 'function',
    'PreviousButton onClick cb must be a function'
  );

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
