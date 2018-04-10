
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import invariant from 'invariant';

import VideoControlsButton from '../controls/VideoControlsButton';

export default function NextButton(props) {
  const {
    className,
    onClick
  } = props;

  invariant(
    typeof onClick === 'function',
    'NextButton onClick cb must be a function'
  );

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
