import React from 'react';
import './button.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Button = ({ className, value, onClick, type, hidden }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    className={classNames(
      [
        className,
        'button',
        {
          button_hidden: hidden,
        },
      ]
    )}
    onClick={onClick}
  >
    {value}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  hidden: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  onClick: null,
  type: 'button',
  hidden: false,
};
