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

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async ({ id, userId, data }) => {
    const response = await api.put(`/categories/${id}?userId=${userId}`, data);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async ({ id, userId }) => {
    const response = await api.delete(`/categories/${id}?userId=${userId}`);
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

export const updateSubcategory = createAsyncThunk(
  "updateSubcategory",
  async ({ id, userId, data }) => {
    const response = await api.put(
      `/subcategories/${id}?userId=${userId}`,
      data
    );
    return response.data;
  }
);

export const deleteSubcategory = createAsyncThunk(
  "deleteSubcategory",
  async ({ id, userId }) => {
    const response = await api.delete(`/subcategories/${id}?userId=${userId}`);
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
  async ({ id, userId,data }) => {
    const response = await api.put(`/services/${id}?userId=${userId}`,data);
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

export const getSubCategoryListByCategoryId = createAsyncThunk(
  "getSubCategoryListByCategoryId",
  async (id) => {
    const response = await api.get(`/subcategories/by-category/${id}`);
    return response.data;
  }
);

export const getServiceBySubCategoryId = createAsyncThunk(
  "getServiceBySubCategoryId",
  async (subCategoryId) => {
    const response = await api.get(`/services/by-subcategory/${subCategoryId}`);
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
    categoriesList: [],
    subCategoriesList: [],
    subCategoryListByCategoryId: [],
    serviceListBySubCategoryId: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllServices.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllServices.fulfilled, (state, action) => {
      state.loading = "success";
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
      state.loading = "success";
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
      state.loading = "success";
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
      state.loading = "success";
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
      state.loading = "success";
      state.subCategoriesList = action.payload;
    });
    builder.addCase(getAllSubCategories.rejected, (state) => {
      state.loading = "rejected";
      state.subCategoriesList = [];
    });

    builder.addCase(getSubCategoryListByCategoryId.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(
      getSubCategoryListByCategoryId.fulfilled,
      (state, action) => {
        state.loading = "success";
        state.subCategoryListByCategoryId = action.payload;
      }
    );
    builder.addCase(getSubCategoryListByCategoryId.rejected, (state) => {
      state.loading = "rejected";
      state.subCategoryListByCategoryId = [];
    });

    builder.addCase(getServiceBySubCategoryId.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getServiceBySubCategoryId.fulfilled, (state, action) => {
      state.loading = "success";
      state.serviceListBySubCategoryId = action.payload;
    });
    builder.addCase(getServiceBySubCategoryId.rejected, (state) => {
      state.loading = "rejected";
      state.serviceListBySubCategoryId = [];
    });
  },
});

export default serviceSlice.reducer;
