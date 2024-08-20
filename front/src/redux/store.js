import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './reduce';

const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer,
    },
});

export default store;
