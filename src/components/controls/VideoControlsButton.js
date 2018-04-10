
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconClasses from 'ship-components-icon';

import VideoControl from './VideoControl';

import css from './VideoControlsButton.css';

export default function VideoControlsButton(props) {
  const {
    className,
    onClick,
    onDoubleClick,
    onContextMenu,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    icon,
    children
  } = props;

  return (
    <VideoControl
      tag='button'
      className={classNames(css.container, className)}
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
    >
      <span
        className={classNames(css.icon, IconClasses[icon])}
      />
      {children}
    </VideoControl>
  );
}

/**
 * Defaults
 */
VideoControlsButton.defaultProps = {
  onClick: undefined,
  onDoubleClick: undefined,
  onContextMenu: undefined,
  onMouseDown: undefined,
  onMouseEnter:undefined,
  onMouseLeave:undefined,
  onMouseMove: undefined,
  onMouseOut:undefined,
  onMouseOver:undefined,
  onMouseUp :undefined,
  className: undefined,
  children: null
};

/**
 * Types
 */
VideoControlsButton.propTypes = {
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
  icon: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ])
};
