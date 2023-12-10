import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apkDownload, loginUser, logoutUser } from "./loginApi";

const initialState = {
  status: "idle",
  apkData: null,
  apkLink: null,
  userId: null,
  accessToken: null,
  errorMessage: null,
  logoutMessage: null,
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  "login/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      if (response.data) {
        const token = response.data.data.auth_token.token;
        localStorage.setItem("token", token);
        return response.data;
      }
      else if (response.error) {
        return response.error;
      }

    }
    catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  "login/logoutUser",
  async () => {
    try {
      const response = await logoutUser();
      if (response.data) {
        localStorage.removeItem("token");
        return response.data;
      }
      else if (response.error) {
        return response.error;
      }

    }
    catch (error) {
      return error;
    }
  }
);

export const apkDownloadAsync = createAsyncThunk(
  "login/apkDownload",
  async () => {
    try {
      const response = await apkDownload();
      if (response.data) {
        return response.data;
      }
      else if (response.error) {
        return response.error;
      }

    }
    catch (error) {
      return error;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.userId = action.payload.data.user_id;
          state.accessToken = action.payload.data.auth_token.token;
        }
        else if (action.payload.success === false) {
          state.errorMessage = action.payload.message;
        }
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.logoutMessage = action.payload.message;
      })
      .addCase(logoutUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errorMessage = action.payload;
      })
      .addCase(apkDownloadAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(apkDownloadAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.apkData = action.payload;
        state.apkLink = action.payload.data[0].apk;
      })
      .addCase(apkDownloadAsync.rejected, (state, action) => {
        state.status = "idle";
        state.errorMessage = action.payload;
      })
  },
});

export const selectAccessToken = (state) => state.login.accessToken;
export const selectErrorMessage = (state) => state.login.errorMessage;
export const selectUser = (state) => state.login.userId;
export const selectApkLink = (state) => state.login.apkLink;
export default loginSlice.reducer;
