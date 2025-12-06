import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../httpcommon";

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await api.get(`/users`);
  return response.data;
});

export const addUser = createAsyncThunk("addUser", async ({ userId, data }) => {
  const response = await api.post(`/users?userId=${userId}`, data);
  return response.data;
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, data }) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async ({ id, userId }) => {
    const response = await api.delete(`/users/${id}?userId=${userId}`);
    return response.data;
  }
);

export const getAllRoles = createAsyncThunk("getAllRoles", async () => {
  const response = await api.get(`/roles`);
  return response.data;
});

export const addRoles = createAsyncThunk("addRoles", async (name) => {
  const response = await api.post(`/roles?name=${name}`);
  return response.data;
});

export const updateRole = createAsyncThunk(
  "updateRole",
  async ({ uuid, name }) => {
    const response = await api.put(`/roles/${uuid}?name=${name}`);
    return response.data;
  }
);

export const deleteRole = createAsyncThunk("deleteRole", async (uuid) => {
  const response = await api.delete(`/roles/${uuid}`);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: "",
    userList: [],
    roleList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = "success";
      state.userList = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loading = "rejected";
    });

    builder.addCase(getAllRoles.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getAllRoles.fulfilled, (state, action) => {
      state.loading = "success";
      state.roleList = action.payload;
    });
    builder.addCase(getAllRoles.rejected, (state) => {
      state.loading = "rejected";
    });
  },
});

export default userSlice.reducer;
