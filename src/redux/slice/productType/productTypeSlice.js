import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductType } from "./productTypeApi";

const initialState = {
    status: "idle",
    productTypeData: [],
    error: null
}

export const getProductTypeAsync = createAsyncThunk(
    "productType/get",
    async () => {
        try {
            const response = await getProductType();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

const productTypeSlice = createSlice({
    name: "productType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProductTypeAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getProductTypeAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload.data) {
                state.productTypeData.splice(0, 1, action.payload);
                state.productTypeData = state.productTypeData[0].data;
            }
            else {
                console.log("You are logged out");
            }
        })
        .addCase(getProductTypeAsync.rejected, (state, action) => {
            state.status = action.payload;
        })
    }
})

export const getProductTypeList = (state) => state.productType.productTypeData;
export default productTypeSlice.reducer;