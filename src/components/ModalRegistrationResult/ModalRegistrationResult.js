import React from 'react';
import './ModalRegistrationResult.scss';
import PropTypes from 'prop-types';
import { Button } from '../button/button';

export const ModalRegistrationResult = (
  {
    errorMessage,
    closeModalCallback,
  }
) => (
  <div className="modal">
    <div className="modal__window">
      <div className="modal__heading-container">
        <div className="modal__heading">
          {!errorMessage && 'Congratulations'}
          {errorMessage && 'Error'}
        </div>

        <button
          type="button"
          onClick={closeModalCallback}
          className="modal__close-button"
        />
      </div>
      <div className="modal__message">
        {errorMessage && errorMessage}
        {
          !errorMessage
            && 'You have successfully passed the registration'
        }
      </div>
      <Button
        value={(!errorMessage && 'Great') || 'Try again'}
        className="modal__great-button"
        onClick={closeModalCallback}
      />
    </div>
  </div>
);

ModalRegistrationResult.propTypes = {
  errorMessage: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.bool,
    ]
  ).isRequired,
  closeModalCallback: PropTypes.func.isRequired,
};

ModalRegistrationResult.defaultProps = {

};
