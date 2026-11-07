import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Register user asyncThunk
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user);
    } catch (error) {
        // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const message = error.response?.data?.message || error.message || error.toString() || 'Registering failed';
        return thunkAPI.rejectWithValue(message);
    }
});
// Login user asyncThunk
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString() || 'Login failed';
        return thunkAPI.rejectWithValue(message);
    }
});

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;

                localStorage.setItem('user', JSON.stringify(action.payload));
                // localStorage.setItem('user', JSON.stringify(response.data));   inside the authService, could also be:
                // localStorage.setItem('user', JSON.stringify(response.data.user));
                // localStorage.setItem('token', JSON.stringify(response.data.token));
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            // .addCase(logout.fulfilled, (_, _) => {...})
        }
    })
    
    export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;