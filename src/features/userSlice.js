import { createSlice } from '@reduxjs/toolkit';
import { getCustomerSubscription, getProducts, loadStripeCheckout } from '../firebase/collections'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        loadingCheckout: false,
        priceID: null,
        products: [],
        subscription: null,
        user: null 
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        } 
    },
    extraReducers: {
        [getCustomerSubscription.pending]: (state) => {
          state.loading = true
        },
        [getCustomerSubscription.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.subscription = payload
        },
        [getCustomerSubscription.rejected]: (state) => {
          state.loading = false
        },
        [getProducts.pending]: (state) => {
          state.loading = true
        },
        [getProducts.fulfilled]: (state, { payload }) => {
          state.loading = false
          state.products = payload
        },
        [getProducts.rejected]: (state) => {
          state.loading = false
        },
        [loadStripeCheckout.pending]: (state) => {
            state.loadingCheckout = true
        },
        [loadStripeCheckout.fulfilled]: (state, { payload }) => {
            state.loadingCheckout = true
            state.priceID = payload
        },
        [loadStripeCheckout.rejected]: (state) => {
            state.loadingCheckout = false
        },
      },
});

export const { login, logout, getSubscription } = userSlice.actions;

export const selectUser = state => state.user;
export default userSlice.reducer;