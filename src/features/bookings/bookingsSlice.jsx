import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
import.meta.env.VITE_BASE_URL;

export const fetchAllBookings = createAsyncThunk(
  "bookings/fetchAllBookings",
  async () => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: token,
    };

    const response = await fetch(`${BASE_URL}/v1/bookings`, {
      headers: headers,
    });

    return response.json();
  }
);

export const saveBooking = createAsyncThunk(
  "bookings/saveBooking",
  async (bookingData) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: token,
    };

    const response = await axios.post(`${BASE_URL}/v1/bookings`, bookingData, {
      headers: headers,
    });

    return response.data;
  }
);

export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async (values) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: token,
    };

    const updatedData = {
      id : values.id,
      name : values.contact_name,
      phone_number : values.phone_number, 
      status : values.status
    }

    const response = await axios.put(
      `${BASE_URL}/v1/bookings/${updatedData.id}`,
      updatedData,
      {
        headers: headers,
      }
    );
    console.log({response})
    return response.data;
  }
);

export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (booking_id) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: token,
    };

    await axios.delete(`${BASE_URL}/v1/bookings/${booking_id}`, {
      headers: headers,
    });

    return booking_id;
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: { bookings: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(saveBooking.fulfilled, (state, action) => {
        state.bookings = [action.payload, ...state.bookings];
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const updatedBookingIndex = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (updatedBookingIndex !== -1) {
          state.bookings[updatedBookingIndex] = action.payload;
        }
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.payload
        );
      });
  },
});

export default bookingsSlice.reducer;
