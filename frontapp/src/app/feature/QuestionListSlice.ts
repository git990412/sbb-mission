import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Question} from "../../types.ts";
import axios from "axios";
import {RootState} from "../store.ts";

// Define a type for the slice state
type QuestionListState = {
  value: Question[];
};

// Define the initial state using that type
const initialState: QuestionListState = {
  value: [],
};

export const updateQuestions = createAsyncThunk(
  "api/question/list",
  async () => {
    const response = await axios.get("/api/question/list");
    return response.data;
  },
);

export const QuestionListSlice = createSlice({
  name: "QuestionList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    // omit posts loading reducers
    builder.addCase(updateQuestions.fulfilled, (state, action) => {
      // We can directly add the new post object to our posts array
      state.value = action.payload;
    });
  },
});

export const selectQuestions = (state: RootState) => state.Questions.value;
export default QuestionListSlice.reducer;
