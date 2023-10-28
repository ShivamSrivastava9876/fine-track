const { configureStore } = require("@reduxjs/toolkit");
import loginReducer from './slice/login/loginSlice';
import userReducer from './slice/user/userSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer
    }
})