import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDataDashboard = createAsyncThunk(
  "apiRq/getDataDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/data.json`);
      return res.data.dashboard;
    } catch (error) {
      console.log(error);
      return rejectWithValue("cant get data" + error);
    }
  },
);

const Data = {
  dashboard: [],
  error: null,
};
export const DataDashboard = createSlice({
  name: "DataDashboard",
  initialState: Data,
  extraReducers: (builder) => {
    builder.addCase(getDataDashboard.fulfilled, (state, { payload }) => {
      state.dashboard = payload;
    });

    builder.addCase(getDataDashboard.rejected, (state, action) => {
      state.error = action.payload || "=======> error";
    });
  },
});

export default DataDashboard.reducer;
