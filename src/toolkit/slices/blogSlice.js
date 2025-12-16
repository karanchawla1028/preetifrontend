import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const addBlogs = createAsyncThunk(
  "addBlogs",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/blogs?userId=${userId}`, data);
      return response.data;
    } catch (err) {
      console.log(err.response?.data || err.message); // ⬅ real error shown here
      return rejectWithValue(err.response?.data);
    }
  }
);

export const getBlogsList = createAsyncThunk("getBlogsList", async () => {
  const response = await api.get(`/blogs`);
  return response.data;
});

export const getBlogListByServiceId = createAsyncThunk(
  "getBlogListByServiceId",
  async (serviceId) => {
    const response = await api.get(`/blogs/service/${serviceId}`);
    return response.data;
  }
);

export const updateBlog = createAsyncThunk(
  "updateBlog",
  async ({ id, data }) => {
    const response = await api.put(`/api/blogs/${id}?userId=${userId}`, data);
    return response.data;
  }
);

export const getBlogById = createAsyncThunk("getBlogById", async (id) => {
  const response = await api.get(`/blogs/${id}`);
  return response.data;
});

export const deleteBlogById = createAsyncThunk(
  "deleteBlogById",
  async ({ id, userId }) => {
    const response = await api.delete(`/blogs/${id}?userId=${userId}`);
    return response.data;
  }
);

export const getBlogDetailBySlugName = createAsyncThunk(
  "getBlogDetailBySlugName",
  async (slugName) => {
    const response = await api.get(`/blogs/slug/${slugName}`);
    return response.data;
  }
);

export const addBlogDetails = createAsyncThunk(
  "addBlogDetails",
  async ({ userId, data }) => {
    const response = await api.post(`/api/blog-details?userId=${userId}`, data);
    return response.data;
  }
);

export const updateBlogDetail = createAsyncThunk(
  "updateBlogDetail",
  async ({ id, userId, data }) => {
    const response = await api.put(
      `/api/blog-details/${id}?userId=${userId}`,
      data
    );
    return response.data;
  }
);

export const deleteBlogDetail = createAsyncThunk(
  "deleteBlogDetail",
  async ({ id, userId }) => {
    const response = await api.delete(
      `/api/blog-details/${id}?userId=${userId}`
    );
    return response.data;
  }
);

export const addBlogFAQS = createAsyncThunk(
  "addBlogFAQS",
  async ({ userId, data }) => {
    const response = await api.post(`/api/blog-faqs?userId=${userId}`, data);
    return response.data;
  }
);

export const updateBlogFAQS = createAsyncThunk(
  "updateBlogFAQS",
  async ({ id, userId, data }) => {
    const response = await api.put(
      `/api/blog-faqs/${id}?userId=${userId}`,
      data
    );
    return response.data;
  }
);

export const deleteBlogFAQS = createAsyncThunk(
  "deleteBlogFAQS",
  async ({ id, userId }) => {
    const response = await api.delete(`/api/blog-faqs/${id}?userId=${userId}`);
    return response.data;
  }
);

export const getBlogFAQsByBlogId = createAsyncThunk(
  "getBlogFAQsByBlogId",
  async (blogId) => {
    const response = await api.get(`/api/blog-faqs/blog/${blogId}`);
    return response.data;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    loading: "",
    blogList: [],
    blogListByServiceId: [],
    blogDetail: {},
    blogFaqsList: [],
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

    builder.addCase(getBlogDetailBySlugName.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getBlogDetailBySlugName.fulfilled, (state, action) => {
      state.loading = "success";
      state.blogDetail = action.payload;
    });
    builder.addCase(getBlogDetailBySlugName.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(getBlogFAQsByBlogId.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getBlogFAQsByBlogId.fulfilled, (state, action) => {
      state.loading = "success";
      state.blogFaqsList = action.payload;
    });
    builder.addCase(getBlogFAQsByBlogId.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export default blogSlice.reducer;
