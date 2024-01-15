import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createWorker, deleteWorker, editWorker, getWorker } from "./workerApi";

const initialState = {
    status: 'idle',
    workerData: [],
    error: ""
}

export const getWorkerAsync = createAsyncThunk(
    "worker/get",
    async () => {
        try {
            const response = await getWorker();
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
);

export const createWorkerAsync = createAsyncThunk(
    "worker/create",
    async (workerInfo) => {
        try {
            const response = await createWorker(workerInfo);
            if (response.data) {
                return response.data;
            }
            else {
                return { error: response.error };
            }
        }
        catch (error) {
            return error;
        }
    }
)

export const updateWorkerAsync = createAsyncThunk(
    "worker/edit",
    async (editWorkerInfo) => {
        try {
            const response = await editWorker(editWorkerInfo);
            if (response.data) {
                return response.data;
            }
            else {
                return response.error;
            }
        }
        catch (error) {
            return error;
        }
    }
)

export const deleteWorkerAsync = createAsyncThunk(
    "worker/delete",
    async (workerId) => {
        try {
            // const workerId = deleteWorkerInfo.id;
            const response = await deleteWorker(workerId);
            return response.data.data;
        }
        catch (error) {
            return error;
        }
    }
)

// export const searchCategoryAsync = createAsyncThunk(
//     "category/searchCategory",
//     async (searchCategoryInfo) => {
//         try {
//             const response = await searchCategory(searchCategoryInfo);
//             return response.data.data;
//         }
//         catch (error) {
//             return error;
//         }
//     }
// );

const workerSlice = createSlice({
    name: "worker",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWorkerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getWorkerAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload) {
                    state.workerData.splice(0, 1, action.payload);
                    state.workerData = state.workerData[0].data;
                }
            })
            .addCase(getWorkerAsync.rejected, (state, action) => {
                state.status = action.payload;
            })
            .addCase(createWorkerAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createWorkerAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                if (action.payload.error) {
                    console.log("err", action.payload)
                    state.error = action.payload;
                }
                else {
                    state.error = null;
                }
                // console.log(action.payload);
            })
            .addCase(createWorkerAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(updateWorkerAsync.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateWorkerAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(updateWorkerAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
            .addCase(deleteWorkerAsync.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(deleteWorkerAsync.fulfilled, (state, action) => {
                state.status = 'idle';
            })
            .addCase(deleteWorkerAsync.rejected, (state, action) => {
                state.status = 'idle';
            })
        // .addCase(searchCategoryAsync.pending, (state) => {
        //     state.status = "loading";
        // })
        // .addCase(searchCategoryAsync.fulfilled, (state, action) => {
        //     state.status = "idle";
        //     if (action.payload) {
        //         state.workerData = action.payload;
        //         // state.workerData = state.workerData[0].data;
        //     }
        // })
        // .addCase(searchCategoryAsync.rejected, (state, action) => {
        //     state.error = action.payload;
        // });
    }
})

export const getWorkerList = (state) => state.worker.workerData;
export const getWorkerError = (state) => state.worker.error;
export default workerSlice.reducer;