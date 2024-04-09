import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createManufacturingOrder, deleteManufacturingOrder, getManufacturingOrderList, getManufacturingProduct, getManufacturingUser, searchManufacturingOrder, updateManufacturingOrder } from "./manufacturingApi";

const initialState = {
    status: 'idle',
    manufacturingOrderData: [],
    productList: [],
    userList: []
}

export const getManufacturingOrderListAsync = createAsyncThunk(
    "manufacturingOrder/get",
    async () => {
        try {
            const response = await getManufacturingOrderList();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const getManugfacturingProductListAsync = createAsyncThunk(
    "manufacturingOrderProduct/get",
    async () => {
        try {
            const response = await getManufacturingProduct();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const getManugfacturingUserListAsync = createAsyncThunk(
    "manufacturingOrderUser/get",
    async () => {
        try {
            const response = await getManufacturingUser();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const createManugfacturingOrderAsync = createAsyncThunk(
    "manufacturingOrder/create",
    async (createManufacturingOrderInfo) => {
        try {
            const response = await createManufacturingOrder(createManufacturingOrderInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const updateManugfacturingOrderAsync = createAsyncThunk(
    "manufacturingOrder/update",
    async (updateManufacturingOrderInfo) => {
        try {
            const response = await updateManufacturingOrder(updateManufacturingOrderInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const deleteManufacturingOrderAsync = createAsyncThunk(
    "manufacturingOrder/delete",
    async (orderId) => {
        try {
            const response = await deleteManufacturingOrder(orderId);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const searchManufacturingOrderAsync = createAsyncThunk(
    "manufacturingOrder/search",
    async (orderInfo) => {
        try {
            const response = await searchManufacturingOrder(orderInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

const manufacturingSlice = createSlice({
    name: "manufacturing",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getManufacturingOrderListAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getManufacturingOrderListAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload) {
                state.manufacturingOrderData.splice(0, 1, action.payload);
                state.manufacturingOrderData = state.manufacturingOrderData[0].data;
                // state.orderData.push(action.payload);
            }
        })
        .addCase(getManufacturingOrderListAsync.rejected, (state, action) => {
            state.status = 'idle';
        })
        .addCase(getManugfacturingProductListAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getManugfacturingProductListAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload) {
                state.productList.splice(0, 1, action.payload);
                state.productList = state.productList[0].data;
            }
        })
        .addCase(getManugfacturingProductListAsync.rejected, (state, action) => {
            state.status = 'idle';
        })
        .addCase(getManugfacturingUserListAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getManugfacturingUserListAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload) {
                state.userList.splice(0, 1, action.payload);
                state.userList = state.userList[0].data;
            }
        })
        .addCase(getManugfacturingUserListAsync.rejected, (state, action) => {
            state.status = 'idle';
        })
        .addCase(searchManufacturingOrderAsync.pending, (state) => {
            state.status = "loading"
        })
        .addCase(searchManufacturingOrderAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload) {
                state.manufacturingOrderData = action.payload.data;
                // state.orderData.push(action.payload);
            }
        })
        .addCase(searchManufacturingOrderAsync.rejected, (state, action) => {
            state.status = 'idle';
        })
    }
})

export const getManufacturingUserList = (state) => state.manufacturing.userList;
export const getManufacturingProductList = (state) => state.manufacturing.productList;
export const getManufacturingOrderData = (state) => state.manufacturing.manufacturingOrderData;
export default manufacturingSlice.reducer;