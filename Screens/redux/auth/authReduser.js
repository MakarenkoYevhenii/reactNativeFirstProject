import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, nickname: null, stateChange: false };
export const authSlice = createSlice({
  name: "auth",
  initialState: { userId: null, nickname: null, stateChange: false },
  reducers: {
    UpdateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
    }),
    AuthStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload,
    }),
    AuthSignOut: () => initialState,
  },
});
