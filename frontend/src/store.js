// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './slices/apiSlice';
// import cartSliceReducer from './slices/cartSlice';
// import authReducer from './slices/authSlice'; // add this line

// const store = configureStore(
//   {
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
  //   cart: cartSliceReducer,
  //   auth: authReducer, // add this line
  // },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// }
//   }
// );




import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import authReducer from './slices/authSlice'; // add this line
// Import other slice reducers here if needed

const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: cartSliceReducer,
  auth: authReducer,
  // Add other slice reducers here if needed
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Set devTools to true if needed
});



export default store;
