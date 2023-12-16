import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, getProduct, searchProduct, updateProduct } from "./productApi";

const initialState = {
    status: "idle",
    productData: [],
    error: null
}

export const getProductAsync = createAsyncThunk(
    "product/get",
    async () => {
        try {
            const response = await getProduct();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const createProductAsync = createAsyncThunk(
    "product/create",
    async (newProductInfo) => {
        try {
            const response = await createProduct(newProductInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const updateProductAsync = createAsyncThunk(
    "product/update",
    async (updateProductInfo) => {
        try {
            const response = await updateProduct(updateProductInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const deleteProductAsync = createAsyncThunk(
    "product/delete",
    async (productId) => {
        try {
            const response = await deleteProduct(productId);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const searchProductAsync = createAsyncThunk(
    "product/searchProduct",
    async (searchProductInfo) => {
        try {
            const response = await searchProduct(searchProductInfo);
            return response.data.data;
        }
        catch (error) {
            return error;
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.productData.splice(0, 1, action.payload);
                    state.productData = state.productData[0].data;
                }
            })
            .addCase(getProductAsync.rejected, (state, action) => {
                state.status = action.payload;
            })
            .addCase(createProductAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(createProductAsync.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(createProductAsync.rejected, (state) => {
                state.status = 'idle';
            })
            .addCase(searchProductAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchProductAsync.fulfilled, (state, action) => {
                state.status = "idle";
                if (action.payload) {
                    state.productData = action.payload;
                    // state.categoryData = state.categoryData[0].data;
                }
            })
            .addCase(searchProductAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
})

export const getProductList = (state) => state.product.productData;
export default productSlice.reducer;