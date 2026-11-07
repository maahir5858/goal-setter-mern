import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from './goalService'

// Add goals asyncThunk
export const createGoal = createAsyncThunk("goals/createGoal", async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);
    } catch (error) {
        // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        const message = error.response?.data?.message || error.message || error.toString() || 'Login failed';
        return thunkAPI.rejectWithValue(message);
    }
});
// Get goals asyncThunk
export const getGoals = createAsyncThunk("goals/getGoals", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token);
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString() || 'Failed to get goals';
        return thunkAPI.rejectWithValue(message);
    }
});
// Update goal asyncThunk
export const updateGoal = createAsyncThunk("goals/updateGoal", async ({ goalId, goalData }, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.updateGoal(goalId, goalData, token);
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString() || 'Failed to update goal';
        return thunkAPI.rejectWithValue(message);
    }
});
// Delete goal asyncThunk
export const deleteGoal = createAsyncThunk("goals/deleteGoal", async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(goalId, token);
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString() || 'Failed to delete goal';
        return thunkAPI.rejectWithValue(message);
    }
});

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset: (state) => initialState,
        // we didn't do this ( set to [initialState] ) in userSlice  -->  because the user in state needed to Persist...
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            })
            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.map((goal) =>
                    goal._id === action.payload._id ? action.payload : goal
                );
            })
            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter(
                    // (goal) => goal._id !== action.payload.id
                    (goal) => goal._id !== action.meta.arg
                );
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || action.error.message;
            });
    },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;