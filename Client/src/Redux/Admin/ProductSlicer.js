import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    products: null,
    error: false
}

const ProductSlicer = createSlice({
    name: 'product',
    initialState,
    reducers: {
        products_request: (state) => {
            state.loading = true;
            state.products = null;
            state.error = false;
        },
        products_Success: (state, actions) => {
            state.loading = false;
            state.products = actions.payload;
            state.error = false;
        },
        products_Failed: (state) => {
            state.loading = false;
            state.products = null;
            state.error = true;
        },

    }
});

export const { products_request, products_Success, products_Failed } = ProductSlicer.actions

export default ProductSlicer.reducer