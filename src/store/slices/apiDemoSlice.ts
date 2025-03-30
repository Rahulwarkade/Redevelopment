import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchWithErrorHandling } from "@/utils/axios";

// Define types for our API data
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface NewPost {
  title: string;
  body: string;
  userId: number;
}

// Define the state type
interface ApiDemoState {
  posts: Post[];
  newPost: Post | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ApiDemoState = {
  posts: [],
  newPost: null,
  loading: false,
  error: null,
};

// Async thunks
export const fetchPosts = createAsyncThunk(
  "apiDemo/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      // Using JSONPlaceholder as a demo API
      const data = await fetchWithErrorHandling<Post[]>(
        "https://jsonplaceholder.typicode.com/posts?_limit=10"
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const createPost = createAsyncThunk(
  "apiDemo/createPost",
  async (newPost: NewPost, { rejectWithValue }) => {
    try {
      const data = await fetchWithErrorHandling<Post, NewPost>(
        "https://jsonplaceholder.typicode.com/posts",
        "POST",
        newPost
      );
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Create the slice
const apiDemoSlice = createSlice({
  name: "apiDemo",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearNewPost: (state) => {
      state.newPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts cases
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch posts";
      })
      // Create post cases
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.newPost = action.payload;
        // Add the new post to the beginning of the posts array
        state.posts = [action.payload, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create post";
      });
  },
});

export const { clearError, clearNewPost } = apiDemoSlice.actions;
export default apiDemoSlice.reducer;
