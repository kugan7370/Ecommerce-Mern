import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: true,
    cartProducts: null,
    error: false
}

const CartSlicer = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCartProducts_Request: (state, actions) => {
            state.loading = true;
            state.cartProducts = null
            state.error = false
        },
        getCartProducts_Success: (state, actions) => {
            state.loading = false;
            state.cartProducts = actions.payload;
            state.error = false
        },
        getCartProducts_Failure: (state, actions) => {
            state.loading = false;
            state.cartProducts = null
            state.error = true
        },

        // RemoveCartProducts_Success: (state, actions) => {
        //     state.loading = false;
        //     state.cartProducts = actions.payload;
        //     state.error = false
        // },


    }
});

export const { getCartProducts_Request, getCartProducts_Success, getCartProducts_Failure, addCartProducts } = CartSlicer.actions

export default CartSlicer.reducer