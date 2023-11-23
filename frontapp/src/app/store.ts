import { configureStore } from "@reduxjs/toolkit";
// ...
import QuestionsReducer from "./feature/QuestionListSlice.ts";
import LoginStatusReducer from "./feature/LoginStatus.ts";

export const store = configureStore({
  reducer: { Questions: QuestionsReducer, LoginStatus: LoginStatusReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
