import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';


//check local storage for item with key "cart" if exist (truth) else skip to : 
const initialState = localStorage.getItem('cart')
//parse value associated with cart from json string to javascript object  and assign parsed object to initialState
  ? JSON.parse(localStorage.getItem('cart'))
  //else assign empty array for CartItems & shippingAddress 
  : { cartItems: [], shippingAddress: {},paymentMethod:'PayPal' };

  // The cartSlice is created using the createSlice function from Redux Toolkit. It takes an object with the following properties:


    // name: The name of the slice, which is 'cart' in this case.
    // initialState: The initial state of the cart, as described above.
    // reducers: An object containing the reducer functions for different cart-related actions.
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  
    addToCart: (state, action) => {
      // const jsonState = JSON.stringify(state);
      // console.log(jsonState);
      const item = action.payload;
      // Find an existing item in the cart that matches the incoming item by comparing their product
      const existItem = state.cartItems.find((x) => x._id === item._id);
      //existing item is not undefined , means item exist in the cart, thus existing item is replace with new items in cartItem array 
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        //existing item is undefined , new item added to cartItem array , cant push because  immuatable 
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },

    //!return all the cart item that we dont delete 
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
        return updateCart(state);
      },

    //!update shippingAddress property 
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    // save the entire state (including updated shipping address ) to localStorage under key'cart'
      localStorage.setItem('cart', JSON.stringify(state));
      },
    // updates the payment method in the cart state. It sets the paymentMethod property to the payload received in the action and updates the localStorage with the updated cart state.
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
      },
    // clears all items from the cart. It sets the cartItems array to an empty array and updates the localStorage with the updated cart state.
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem('cart', JSON.stringify(state));
      },
  }
  })

  export const {  
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems
  } = cartSlice.actions;
export default cartSlice.reducer;
 