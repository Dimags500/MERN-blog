import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts.js";

const store = configureStore({
  reducer: {},
});

export { store };
