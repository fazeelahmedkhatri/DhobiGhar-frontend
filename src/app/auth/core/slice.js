import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {},
  isLoggedIn: false,
  token: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogin(state, { type, payload }) {
      state.isLoggedIn = payload;
    },
    setUser(state, { type, payload }) {
      state.user = payload.data;
    },
    setToken(state, { type, payload }) {
      state.token = payload.data;
    },
  },
});

export const {
  setLogin,
  setUser,
  setToken,
} = authSlice.actions;
export default authSlice.reducer;
