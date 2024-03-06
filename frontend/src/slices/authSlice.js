import { createSlice } from '@reduxjs/toolkit';


// The initialState constant is defined, representing the initial state of the authentication slice. It contains a single property called userInfo, which is initialized based on the value stored in the localStorage under the key 'userInfo'. If there is no value in localStorage for 'userInfo', the userInfo property is set to null.
const initialState = {
  //check if value stored in local storage , under key'userinfo , if found , paarse stored JSON strinf inot javascript object , else set userinfo to null 
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    // The setCredentials reducer function updates the userInfo property in the state with the payload provided in the action. It also stores the updated userInfo in the localStorage under the key 'userInfo'. 
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 24 * 60 * 1000; // 1 day
      // const expirationTime = new Date().getTime() + 60 * 1000; // 1 minute (for testing)
      localStorage.setItem('expirationTime', expirationTime);
    },
    // The logout reducer function resets the userInfo property in the state to null and removes both the 'userInfo' and 'expirationTime' from the localStorage.
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expirationTime');
    },
  },
});

export const { 
  setCredentials, 
  logout 
} = authSlice.actions;

export default authSlice.reducer;
