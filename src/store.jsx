import { configureStore } from "@reduxjs/toolkit"
import roomsReducer from "./features/rooms/roomsSlice"
import bookingsReducer from "./features/bookings/bookingsSlice"


export default configureStore({
  reducer: {
    rooms : roomsReducer,
    bookings : bookingsReducer,
  }, 
});