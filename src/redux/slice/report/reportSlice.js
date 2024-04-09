import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDailyReport, getDailyReportData, getMonthlyReport, getMonthlyReportData, getWeeklyReport, getWeeklyReportData, getYearlyReport, getYearlyReportData, getDailyManufacturingReport, getDailyManufacturingReportData, getWeeklyManufacturingReport, getMonthlyManufacturingReport, getYearlyManufacturingReport, getWeeklyManufacturingReportData, getMonthlyManufacturingReportData, getYearlyManufacturingReportData, getWorkerReport, getManufacturingByWorkerReport, getUserReport, getOrderByUserReport, getProductReport, getOrderByProductReport, searchProductReport, searchUserReport, searchWorkerReport } from "./reportApi";

const initialState = {
    status: 'idle',
    reportData: null,
    dailyReportData: [],
    weeklyReportData: [],
    monthlyReportData: [],
    yearlyReportData: [],
    workerReportData: [],
    manufacturingByWorkerData: [],
    selectedWorkerName: "",
    userReportData: [],
    orderByUserdata: [],
    selectedUserName: "",
    productReportData: [],
    orderByProductData: [],
    selectedProductName: "",
    error: null
}

export const getDailyReportAsync = createAsyncThunk(
    "report/daily/get",
    async () => {
        try {
            const response = await getDailyReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getWeeklyReportAsync = createAsyncThunk(
    "report/weekly/get",
    async () => {
        try {
            const response = await getWeeklyReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getMonthlyReportAsync = createAsyncThunk(
    "report/monthly/get",
    async () => {
        try {
            const response = await getMonthlyReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getYearlyReportAsync = createAsyncThunk(
    "report/yearly/get",
    async () => {
        try {
            const response = await getYearlyReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getDailyReportDataAsync = createAsyncThunk(
    "report/dailyData",
    async () => {
        try {
            const response = await getDailyReportData();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getWeeklyReportDataAsync = createAsyncThunk(
    "report/WeeklyData",
    async () => {
        try {
            const response = await getWeeklyReportData();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getMonthlyReportDataAsync = createAsyncThunk(
    "report/MonthlyData",
    async () => {
        try {
            const response = await getMonthlyReportData();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getYearlyReportDataAsync = createAsyncThunk(
    "report/YearlyData",
    async () => {
        try {
            const response = await getYearlyReportData();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

//Manufacturing report
export const getDailyManufacturingReportAsync = createAsyncThunk(
    "manufacturingReport/daily/get",
    async () => {
        try {
            const response = await getDailyManufacturingReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getWeeklyManufacturingReportAsync = createAsyncThunk(
    "manufacturingReport/weekly/get",
    async () => {
        try {
            const response = await getWeeklyManufacturingReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getMonthlyManufacturingReportAsync = createAsyncThunk(
    "manufacturingReport/monthly/get",
    async () => {
        try {
            const response = await getMonthlyManufacturingReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getYearlyManufacturingReportAsync = createAsyncThunk(
    "manufacturingReport/yearly/get",
    async () => {
        try {
            const response = await getYearlyManufacturingReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getDailyManufacturingReportDataAsync = createAsyncThunk(
    "report/dailyManufacturingData",
    async () => {
        try {
            const response = await getDailyManufacturingReportData();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getWeeklyManufacturingReportDataAsync = createAsyncThunk(
    "report/weeklyManufacturingData",
    async () => {
        try {
            const response = await getWeeklyManufacturingReportData();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getMonthlyManufacturingReportDataAsync = createAsyncThunk(
    "report/monthlyManufacturingData",
    async () => {
        try {
            const response = await getMonthlyManufacturingReportData();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getYearlyManufacturingReportDataAsync = createAsyncThunk(
    "report/yearlyManufacturingData",
    async () => {
        try {
            const response = await getYearlyManufacturingReportData();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getWorkerReportAsync = createAsyncThunk(
    "report/worker",
    async () => {
        try {
            const response = await getWorkerReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getManufacturingByWorkerReportAsync = createAsyncThunk(
    "report/ManufacturingByWorker",
    async (workerId) => {
        try {
            const response = await getManufacturingByWorkerReport(workerId);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

//User report APIs
export const getUserReportAsync = createAsyncThunk(
    "report/user",
    async () => {
        try {
            const response = await getUserReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getOrderByUserReportAsync = createAsyncThunk(
    "report/orderByuser",
    async (userId) => {
        try {
            const response = await getOrderByUserReport(userId);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

//Product report APIs
export const getProductReportAsync = createAsyncThunk(
    "report/product",
    async () => {
        try {
            const response = await getProductReport();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const getOrderByProductReportAsync = createAsyncThunk(
    "report/orderByProduct",
    async (productId) => {
        try {
            const response = await getOrderByProductReport(productId);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

//search
export const searchProductReportAsync = createAsyncThunk(
    "report/searchProduct",
    async (searchInfo) => {
        try {
            const response = await searchProductReport(searchInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const searchUserReportAsync = createAsyncThunk(
    "report/searchUser",
    async (searchInfo) => {
        try {
            const response = await searchUserReport(searchInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const searchWorkerReportAsync = createAsyncThunk(
    "report/searchWorker",
    async (searchInfo) => {
        try {
            const response = await searchWorkerReport(searchInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDailyReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDailyReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.reportData = action.payload;
            })
            .addCase(getDailyReportAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getWeeklyReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeeklyReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.reportData = action.payload;
            })
            .addCase(getWeeklyReportAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getMonthlyReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMonthlyReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.reportData = action.payload;
            })
            .addCase(getMonthlyReportAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getYearlyReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getYearlyReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.reportData = action.payload;
            })
            .addCase(getYearlyReportAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getDailyReportDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDailyReportDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.dailyReportData.splice(0, 1, action.payload);
                    state.dailyReportData = state.dailyReportData[0].data;
                }
            })
            .addCase(getDailyReportDataAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getWeeklyReportDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeeklyReportDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.weeklyReportData.splice(0, 1, action.payload);
                    state.weeklyReportData = state.weeklyReportData[0].data;
                }
            })
            .addCase(getWeeklyReportDataAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getMonthlyReportDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMonthlyReportDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.monthlyReportData.splice(0, 1, action.payload);
                    state.monthlyReportData = state.monthlyReportData[0].data;
                }
            })
            .addCase(getMonthlyReportDataAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getYearlyReportDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getYearlyReportDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.yearlyReportData.splice(0, 1, action.payload);
                    state.yearlyReportData = state.yearlyReportData[0].data;
                }
            })
            .addCase(getYearlyReportDataAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getDailyManufacturingReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDailyManufacturingReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.reportData = action.payload;
            })
            .addCase(getDailyManufacturingReportAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getWeeklyManufacturingReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeeklyManufacturingReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.reportData = action.payload;
            })
            .addCase(getWeeklyManufacturingReportAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getMonthlyManufacturingReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMonthlyManufacturingReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.reportData = action.payload;
            })
            .addCase(getMonthlyManufacturingReportAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getYearlyManufacturingReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getYearlyManufacturingReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.reportData = action.payload;
            })
            .addCase(getYearlyManufacturingReportAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(getDailyManufacturingReportDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDailyManufacturingReportDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.dailyReportData.splice(0, 1, action.payload);
                    state.dailyReportData = state.dailyReportData[0].data;
                }
            })
            .addCase(getDailyManufacturingReportDataAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getWeeklyManufacturingReportDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWeeklyManufacturingReportDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.weeklyReportData.splice(0, 1, action.payload);
                    state.weeklyReportData = state.weeklyReportData[0].data;
                }
            })
            .addCase(getWeeklyManufacturingReportDataAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getMonthlyManufacturingReportDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMonthlyManufacturingReportDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.monthlyReportData.splice(0, 1, action.payload);
                    state.monthlyReportData = state.monthlyReportData[0].data;
                }
            })
            .addCase(getMonthlyManufacturingReportDataAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getYearlyManufacturingReportDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getYearlyManufacturingReportDataAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.yearlyReportData.splice(0, 1, action.payload);
                    state.yearlyReportData = state.yearlyReportData[0].data;
                }
            })
            .addCase(getYearlyManufacturingReportDataAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getWorkerReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWorkerReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.workerReportData.splice(0, 1, action.payload);
                    state.workerReportData = state.workerReportData[0].data;
                }
            })
            .addCase(getWorkerReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getManufacturingByWorkerReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getManufacturingByWorkerReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.manufacturingByWorkerData.splice(0, 1, action.payload);
                    state.manufacturingByWorkerData = state.manufacturingByWorkerData[0].data;
                    state.selectedWorkerName = action.payload.worker_full_name;
                }
            })
            .addCase(getManufacturingByWorkerReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getUserReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.userReportData.splice(0, 1, action.payload);
                    state.userReportData = state.userReportData[0].data;
                }
            })
            .addCase(getUserReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getOrderByUserReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderByUserReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.orderByUserdata.splice(0, 1, action.payload);
                    state.orderByUserdata = state.orderByUserdata[0].data;
                    state.selectedUserName = action.payload.user_full_name;
                }
            })
            .addCase(getOrderByUserReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getProductReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.productReportData.splice(0, 1, action.payload);
                    state.productReportData = state.productReportData[0].data;
                }
            })
            .addCase(getProductReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(getOrderByProductReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrderByProductReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.orderByProductData.splice(0, 1, action.payload);
                    state.orderByProductData = state.orderByProductData[0].data;
                    state.selectedProductName = action.payload.product_name;
                }
            })
            .addCase(getOrderByProductReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            //Search 
            //1. Product search
            .addCase(searchProductReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchProductReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.productReportData.splice(0, 1, action.payload);
                    state.productReportData = state.productReportData[0].data;
                }
            })
            .addCase(searchProductReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            //2.User search
            .addCase(searchUserReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchUserReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.userReportData.splice(0, 1, action.payload);
                    state.userReportData = state.userReportData[0].data;
                }
            })
            .addCase(searchUserReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(searchWorkerReportAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchWorkerReportAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.workerReportData.splice(0, 1, action.payload);
                    state.workerReportData = state.workerReportData[0].data;
                }
            })
            .addCase(searchWorkerReportAsync.rejected, (state, action) => {
                state.status = 'idle';
            })

    }
})

export default reportSlice.reducer;
export const getReportData = (state) => state.report.reportData;
export const getDailyReportList = (state) => state.report.dailyReportData;
export const getWeeklyReportList = (state) => state.report.weeklyReportData;
export const getMonthlyReportList = (state) => state.report.monthlyReportData;
export const getYearlyReportList = (state) => state.report.yearlyReportData;
export const getWorkerReportList = (state) => state.report.workerReportData;
export const getManufacturingByWorkerData = (state) => state.report.manufacturingByWorkerData;
export const getSelectedWorkerName = (state) => state.report.selectedWorkerName;
export const getUserReportList = (state) => state.report.userReportData;
export const getOrderByUserData = (state) => state.report.orderByUserdata;
export const getSelectedUserName = (state) => state.report.selectedUserName;
export const getProductReportList = (state) => state.report.productReportData;
export const getOrderByProductData = (state) => state.report.orderByProductData;
export const getSelectedProductName = (state) => state.report.selectedProductName;

