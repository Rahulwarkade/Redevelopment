import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "@/utils/axios";

// Define a type for the demo data
interface DemoData {
  id: number;
  title: string;
  description: string;
}

// Define a type for the slice state
interface DemoState {
  value: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  data: DemoData[];
}

// Define the initial state
const initialState: DemoState = {
  value: 0,
  status: "idle",
  error: null,
  data: [],
};

// Create an async thunk for fetching demo data
export const fetchDemoData = createAsyncThunk(
  "demo/fetchDemoData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<DemoData[]>("/api/demo");
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to fetch data");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create the slice
export const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDemoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDemoData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDemoData.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Unknown error occurred";
      });
  },
});

// Export actions and reducer
export const { increment, decrement, incrementByAmount } = demoSlice.actions;
export default demoSlice.reducer;
