import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const addBlogs = createAsyncThunk(
  "addBlogs",
  async ({ userId, data }) => {
    const response = await api.post(`/api/blogs?userId=${userId}`, data);
    return response.data;
  }
);

export const getBlogsList = createAsyncThunk("getBlogsList", async () => {
  const response = await api.get(`/api/blogs`);
  return response.data;
});

export const getBlogListByServiceId = createAsyncThunk(
  "getBlogListByServiceId",
  async (serviceId) => {
    const response = await api.get(`/api/blogs/service/${serviceId}`);
    return response.data;
  }
);

export const updateBlogById = createAsyncThunk(
  "updateBlogById",
  async ({ id, userId }) => {
    const response = await api.put(`/api/blogs/${id}?userId=${userId}`);
    return response.data;
  }
);

export const getBlogById = createAsyncThunk("getBlogById", async (id) => {
  const response = await api.get(`/api/blogs/${id}`);
  return response.data;
});

export const deleteBlogById = createAsyncThunk("deleteBlogById", async (id) => {
  const response = await api.delete(`/api/blogs/${id}`);
  return response.data;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    loading: "",
    blogList: [],
    blogListByServiceId: [],
    blogDetail: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getBlogsList.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getBlogsList.fulfilled, (state, action) => {
      state.loading = "success";
      state.blogList = action.payload;
    });
    builder.addCase(getBlogsList.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(getBlogListByServiceId.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getBlogListByServiceId.fulfilled, (state, action) => {
      state.loading = "success";
      state.blogListByServiceId = action.payload;
    });
    builder.addCase(getBlogListByServiceId.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(getBlogById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getBlogById.fulfilled, (state, action) => {
      state.loading = "success";
      state.blogDetail = action.payload;
    });
    builder.addCase(getBlogById.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export default blogSlice.reducer;
