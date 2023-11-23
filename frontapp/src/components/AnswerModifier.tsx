import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../app/hooks.ts";
import { updateQuestions } from "../app/feature/QuestionListSlice.ts";

const QuestionRegistry = (props: { index: number }) => {
  const dispatch = useAppDispatch();
  const registerQuestion = () => {
    const { content } = state;

    axios
      .get(`/api/answer/modify/${props.index}`, {
        params: {
          content: content,
          id: props.index,
        },
      })
      .then(() => {
        dispatch(updateQuestions(0));

        setError({
          ...error,
          error: false,
        });

        axios.get(`/api/question/detail/${props.index}`);

        document.getElementById("closeAnswerModifyModal")?.click();
      })
      .catch((err) => {
        console.log(err);
        setError({
          error: true,
          message: err.response.data.message,
        });
      });

    setState({ content: "" });
  };

  const [state, setState] = useState({
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
    <dialog id="modifyAnswer" className="modal">
      <div className="modal-box flex flex-col">
        <div className="flex justify-between">
          <h5 className="font-bold text-xl grid place-self-center">질문수정</h5>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="closeAnswerModifyModal"
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
            className="block w-full p-16 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => registerQuestion()}
          className="btn btn-neutral w-full self-center"
        >
          질문 수정하기
        </button>
      </div>
    </dialog>
  );
};

export default QuestionRegistry;
