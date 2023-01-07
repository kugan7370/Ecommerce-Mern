import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    current_user: null,
    error: false
}

const UserSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        user_login_request: (state) => {
            state.loading = true;
            state.current_user = null;
            state.error = false;
        },
        user_login_Success: (state, actions) => {
            state.loading = false;
            state.current_user = actions.payload;
            state.error = false;
        },
        user_login_Failed: (state) => {
            state.loading = false;
            state.current_user = null;
            state.error = true;

        }, user_logout: (state) => {
            state.loading = false;
            state.current_user = null;
            state.error = null;
        },
    }
});

export const { user_login_request, user_login_Success, user_login_Failed, user_logout } = UserSlicer.actions

export default UserSlicer.reducer