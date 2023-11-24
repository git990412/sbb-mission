import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Question} from "../../types.ts";
import axios from "axios";
import {RootState} from "../store.ts";

// Define a type for the slice state
type QuestionListState = {
  value: Question[];
  totalPages: number;
  currentPage: number;
};

// Define the initial state using that type
const initialState: QuestionListState = {
  value: [],
  totalPages: 0,
  currentPage: 0,
};

type SearchParams = {
  page: number;
  kw: string;
};

const initialSearchParams: SearchParams = {
  page: 0,
  kw: "",
};

export const updateQuestions = createAsyncThunk(
  "api/question/list",
  async (searchParams: SearchParams = initialSearchParams) => {
    const response = await axios.get("/api/question/list", {
      params: {
        page: searchParams.page,
        kw: searchParams.kw,
      },
    });
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
      state.value = action.payload.content;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.number;
    });
  },
});

export const selectQuestions = (state: RootState) => state.Questions.value;
export const selectTotalPages = (state: RootState) =>
  state.Questions.totalPages;
export const selectCurrentPage = (state: RootState) =>
  state.Questions.currentPage;

export default QuestionListSlice.reducer;
