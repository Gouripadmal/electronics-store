import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",

    initialState: {
        email: "",
        token: null
    },

    reducers: {
        loginSuccess: (state, action) => {
            state.email = action.payload.email;
            state.token = action.payload.token;
        },

        logout: (state) => {
            state.email = "";
            state.token = null;
        }
    }
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;