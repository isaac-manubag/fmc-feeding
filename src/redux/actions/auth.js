import constants from '../../utils/constants';

export const loggedIn = () => ({
  type: constants.auth.LOGIN_SUCCESS,
});

export const logout = () => ({
  type: constants.auth.LOGGED_OUT,
});

// export const login = (username, password, handleSuccess, handleError) => ({
//   type: constants.auth.LOGIN_REQUEST,
//   payload: {
//     username,
//     password,
//   },
//   meta: {
//     handleSuccess,
//     handleError,
//   },
// });
