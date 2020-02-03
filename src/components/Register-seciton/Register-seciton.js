/* eslint-disable */
import React, { useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Register-seciton.scss';
import classNames from 'classnames';
import { Input } from '../Input';
import { getDataFromApi, positionsUrl, tokenUrl, usersUrl } from '../../api';
import { Button } from '../button/button';
import { ModalRegistrationResult } from '../ModalRegistrationResult';

export const RegisterSection = (
  {
    loadUsersInfoFromServer,
  }
) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getDataFromApi(positionsUrl)
      .then(data => setPositions(data.positions));
  }, []);

  const [userName, setUserName] = useState('');
  const [userNameHadError, setUserNameHadError] = useState(false);
  const userNameFilledWithError = (
    userName.length > 0 && (userName.trim().length < 2 || userName.length > 60)
  );
  const userNameRef = useRef();

  const [userEmail, setUserEmail] = useState('');
  const [userEmailHadError, setUserEmailHadError] = useState(false);
  const userEmailFilledWithError = useMemo(
    () => {
      const resultOfFitToPattern = userEmail.match(
        // eslint-disable-next-line max-len,no-useless-escape
        /(^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$)/
      ) || [];

      return resultOfFitToPattern.length < 1
      && userEmail.length > 0;
    }, [userEmail]
  );
  const userEmailRef = useRef(null);

  const [userPhone, setUserPhone] = useState('');
  const [userPhoneHadError, setUserPhoneHadError] = useState(false);
  const userPhoneFilledWithError = useMemo(() => {
    // eslint-disable-next-line no-useless-escape,max-len
    const resultOfFitToPattern = userPhone.match(
      /(^[\+]{0,1}380([0-9]{9})$)/
    ) || [];

    return resultOfFitToPattern.length < 2
      && userPhone.length > 0;
  }, [userPhone]);
  const userPhoneRef = useRef(null);

  const [userPosition, setUserPosition] = useState('');
  const [userPositionHadError, setUserPositionHadError] = useState(false);
  const handlePositionRadioInput = ({ target }) => {
    setUserPositionHadError(false);
    setUserPosition(+target.value);
  };

  const userPositionsRef = useRef(null);

  const [userPhoto, setUserPhoto] = useState('Upload your photo');
  const [userPhotoHasError, setUserPhotoHasError] = useState(false);
  const [userPhotoHadError, setUserPhotoHadError] = useState(false);
  const handleUserPhoto = ({ target }) => {
    if (target.files.length === 0) {
      setUserPhoto('No file chosen');

      return;
    }

    setUserPhotoHadError(false);
    setUserPhoto(target.files[0]);
  };

  const handleUserPhotoClick = ({ target }) => {
    setUserPhoto('No file chosen');
  };

  const userPhotoRef = useRef(null);

  useEffect(() => {
    if (typeof userPhoto === 'string') {
      return;
    }

    const img = document.createElement('img');

    img.onload = () => {
      if (img.width * img.height < 70 * 70
        || userPhoto.size > 5242880
        || userPhoto === 'No file chosen'
      ) {
        setUserPhotoHasError(true);
      } else {
        setUserPhotoHasError(false);
      }
    };

    const reader = new FileReader();

    reader.onloadend = (ended) => {
      img.src = ended.target.result;
    };

    reader.readAsDataURL(userPhoto);
  }, [userPhoto]);

  const [
    formHasServerSideError,
    setFormHasServerSideError,
  ] = useState(false);
  const [
    showModalRegistrationResult,
    setShowModalRegistrationResult,
  ] = useState(false);

  const handleSubmitOfRegisterForm = (event) => {
    event.preventDefault();

    if (
      userNameFilledWithError
      || userName === ''
    ) {
      userNameRef.current.scrollIntoView({
        block: 'center', inline: 'nearest',
      });

      setUserNameHadError(true);

      return;
    }

    if (
      userEmailFilledWithError
      || userEmail === ''
    ) {
      userEmailRef.current.scrollIntoView({
        block: 'center', inline: 'nearest',
      });

      setUserEmailHadError(true);

      return;
    }

    if (
      userPhoneFilledWithError
        || userPhone === ''
    ) {
      userPhoneRef.current.scrollIntoView({
        block: 'center', inline: 'nearest',
      });

      setUserPhoneHadError(true);

      return;
    }

    if (userPosition === '') {
      userPositionsRef.current.scrollIntoView({
        block: 'center',
        inline: 'nearest',
      });
      setUserPositionHadError(true);

      return;
    }

    if (
      userPhoto === 'Upload your photo'
      || userPhotoHasError
    ) {
      userPhotoRef.current.scrollIntoView({
        block: 'center',
        inline: 'nearest',
      });
      setUserPhotoHadError(true);

      return;
    }

    const formData = new FormData();

    formData.append('position_id', userPosition);
    formData.append('name', userName);
    formData.append('email', userEmail);
    formData.append('phone', userPhone);
    formData.append('photo', userPhoto);

    const sendFormData = async() => {
      const token = await getDataFromApi(tokenUrl);

      fetch(usersUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Token: token.token,
        },
      })
        .then(response => response.json())
        .then((data) => {
          if (data.success) {
            loadUsersInfoFromServer(1, 6);
          } else {
            setFormHasServerSideError(data.message);
            setUserPhone('');
            setUserPhoneHadError(true);
            setUserEmailHadError(true);
            setUserEmail('');
          }
        })
        .finally(() => {
          setShowModalRegistrationResult(true);
        });
    };

    sendFormData();
  };

  const inputsCallBacks = (
    inputHadErorSetState,
    inputValueSetState
  ) => [inputHadErorSetState, inputValueSetState];

  return (
    <section id="register-section" className="register">
      <div className="container">
        <p className="register__heading">
          Register to get a work
        </p>
        <p className="register__description">
          Attention! After successful registration and alert,
          update the list of users in the block from the top
        </p>
        <form
          onSubmit={handleSubmitOfRegisterForm}
          action="#"
          className="register__form"
        >
          <Input
            reflink={userNameRef}
            type="text"
            name="name"
            placeholder="Your name"
            filledWithError={userNameFilledWithError}
            hadError={userNameHadError}
            errorMessage="Error! Username should contain 2-60 characters"
            className="register__name-input"
            callbacks={
              inputsCallBacks(setUserNameHadError, setUserName)
            }
            value={userName}
            label="Name"

          />

          <Input
            reflink={userEmailRef}
            type="email"
            name="email"
            placeholder="Your email"
            filledWithError={userEmailFilledWithError}
            hadError={userEmailHadError}
            errorMessage={
              `Error! Your email have to be in
              format youremail@example.com`
            }
            className="register__email-input"
            callbacks={
              inputsCallBacks(setUserEmailHadError, setUserEmail)
            }
            value={userEmail}
            label="Email"

          />

          <Input
            reflink={userPhoneRef}
            type="tel"
            name="phoneNumber"
            placeholder="+380 XX XXX XX XX"
            filledWithError={userPhoneFilledWithError}
            hadError={userPhoneHadError}
            errorMessage="Error! Еnter phone number in format +380 XX XXX XX XX"
            className="register__phone-input"
            callbacks={
              inputsCallBacks(setUserPhoneHadError, setUserPhone)
            }
            value={userPhone}
            label="Phone number"
          />

          <div
            ref={userPositionsRef}
            className={
              classNames([
                'register__positions', 'positions',
                {
                  'positions__had-error': userPositionHadError,
                },
              ])
            }
          >
            <div className="positions__heading">
              Select your position
            </div>

            {
              positions
                .map(
                  (position, index) => (
                    <div
                      key={position.id}
                      className="positions__item"
                    >
                      <label>
                        <span className={
                          classNames(
                            [
                              'positions__icon',
                              {
                                positions__icon_checked: (
                                  +userPosition === position.id
                                ),
                              },
                            ]

                          )
                        }
                        />
                        <input
                          className="positions__input"
                          onChange={handlePositionRadioInput}
                          type="radio"
                          name="position"
                          value={position.id}
                        />
                        {position.name}
                      </label>
                    </div>
                  )
                )
            }

            <div className="positions__error-message">
              {userPositionHadError
              && 'Error! no chosen position'
              }
            </div>
          </div>

          <label
            ref={userPhotoRef}
            className={
              classNames(
                [
                  'register__input-file',
                  'input-file',
                ]
              )
            }
          >
            <div className="input-file__heading">
              Photo
            </div>
            <input
              accept="image/jpeg"
              onChange={handleUserPhoto}
              onClick={handleUserPhotoClick}
              type="file"
              className="input-file__input"
            />
            <div className={
              classNames([
                'input-file__container',
                { 'input-file__error': (
                  userPhoto === 'No file chosen'
                    || userPhotoHasError
                      || userPhotoHadError

                ) },
              ])
            }
            >
              <span className="input-file__name">
                {
                  (
                    userPhoto !== undefined
                  && typeof userPhoto !== 'string'
                  )
                    ? userPhoto.name : userPhoto
                }
              </span>
              <div className="input-file__browse-button">
                Browse
              </div>
            </div>
            <div className="input-file__error-message">
              {
                (
                (userPhoto === 'No file chosen' || userPhotoHadError) &&
                'Error! no file chosen')
                || (userPhotoHasError)
              && `Error! Minimum size of photo 70x70px.
              The photo size must not be greater than 5 Mb.`
              }
            </div>

          </label>

          <Button
            value="Sing up now"
            className="register__submit"
            type="submit"
          />
        </form>
      </div>

      {
        showModalRegistrationResult
        && (
          <ModalRegistrationResult
            errorMessage={formHasServerSideError}
            closeModalCallback={() => {
              setFormHasServerSideError(false);
              setShowModalRegistrationResult(false);
            }}
          />
        )
      }
    </section>
  );
};

RegisterSection.propTypes = {
  loadUsersInfoFromServer: PropTypes.func.isRequired,
};
