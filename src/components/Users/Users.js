import React, { useEffect } from 'react';
import './Users.scss';
import PropTypes from 'prop-types';
import { Button } from '../button/button';
import { UserCard } from '../UserCard/UserCard';

export const Users = (
  {
    usersFromServer,
    usersInfoFromServer,
    loadUsersInfoFromServer,
  }
) => {
  useEffect(() => {
    loadUsersInfoFromServer();
  }, []);

  const handleShowMoreClick = () => {
    loadUsersInfoFromServer(1, usersInfoFromServer.count + 6);
  };

  return (
    <section className="users section">
      <div className="container">
        <div className="users__content">
          <h2 className="users__heading">
            Our cheerful users
          </h2>
          <p className="users__description">
            Attention! Sorting users by registration date
          </p>
          <ul className="users__list">
            {
              usersFromServer.map(
                (user) => {
                  const { id, name, phone, photo, position, email } = user;

                  return (
                    <li key={id}>
                      <UserCard

                        name={name}
                        phone={phone}
                        position={position}
                        photo={photo}
                        email={email}
                      />
                    </li>
                  );
                }
              )
            }
          </ul>

          <Button
            onClick={handleShowMoreClick}
            value="Show more"
            className="users__show-more-button"
            hidden={
              usersInfoFromServer.count >= usersInfoFromServer.total_users
            }
          />
        </div>
      </div>
    </section>
  );
};

Users.propTypes = {
  usersFromServer: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  usersInfoFromServer: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.object,
    ])
  ).isRequired,
  loadUsersInfoFromServer: PropTypes.func.isRequired,
};

Users.defaultProps = {
  usersFromServer: [],
};
