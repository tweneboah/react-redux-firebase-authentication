import { SET_CURRENT_USER } from "./actionsTypes";

export const setCurrentUser = (userAuth) => {
  return {
    type: SET_CURRENT_USER,
    payload: userAuth
  };
};
