import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    signInWithPhoneNumber: (state, action) => {},
  },
});

const { actions, reducer } = loginSlice;

export const { signInWithPhoneNumber } = actions;
export default reducer;
