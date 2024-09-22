import { configureStore } from "@reduxjs/toolkit";
import ruralProducersReducer from "./ruralProducers/slice.js";

export default configureStore({
  reducer: {
    ruralProducers: ruralProducersReducer
  }
})