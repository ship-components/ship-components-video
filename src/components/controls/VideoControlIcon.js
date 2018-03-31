
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './VideoControlIcon.css';
import IconClasses from 'ship-components-icon';

/**
 * Standardize the icons on the control bar
 */
export default function VideoControlIcon(props) {
  const {
    className,
    icon,
    onClick,
    onDoubleClick,
    onContextMenu,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp
  } = props;

  return (
    <div
      className={classNames(css.icon, className, IconClasses[icon])}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
      onMouseOver={onMouseOver}
      onMouseUp={onMouseUp}
    />
  );
}

/**
 * Defaults
 */
VideoControlIcon.defaultProps = {
  className: undefined,
  onClick: undefined,
  onDoubleClick: undefined,
  onContextMenu: undefined,
  onMouseDown: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
  onMouseMove: undefined,
  onMouseOut: undefined,
  onMouseOver: undefined,
  onMouseUp: undefined
};

/**
 * Types
 */
VideoControlIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseUp: PropTypes.func,
  icon: PropTypes.string.isRequired
};
