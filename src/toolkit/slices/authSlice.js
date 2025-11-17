import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const userLogin = createAsyncThunk("userLogin", async () => {
  const response = await api.post(`/api/login`);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: "",
    userDetail: {},
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.loading = "success";
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = "reject";
    });
  },
});

export default authSlice.reducer;
