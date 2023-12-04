import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDailyReport, getDailyReportData, getMonthlyReport, getMonthlyReportData, getWeeklyReport, getWeeklyReportData, getYearlyReport, getYearlyReportData } from "./reportApi";

const initialState = {
    status: 'idle',
    reportData: null,
    dailyReportData: [],
    weeklyReportData: [],
    monthlyReportData: [],
    yearlyReportData: [],
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
    }
})

export default reportSlice.reducer;
export const getReportData = (state) => state.report.reportData;
export const getDailyReportList = (state) => state.report.dailyReportData;
export const getWeeklyReportList = (state) => state.report.weeklyReportData;
export const getMonthlyReportList = (state) => state.report.monthlyReportData;
export const getYearlyReportList = (state) => state.report.yearlyReportData;
