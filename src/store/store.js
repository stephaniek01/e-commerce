import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const customLoggerMiddleware = (store) => (next) => (action) => {
  // logic of the logger

  if(!action.type)
    return next(action);

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("current state : ", store.getState());

  next(action);

  console.log("next state : ", store.getState());
};

const middleWares = [customLoggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
