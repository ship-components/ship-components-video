
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './VideoControl.css';

export default function VideoControl(props) {
  const {
    className,
    children,
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
    tag
  } = props;

  const Component = tag;

  return (
    <Component
      className={classNames(css.container, className)}
      onClick={(event) => {
        if (typeof onClick === 'function') {
          // Prevent spacebar from triggering click event in FF
          event.target.blur();
          onClick(event);
        }
      }}
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
      <span className={css.wrapper}>
        {children}
      </span>
    </Component>
  );
}

/**
 * Defaults
 */
VideoControl.defaultProps = {
  tag: 'div',
  className: undefined,
  onClick: undefined,
  onContextMenu: undefined,
  onDoubleClick: undefined,
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
VideoControl.propTypes = {
  tag: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]),
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]).isRequired
};
