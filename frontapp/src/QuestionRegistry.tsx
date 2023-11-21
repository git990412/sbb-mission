import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "./app/hooks.ts";
import { updateQuestions } from "./app/feature/QuestionListSlice.ts";

const QuestionRegistry = () => {
  const dispatch = useAppDispatch();
  const registerQuestion = () => {
    const { subject, content } = state;

    axios
      .post("/api/question/create", null, {
        params: {
          subject: subject,
          content: content,
        },
      })
      .then(() => {
        dispatch(updateQuestions());

        setError({
          ...error,
          error: false,
        });

        document.getElementById("closeModal")?.click();
      })
      .catch((err) => {
        console.log(err);
        setError({
          error: true,
          message: err.response.data.message,
        });
      });

    setState({ subject: "", content: "" });
  };

  const [state, setState] = useState({
    subject: "",
    content: "",
  });

  const [error, setError] = useState({
    message: "",
    error: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  return (
    <dialog id="addQuestion" className="modal">
      <div className="modal-box flex flex-col">
        <div className="flex justify-between">
          <h5 className="font-bold text-xl grid place-self-center">질문등록</h5>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="closeModal"
              className="btn btn-sm btn-circle btn-ghost right-2 top-2 text-xl"
              onClick={() => setError({ ...error, error: false })}
            >
              ✕
            </button>
          </form>
        </div>
        <div className="divider" />
        <div
          role="alert"
          className={`alert alert-error ${
            error.error ? "flex" : "hidden"
          } mb-5`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error.message}</span>
        </div>
        <div className="mb-6">
          <label
            htmlFor="small-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            제목
          </label>
          <input
            type="text"
            name="subject"
            onChange={handleChange}
            value={state.subject}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="large-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            내용
          </label>
          <input
            type="text"
            name="content"
            onChange={handleChange}
            value={state.content}
            className="block w-full p-16 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          onClick={() => registerQuestion()}
          className="btn btn-neutral w-full self-center"
        >
          질문 등록하기
        </button>
      </div>
    </dialog>
  );
};

export default QuestionRegistry;
