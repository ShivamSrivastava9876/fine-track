import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCategory, deleteCategory, editCategory, getCategory, searchCategory } from "./categoryApi";

const initialState = {
    status: 'idle',
    categoryData: [],
    error: null
}

export const getCategoriesAsync = createAsyncThunk(
    "category/get",
    async () => {
        try {
            const response = await getCategory();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const createCategoryAsync = createAsyncThunk(
    "category/create",
    async (categoryInfo) => {
        try {
            const response = await createCategory(categoryInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const editCategoryAsync = createAsyncThunk(
    "category/edit",
    async (editCategoryInfo) => {
        try {
            const response = await editCategory(editCategoryInfo);
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const deleteCategoryAsync = createAsyncThunk(
    "category/delete",
    async (deleteCategoryInfo) => {
        try {
            const categoryId = deleteCategoryInfo.id;
            const response = await deleteCategory(categoryId)
            return response.data.data;
        }
        catch (error) {
            return error;
        }
    }
)

export const searchCategoryAsync = createAsyncThunk(
    "category/searchCategory",
    async (searchCategoryInfo) => {
        try {
            const response = await searchCategory(searchCategoryInfo);
            return response.data.data;
        }
        catch (error) {
            return error;
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.categoryData.splice(0, 1, action.payload);
                    state.categoryData = state.categoryData[0].data;
                }
            })
            .addCase(getCategoriesAsync.rejected, (state, action) => {
                state.status = action.payload;
            })
            .addCase(createCategoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createCategoryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(createCategoryAsync.rejected, (action, state) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(editCategoryAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(editCategoryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(editCategoryAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(deleteCategoryAsync.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(deleteCategoryAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(searchCategoryAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(searchCategoryAsync.fulfilled, (state, action) => {
                state.status = "idle";
                if (action.payload) {
                    state.categoryData = action.payload;
                    // state.categoryData = state.categoryData[0].data;
                }
            })
            .addCase(searchCategoryAsync.rejected, (state, action) => {
                state.error = action.payload;
            });
    }
})

export const getCategoryList = (state) => state.category.categoryData;
export default categorySlice.reducer;