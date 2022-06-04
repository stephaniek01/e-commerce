import { CATEGORIES_TYPES } from "./categories.type";

const initialState = {
  categories: [],
};

export const categoriesReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
