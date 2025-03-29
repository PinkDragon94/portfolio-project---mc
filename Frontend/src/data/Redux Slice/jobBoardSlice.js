import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axiosInstance'; // Replace with your axios setup

// Async thunk for fetching job posts
export const fetchJobs = createAsyncThunk('jobBoard/fetchJobs', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/api/jobs');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
    }
});

// Async thunk for creating a new job
export const createJob = createAsyncThunk('jobBoard/createJob', async (jobData, thunkAPI) => {
    try {
        const response = await axios.post('/api/jobs', jobData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create job');
    }
});

const jobBoardSlice = createSlice({
    name: 'jobBoard',
    initialState: {
        jobs: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.jobs = action.payload;
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.jobs.push(action.payload);
            });
    },
});

export default jobBoardSlice.reducer;
