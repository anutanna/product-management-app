import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer,
});

export default configureStore({ reducer: rootReducer });
