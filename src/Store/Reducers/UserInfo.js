import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: [],
};
const UserInfo = createSlice({
  name: 'userInfo',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default UserInfo.reducer;
export const setUser = UserInfo.actions.setUser;
