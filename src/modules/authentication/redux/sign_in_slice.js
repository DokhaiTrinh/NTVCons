import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const signInSlice = createSlice({
  name: 'signIn',
  initialState: initialState,
  reducers: {
    signInWithPhoneNumber: (state, action) => {}
  }
});

const { actions, reducer } = signInSlice;

export const { signInWithPhoneNumber } = actions;
export default reducer;