import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userDetails, createUser, searchUser, deleteUser, userActive } from "./userApi";

const initialState = {
  status: "idle",
  userData: [],
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

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (createUserInfo) => {
    try {
      const response = await createUser(createUserInfo);
      return response.data;
    }
    catch (error) {
      return error;
    }
  }
);

export const searchUserAsync = createAsyncThunk(
  "user/searchUser",
  async (searchUserInfo) => {
    try {
      const response = await searchUser(searchUserInfo);
      return response.data.data;
    }
    catch (error) {
      return error;
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "user/deleteUser",
  async (userId) => {
    try {
      const response = await deleteUser(userId);
      return response.data.data;
    }
    catch (error) {
      return error;
    }
  }
);

export const userActiveAsync = createAsyncThunk(
  "user/userActive",
  async (userStatusInfo) => {
    try {
      // console.log("user",userStatusInfo);
      const response = await userActive(userStatusInfo);
      return response.data.data;
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
      state.status = "loading";
    });
    builder.addCase(userDetailsAsync.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.userData.splice(0, 1, action.payload.data);
      }
    });
    builder.addCase(userDetailsAsync.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(createUserAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createUserAsync.fulfilled, (state, action) => {
      state.status = "idle";
    });
    builder.addCase(createUserAsync.rejected, (state, action) => {
      state.status = "idle";
      state.createUserError = action.payload;
    });
    builder.addCase(searchUserAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(searchUserAsync.fulfilled, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.userData.splice(0, 1, action.payload);
      }
    });
    builder.addCase(searchUserAsync.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(userActiveAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(userActiveAsync.fulfilled, (state, action) => {
      state.status = "idle";
    });
    builder.addCase(userActiveAsync.rejected, (state, action) => {
      state.status = "idle";
      state.createUserError = action.payload;
    });
  },
});

export const selectUserData = (state) => state.user.userData;
export default userSlice.reducer;
