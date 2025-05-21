import { createSlice} from '@reduxjs/toolkit';
import { signIn, signUp, getProfile, updateProfile, signOut } from './userAPI'; // adjust import paths as needed
import { UserState } from '@/types/custom';



const initialState: UserState = {
    profile: null,
    token: null,
    status: 'idle',
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUser: (state) => {
            state.profile = null;
            state.token = null;
            state.error = null;
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.token;
                state.profile = action.payload.user; 
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(signUp.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.token = action.payload?.token ?? null;
                state.profile = action.payload?.user ?? null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(getProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload?.user;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.profile = null;
                state.token = null;
                state.status = "idle";
                state.error = null;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;