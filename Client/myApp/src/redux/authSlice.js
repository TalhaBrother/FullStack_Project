import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookie from 'js-cookie';

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const token = Cookie.get("token");
    if (!token) return rejectWithValue("No token");
    
    const response = await axios.get("http://localhost:3000/user/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.user; // specifically set the user object
  } catch (error) {
    return rejectWithValue(error.response?.data || "Fetch user failed");
  }
});

const initialState = {
  user: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
      });
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
