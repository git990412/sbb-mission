import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from "react";
import axios from "axios";

const InputBox = (props: {
  children: ReactNode;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="small-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.children}
      </label>
      <input
        type="text"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

const SignUpDialog = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const [signUpForm, setSignUpForm] = useState({
    username: "",
    password1: "",
    password2: "",
    email: "",
  });

  const initSignUpForm = () => {
    setSignUpForm({
      username: "",
      password1: "",
      password2: "",
      email: "",
    });
  };

  const [error, setError] = useState({
    message: "",
    error: false,
  });

  return (
    <dialog id="signUpModal" className="modal">
      <div className="modal-box flex flex-col">
        <div className="flex justify-between">
          <h5 className="font-bold text-xl grid place-self-center">회원가입</h5>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              id="closeSignUp"
              className="btn btn-sm btn-circle btn-ghost right-2 top-2 text-xl"
              onClick={() => {
                setError({
                  ...error,
                  error: false,
                });
                initSignUpForm();
              }}
            >
              ✕
            </button>
          </form>
        </div>
        <div className="divider" />
        <InputBox
          name="username"
          value={signUpForm.username}
          onChange={handleChange}
        >
          아이디
        </InputBox>
        <InputBox
          name="password1"
          value={signUpForm.password1}
          onChange={handleChange}
        >
          비밀번호
        </InputBox>
        <InputBox
          name="password2"
          value={signUpForm.password2}
          onChange={handleChange}
        >
          비밀번호 확인
        </InputBox>
        <InputBox name="email" value={signUpForm.email} onChange={handleChange}>
          이메일
        </InputBox>
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
        <button
          className="btn btn-neutral w-full self-center"
          onClick={() =>
            axios
              .post("/api/user/signup", null, {
                params: {
                  username: signUpForm.username,
                  password1: signUpForm.password1,
                  password2: signUpForm.password2,
                  email: signUpForm.email,
                },
              })
              .then(() => {
                initSignUpForm();
                setError({
                  ...error,
                  error: false,
                });
                document.getElementById("closeSignUp")?.click();
              })
              .catch((err) => {
                setError({
                  error: true,
                  message: err.response.data,
                });
              })
          }
        >
          회원가입
        </button>
      </div>
    </dialog>
  );
};

export default SignUpDialog;
