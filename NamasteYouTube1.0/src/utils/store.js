import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

console.log(store);

export default store;
