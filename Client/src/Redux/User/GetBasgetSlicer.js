import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    baskets: [],
    error: false
}

const getBasketSlicer = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        getBasket_request: (state) => {
            state.loading = true;
            state.baskets = null;
            state.error = false;
        },
        getBasket_Success: (state, actions) => {
            state.loading = false;
            state.baskets = actions.payload;
            state.error = false;
        },
        getBasket_Failed: (state) => {
            state.loading = false;
            state.baskets = null;
            state.error = true;
        },
    }
});

export const { getBasket_request, getBasket_Success, getBasket_Failed } = getBasketSlicer.actions

export default getBasketSlicer.reducer