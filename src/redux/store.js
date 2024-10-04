import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});
