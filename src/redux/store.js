const { configureStore } = require("@reduxjs/toolkit");
import loginReducer from './slice/login/loginSlice';
import userReducer from './slice/user/userSlice';
import categoryReducer from './slice/category/categorySlice';
import productTypeReducer from './slice/productType/productTypeSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        category: categoryReducer,
        productType: productTypeReducer
    }
})