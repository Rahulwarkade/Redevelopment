import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  expiresAt: null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken?: string;
        expiresAt?: number;
      }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.expiresAt = action.payload.expiresAt ?? null;
      state.status = 'succeeded';
      state.error = null;
    },
    clearAuth: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.expiresAt = null;
      state.status = 'idle';
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
  },
});

export const { setAuth, clearAuth, setAuthError } = authSlice.actions;
export default authSlice.reducer;