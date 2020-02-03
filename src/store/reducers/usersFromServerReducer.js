import { createSelector } from 'reselect';
import { getDataFromApi, usersUrl } from '../../api';

const SET_USERS_FROM_SERVER = 'SET_USERS_FROM_SERVER';

const setUsersFromServer = payload => ({
  type: SET_USERS_FROM_SERVER,
  payload,
});

export const loadUsersInfoFromServer = (
  page = 1, usersCount = 6
) => (dispatch) => {
  getDataFromApi(
    `${usersUrl}?page=${page}&count=${usersCount}`
  )
    .then(data => dispatch(setUsersFromServer(data)));
};

export const selectUsersFromServer = createSelector(
  state => state.usersFromServer,
  (usersFromServer) => {
    if (usersFromServer.users === undefined) {
      return [];
    }

    return usersFromServer.users;
  }
);

export const selectUsersInfoFromServer = state => state.usersFromServer;

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USERS_FROM_SERVER: {
      return action.payload;
    }

    default: return state;
  }
};
