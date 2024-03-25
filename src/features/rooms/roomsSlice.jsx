import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
import.meta.env.VITE_BASE_URL;

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch(`${BASE_URL}/v1/rooms`);
  return response.json();
});

export const saveRoom = createAsyncThunk("rooms/saveRoom", async (roomData) => {
  const token = localStorage.getItem("jwt_token");
  const headers = {
    Authorization: token,
  };

  const response = await axios.post(`${BASE_URL}/v1/rooms`, roomData, {
    headers: headers,
  });

  return response.data;
});

export const updateRoom = createAsyncThunk(
  "rooms/updateRoom",
  async (updatedRoomData) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: token,
    };

    const { id, ...updatedData } = updatedRoomData;
    const response = await axios.put(
      `${BASE_URL}/v1/rooms/${id}`,
      updatedData,
      {
        headers: headers,
      }
    );

    return response.data;
  }
);

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id) => {
  const token = localStorage.getItem("jwt_token");
  const headers = {
    Authorization: token,
  };

  await axios.delete(`${BASE_URL}/v1/rooms/${id}`, {
    headers: headers,
  });

  return id;
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: { rooms: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(saveRoom.fulfilled, (state, action) => {
        state.rooms = [action.payload, ...state.rooms];
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        const updatedRoomIndex = state.rooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (updatedRoomIndex !== -1) {
          state.rooms[updatedRoomIndex] = action.payload;
        }
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
        state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      });
  },
});

export default roomsSlice.reducer;
