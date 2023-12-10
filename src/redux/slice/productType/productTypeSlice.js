import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductType, deleteProductType, getProductType, getSelectedProductType, searchProductType, updateProductType } from "./productTypeApi";

const initialState = {
    status: "idle",
    productTypeData: [],
    createProductTypeData: null,
    createProductTypeImage: null,
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

export const getSelectedProductTypeAsync = createAsyncThunk(
    "productType/getSelected",
    async (selectedCategory) => {
        try {
            const response = await getSelectedProductType(selectedCategory);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const createProductTypeAsync = createAsyncThunk(
    "productType/create",
    async (newProductType) => {
        try {
            const response = await createProductType(newProductType);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const updateProductTypeAsync = createAsyncThunk(
    "productType/update",
    async (editProductTypeInfo) => {
        try {
            const response = await updateProductType(editProductTypeInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const deleteProductTypeAsync = createAsyncThunk(
    "productType/delete",
    async (productTypeId) => {
        try {
            const response = await deleteProductType(productTypeId);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const searchProductTypeAsync = createAsyncThunk(
    "productType/searchProductType",
    async (searchProductTypeInfo) => {
      try {
        const response = await searchProductType(searchProductTypeInfo);
        return response.data.data;
      }
      catch (error) {
        return error;
      }
    }
  );

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
            if (action.payload) {
                state.productTypeData.splice(0, 1, action.payload);
                state.productTypeData = state.productTypeData[0].data;
            }
        })
        .addCase(getProductTypeAsync.rejected, (state, action) => {
            state.status = action.payload;
        })
        .addCase(getSelectedProductTypeAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getSelectedProductTypeAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload) {
                state.productTypeData.splice(0, 1, action.payload);
                state.productTypeData = state.productTypeData[0].data;
            }
        })
        .addCase(getSelectedProductTypeAsync.rejected, (state, action) => {
            state.status = action.payload;
        })
        .addCase(createProductTypeAsync.pending, (state) => {
            state.status = 'pending'

        })
        .addCase(createProductTypeAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload) {
                state.createProductTypeData = action.payload;
                state.createProductTypeImage = action.payload.image;
            }
        })
        .addCase(createProductTypeAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload;
        })
        .addCase(updateProductTypeAsync.pending, (state) => {
            state.status = 'pending'
        })
        .addCase(updateProductTypeAsync.fulfilled, (state) => {
            state.status = 'idle'
        })
        .addCase(updateProductTypeAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload;
        })
        .addCase(deleteProductTypeAsync.pending, (state) => {
            state.status = 'pending'
        })
        .addCase(deleteProductTypeAsync.fulfilled, (state) => {
            state.status = 'idle'
        })
        .addCase(deleteProductTypeAsync.rejected, (state, action) => {
            state.status = 'idle';
            state.error = action.payload;
        })
        .addCase(searchProductTypeAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(searchProductTypeAsync.fulfilled, (state, action) => {
            state.status = "idle";
            if (action.payload) {
                state.productTypeData = action.payload;
                // state.categoryData = state.categoryData[0].data;
            }
        })
        .addCase(searchProductTypeAsync.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
})

export const getProductTypeList = (state) => state.productType.productTypeData;
export default productTypeSlice.reducer;