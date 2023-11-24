import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approveOrder, getApproveList, getOrder } from "./orderApi";

const initialState = {
    status: "idle",
    approveOrderData: [],
    orderData: [],
    error: null
}

export const getApproveListAsync = createAsyncThunk(
    "order/approveOrder/get",
    async () => {
        try {
            const response = await getApproveList();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const approveOrderAsync = createAsyncThunk(
    "order/approveOrder/update",
    async (orderApproval) => {
        try {
            const response = await approveOrder(orderApproval);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const getOrderListAsync = createAsyncThunk(
    "order/get",
    async () => {
        try {
            const response = await getOrder();
            console.log("order response", response)
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getApproveListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getApproveListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.approveOrderData.splice(0, 1, action.payload);
                    state.approveOrderData = state.approveOrderData[0].data;
                }
            })
            .addCase(getApproveListAsync.rejected, (state, action) => {
                state.status = action.payload;
            })
            .addCase(approveOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(approveOrderAsync.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(approveOrderAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(getOrderListAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderListAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.orderData.splice(0, 1, action.payload);
                    state.orderData = state.orderData[0].data;
                    // state.orderData.push(action.payload);
                }
            })
            .addCase(getOrderListAsync.rejected, (state, action) => {
                state.status = action.payload;
            })
    }
})

export const getApprovalList = (state) => state.order.approveOrderData;
export const getOrderList = (state) => state.order.orderData;
export default orderSlice.reducer;