import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const getAllEnquiries = createAsyncThunk(
  "getAllEnquiries",
  async ({ userId, page, size }) => {
    const response = await api.get(
      `/inquiries?userId=${userId}&page=${page}&size=${size}`
    );
    return response.data;
  }
);

export const addEnquiry = createAsyncThunk("addEnquiry", async (data) => {
  const response = await api.post(`/inquiries`, data);
  return response.data;
});

export const getSingleEnquiryById = createAsyncThunk(
  "getSingleEnquiryById",
  async (id) => {
    const response = await api.get(`/inquiries/${id}`);
    return response.data;
  }
);

export const deleteEnquiryById = createAsyncThunk(
  "deleteEnquiryById",
  async (id) => {
    const response = await api.delete(`/inquiries/${id}`);
    return response.data;
  }
);

export const updateEnquiryById = createAsyncThunk(
  "updateEnquiryById",
  async (id) => {
    const response = await api.put(`/inquiries/${id}`);
    return response.data;
  }
);

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: {
    loading: "",
    enquiryList: [],
    enquiryDetail: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllEnquiries.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllEnquiries.fulfilled, (state, action) => {
      state.loading = "success";
      state.enquiryList = action.payload;
    });
    builder.addCase(getAllEnquiries.rejected, (state) => {
      state.loading = "rejected";
      state.enquiryList = [];
    });

    builder.addCase(getSingleEnquiryById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getSingleEnquiryById.fulfilled, (state, action) => {
      state.loading = "success";
      state.enquiryDetail = action.payload;
    });
    builder.addCase(getSingleEnquiryById.rejected, (state) => {
      state.loading = "rejected";
      state.enquiryDetail = {};
    });
  },
});

export default enquirySlice.reducer;
