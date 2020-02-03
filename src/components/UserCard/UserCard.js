import React from 'react';
import './UserCard.scss';
import { Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';

export const UserCard = (
  {
    name,
    email,
    phone,
    position,
    photo,
  }
) => (
  <article className="user-card">
    <img
      src={photo}
      alt="user"
      className="user-card__user-photo"
    />

    <Tooltip title={name}>
      <h1 className="user-card__user-name ellipsis">
        {name}
      </h1>
    </Tooltip>

    <h2 className="user-card__user-position">
      {position}
    </h2>

    <Tooltip title={email}>
      <p className="user-card__user-email ellipsis">
        {email}
      </p>
    </Tooltip>

    <p className="user-card__user-phone">
      {phone}
    </p>
  </article>
);

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};
