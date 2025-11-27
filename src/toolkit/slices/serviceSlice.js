import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async () => {
    const response = await api.get("/categories");
    return response.data;
  }
);

export const addCategories = createAsyncThunk(
  "addCategories",
  async ({ userId, data }) => {
    const response = await api.post(`/categories?userId=${userId}`, data);
    return response.data;
  }
);

export const getAllSubCategories = createAsyncThunk(
  "getAllSubCategories",
  async () => {
    const response = await api.get("/subcategories");
    return response.data;
  }
);


export const addSubCategories = createAsyncThunk(
  "addSubCategories",
  async ({ userId, data }) => {
    const response = await api.post(`/subcategories?userId=${userId}`, data);
    return response.data;
  }
);

export const getAllServices = createAsyncThunk("getAllServices", async () => {
  const response = await api.get(`/services`);
  return response.data;
});

export const getSingleServiceById = createAsyncThunk(
  "getSingleServiceById",
  async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  }
);

export const deleteSingleService = createAsyncThunk(
  "deleteSingleService",
  async ({ id, userId }) => {
    const response = await api.delete(`/services/${id}?userId=${userId}`);
    return response.data;
  }
);

export const addService = createAsyncThunk(
  "addService",
  async ({ data, userId }) => {
    const response = await api.post(`/services?userId=${userId}`, data);
    return response.data;
  }
);

export const updateService = createAsyncThunk(
  "updateService",
  async ({ id, userId }) => {
    const response = await api.put(`/services/${id}?userId=${userId}`);
    return response.data;
  }
);

export const getServiceDetailBySlugName = createAsyncThunk(
  "getServiceDetailBySlugName",
  async (slug) => {
    const response = await api.get(`/services/slug/${slug}`);
    return response.data;
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    loading: "",
    serviceList: [],
    serviceDetail: {},
    serviceDetailBySlug: {},
    categoriesList:[],
    subCategoriesList:[]
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

    builder.addCase(getServiceDetailBySlugName.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getServiceDetailBySlugName.fulfilled, (state, action) => {
      state.loading = "pending";
      state.serviceDetailBySlug = action.payload;
    });
    builder.addCase(getServiceDetailBySlugName.rejected, (state) => {
      state.loading = "rejected";
      state.serviceDetailBySlug = {};
    });

    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = "pending";
      state.categoriesList = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.loading = "rejected";
      state.categoriesList = [];
    });


    builder.addCase(getAllSubCategories.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllSubCategories.fulfilled, (state, action) => {
      state.loading = "pending";
      state.subCategoriesList = action.payload;
    });
    builder.addCase(getAllSubCategories.rejected, (state) => {
      state.loading = "rejected";
      state.subCategoriesList = [];
    });
  },
});

export default serviceSlice.reducer;
