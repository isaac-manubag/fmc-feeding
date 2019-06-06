import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import apiMiddleware from './middlewares/api';
import { authMiddleware } from './middlewares/auth';

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(...authMiddleware, apiMiddleware),
  );
}
