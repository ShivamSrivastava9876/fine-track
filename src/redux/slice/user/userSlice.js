import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userDetails } from "./userApi";

const initialState = {
  status: "idle",
  userData: []
};

export const userDetailsAsync = createAsyncThunk(
  "user/userDetails",
  async () => {
    try {
      const response = await userDetails();
      return response.data;
    } 
    catch (error) {
      return error;
    }
  }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userDetailsAsync.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(userDetailsAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.payload.data) {
                const users = action.payload.data.map((user) => user);
                state.userData.push(users);
              }
        })
        builder.addCase(userDetailsAsync.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
});

export const selectUserData = (state) => state.user.userData;
export default userSlice.reducer;