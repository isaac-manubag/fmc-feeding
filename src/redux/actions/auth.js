import constants from '../../utils/constants';

export const login = (username, password, handleSuccess, handleError) => ({
  type: constants.auth.LOGIN_REQUEST,
  payload: {
    username,
    password,
  },
  meta: {
    handleSuccess,
    handleError,
  },
});

export const logout = () => ({
  type: constants.auth.LOGGING_OUT,
});
