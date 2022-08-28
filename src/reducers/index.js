import { combineReducers } from "redux";
import { userReducer } from "./rootReducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
