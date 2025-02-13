import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "@/redux/slices/authSlice";
import {usersSlice} from "@/redux/slices/usersSlice";
import {recipesSlice} from "@/redux/slices/recipesSlice";

export const store = configureStore({
    reducer: {
        authorization: authSlice.reducer,
        users: usersSlice.reducer,
        recipes: recipesSlice.reducer,
    }
});