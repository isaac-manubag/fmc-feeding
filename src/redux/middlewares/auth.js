// react dotenv version 1551921186
import constants from '../../utils/constants';

export const userLoginFlow = ({ dispatch }) => next => action => {
  next(action);

  if (action.type === constants.auth.LOGIN_REQUEST) {
  } else if (action.type === constants.auth.LOGIN_ERROR) {
  }
};

export const authMiddleware = [userLoginFlow];
