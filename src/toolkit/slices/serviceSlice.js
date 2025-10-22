import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const getAllServices = createAsyncThunk("getAllServices", async () => {
  const response = await api.get(`/api/services`);
  return response.data;
});

export const getSingleServiceById = createAsyncThunk(
  "getSingleServiceById",
  async (id) => {
    const response = await api.get(`/api/services/${id}`);
    return response.data;
  }
);

export const deleteSingleService = createAsyncThunk(
  "deleteSingleService",
  async ({ id, userId }) => {
    const response = await api.delete(`/api/services/${id}?userId=${userId}`);
    return response.data;
  }
);



export const addService = createAsyncThunk(
  "addService",
  async ({ data, userId }) => {
    const response = await api.delete(`/api/services?userId=${userId}`, data);
    return response.data;
  }
);

export const updateService = createAsyncThunk(
  "updateService",
  async ({ id, userId }) => {
    const response = await api.put(`/api/services/${id}?userId=${userId}`);
    return response.data;
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    loading: "",
    serviceList: [],
    serviceDetail: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllServices.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.loading = "pending";
      state.serviceList = action.payload;
    });
    builder.addCase(getAllServices.rejected, (state) => {
      state.loading = "rejected";
      state.serviceList = [];
    });

    builder.addCase(getSingleServiceById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getSingleServiceById.fulfilled, (state, action) => {
      state.loading = "pending";
      state.serviceDetail = action.payload;
    });
    builder.addCase(getSingleServiceById.rejected, (state) => {
      state.loading = "rejected";
      state.serviceDetail = {};
    });
  },
});

export default serviceSlice.reducer;
