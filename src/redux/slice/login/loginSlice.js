import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./loginApi";

const initialState = {
  status: "idle",
  userId: null,
  accessToken: null,
  error: null,
};

export const loginUserAsync = createAsyncThunk(
  "login/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      const token = response.data.data.auth_token.access;
      console.log("token: ", token);
      localStorage.setItem("token", token);
      const token1 = localStorage.getItem('token');
      console.log(token1);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
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
        state.userId = action.payload.data.user_id;
        state.accessToken = action.payload.data.auth_token.access;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const selectAccessToken = (state) => state.login.accessToken;
export const selectUser = (state) => state.login.userId;
export default loginSlice.reducer;
