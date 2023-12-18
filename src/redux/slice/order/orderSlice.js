import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approveOrder, declineOrder, getApproveList, getCancelledOrder, getConfirmOrder, getDashboardDetails, getDeclinedOrder, getDeliveredOrder, getLiveManufacturingOrder, getOrder, searchOrder } from "./orderApi";

const initialState = {
    status: "idle",
    approveOrderData: [],
    orderData: [],
    confirmOrderData: [],
    deliveredOrderData: [],
    cancelledOrderData: [],
    declinedOrderData: [],
    liveManufacturingOrderData: [],
    dashboardDetails: null,
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

export const declineOrderAsync = createAsyncThunk(
    "order/declineOrder/update",
    async (orderDecline) => {
        try {
            const response = await declineOrder(orderDecline);
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
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const searchOrderAsync = createAsyncThunk(
    "order/searchOrder",
    async (searchOrderInfo) => {
        try {
            const response = await searchOrder(searchOrderInfo);
            return response.data.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getConfirmOrderAsync = createAsyncThunk(
    "order/confirmOrder",
    async () => {
        try {
            const response = await getConfirmOrder();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getDeliveredOrderAsync = createAsyncThunk(
    "order/deliveredOrder",
    async () => {
        try {
            const response = await getDeliveredOrder();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getCancelledOrderAsync = createAsyncThunk(
    "order/cancelledOrder",
    async () => {
        try {
            const response = await getCancelledOrder();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getDeclinedOrderAsync = createAsyncThunk(
    "order/declinedOrder",
    async () => {
        try {
            const response = await getDeclinedOrder();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getDashboardDetailsAsync = createAsyncThunk(
    "order/dashboardDetails",
    async () => {
        try {
            const response = await getDashboardDetails();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getLiveManufacturingOrderAsync = createAsyncThunk(
    "order/liveManufacturingOrder",
    async () => {
        try {
            const response = await getLiveManufacturingOrder();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

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
                state.status = 'idle';
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
            .addCase(declineOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(declineOrderAsync.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(declineOrderAsync.rejected, (state) => {
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
                state.status = 'idle';
            })
            .addCase(searchOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.orderData = action.payload;
                }
            })
            .addCase(searchOrderAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getConfirmOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getConfirmOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.confirmOrderData.splice(0, 1, action.payload);
                    state.confirmOrderData = state.confirmOrderData[0].data;
                }
            })
            .addCase(getConfirmOrderAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getDeliveredOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDeliveredOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.deliveredOrderData.splice(0, 1, action.payload);
                    state.deliveredOrderData = state.deliveredOrderData[0].data;
                }
            })
            .addCase(getDeliveredOrderAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getCancelledOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCancelledOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.cancelledOrderData.splice(0, 1, action.payload);
                    state.cancelledOrderData = state.cancelledOrderData[0].data;
                }
            })
            .addCase(getCancelledOrderAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getDeclinedOrderAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDeclinedOrderAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.declinedOrderData.splice(0, 1, action.payload);
                    state.declinedOrderData = state.declinedOrderData[0].data;
                }
            })
            .addCase(getDeclinedOrderAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getDashboardDetailsAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getDashboardDetailsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.dashboardDetails = action.payload;
            })
            .addCase(getDashboardDetailsAsync.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase(getLiveManufacturingOrderAsync.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getLiveManufacturingOrderAsync.fulfilled, (state, action) => {
                if (action.payload) {
                    state.liveManufacturingOrderData.splice(0, 1, action.payload);
                    state.liveManufacturingOrderData = state.liveManufacturingOrderData[0].data;
                }
            })
            .addCase(getLiveManufacturingOrderAsync.rejected, (state, action) => {
                state.status = 'idle'
                state.error = action.payload
            })
    }
})

export const getApprovalList = (state) => state.order.approveOrderData;
export const getOrderList = (state) => state.order.orderData;
export const getConfirmOrderData = (state) => state.order.confirmOrderData;
export const getDeliveredOrderData = (state) => state.order.deliveredOrderData;
export const getCancelledOrderData = (state) => state.order.cancelledOrderData;
export const getDeclinedOrderData = (state) => state.order.declinedOrderData;
export const getDashboardData = (state) => state.order.dashboardDetails;
export const getLiveManufacturingOrderData = (state) => state.order.liveManufacturingOrderData;
export default orderSlice.reducer;