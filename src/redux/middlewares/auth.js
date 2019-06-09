// react dotenv version 1551921186
import constants from '../../utils/constants';

export const userLogoutFlow = ({ dispatch }) => next => action => {
  if (action.type === constants.auth.LOGGED_OUT) {
    alert('sac');
    localStorage.removeItem(constants.localStorage.isAuth);
  }
  next(action);
};

export const authMiddleware = [userLogoutFlow];
