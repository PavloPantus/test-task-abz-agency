import React from 'react';
import './Input.scss';
import classNames from 'classnames';
import PropTypes, { arrayOf } from 'prop-types';

export const Input = (
  { type, name, placeholder, callbacks,
    filledWithError, hadError, errorMessage,
    className, value, label, reflink }
) => {
  const inputHandler = ({ target }) => {
    callbacks[0](false);
    callbacks[1](target.value);
  };

  return (
    <label className={
      classNames([
        'input__label',
        {
          [className]: className !== undefined,
        },
      ])
    }
    >
      <div className="input__label-name">
        {label}
      </div>

      <input
        ref={reflink}
        type={type}
        name={name}
        placeholder={placeholder}
        className={
          classNames(
            ['input', {
              'input__had-error': hadError,
              'input__error-filled': filledWithError,
            }]
          )
        }
        onChange={inputHandler}
        value={value}
      />
      <div className="input__error-message">
        {(hadError || filledWithError) && errorMessage}
      </div>
    </label>

  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  callbacks: arrayOf(
    PropTypes.func,
  ).isRequired,
  filledWithError: PropTypes.bool,
  hadError: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  reflink: PropTypes.node,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  filledWithError: false,
  hadError: false,
  errorMessage: 'Error',
  className: '',
  value: '',
  label: '',
  reflink: undefined,
};
