import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approveOrder, getApproveList } from "./orderApi";

const initialState = {
    status: "idle",
    approveOrderData: [],
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
    }
})

export const getApprovalList = (state) => state.order.approveOrderData;
export default orderSlice.reducer;