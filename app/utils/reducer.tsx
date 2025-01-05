// loginReducer.tsx
import { legacy_createStore as createStore } from "redux";

type Action = {
  type: string;
};

// Set a default initial state in the reducer
const initialState = false;

export function loginReducer(state = initialState, action: Action): boolean {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
}

const store = createStore(loginReducer);

export default store;
