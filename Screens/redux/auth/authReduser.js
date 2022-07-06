import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, nickname: null, stateChange: false };
export const authSlice = createSlice({
  name: "auth",
  initialState: { userId: null, nickname: null, stateChange: false },
  reducers: {
    UpdateUserProfile: (state, { payload }) => (console.log(payload),{
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      avatar:payload.photoURL,
      email:payload.email,
    }),
    AuthStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload,
    }),
    AuthSignOut: () => initialState,
  },
});
