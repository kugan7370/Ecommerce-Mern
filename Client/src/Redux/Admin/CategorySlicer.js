import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    categories: null,
    error: false
}

const CategorySlicer = createSlice({
    name: 'category',
    initialState,
    reducers: {
        category_request: (state) => {
            state.loading = true;
            state.categories = null;
            state.error = false;
        },
        category_Success: (state, actions) => {
            state.loading = false;
            state.categories = actions.payload;
            state.error = false;
        },
        category_Failed: (state) => {
            state.loading = false;
            state.categories = null;
            state.error = true;



        }
    }
});

export const { category_request, category_Success, category_Failed } = CategorySlicer.actions

export default CategorySlicer.reducer