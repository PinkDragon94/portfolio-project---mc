import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import jobBoardReducer from './features/jobBoard/jobBoardSlice';

// Create the store
const store = configureStore({
    reducer: {
        auth: authReducer,
        jobBoard: jobBoardReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Adjust if non-serializable data like WebRTC is used
        }),
});

export default store;
