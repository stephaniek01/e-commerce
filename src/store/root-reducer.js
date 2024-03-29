import { combineReducers } from "redux";
import { categoriesReducer } from "./categories/categories.slice";
import { userReducer } from "./user/user.slice";
import { cartReducer } from "./cart/cart.slice";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
