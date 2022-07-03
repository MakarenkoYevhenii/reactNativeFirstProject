import db from "../../../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReduser";

const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    try {
      const userLogIn = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { uid, displayName } = auth.currentUser;
      dispatch(
        authSlice.actions.UpdateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    const auth = getAuth();
    try {
      const userLogIn = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName } = userLogIn.user;

      dispatch(
        authSlice.actions.UpdateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

const AuthStateChangeUser = () => async (dispatch, getState) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authSlice.actions.UpdateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
        })
      );
      dispatch(authSlice.actions.AuthStateChange(true));
    }
  });
};
const authSignOutUser = () => async (dispatch, getState) => {
  try {
    const auth = getAuth();
    signOut(auth);
    dispatch(authSlice.actions.AuthSignOut())
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }
};

export { authSignUpUser, authSignInUser, authSignOutUser, AuthStateChangeUser };
