const { configureStore } = require("@reduxjs/toolkit");
import loginReducer from './slice/login/loginSlice';
import userReducer from './slice/user/userSlice';
import categoryReducer from './slice/category/categorySlice';
import productTypeReducer from './slice/productType/productTypeSlice';
import orderReducer from './slice/order/orderSlice';
import productReducer from './slice/product/productSlice';
import reportReducer from './slice/report/reportSlice';
import manufacturingReducer from './slice/manufacturing/manufacturingSlice';
import workerReducer from './slice/worker/workerSlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer,
        category: categoryReducer,
        productType: productTypeReducer,
        order: orderReducer,
        product: productReducer,
        report: reportReducer,
        manufacturing: manufacturingReducer,
        worker: workerReducer
    }
})