import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import {
  selectCurrentPage,
  selectQuestions,
  selectTotalPages,
  updateQuestions,
} from "./app/feature/QuestionListSlice.ts";
import { Question } from "./types.ts";
import QuestionRegistry from "./QuestionRegistry.tsx";
import { useNavigate } from "react-router-dom";
import { selectStatus } from "./app/feature/LoginStatus.ts";
import timestamp from "./util/timestamp.ts";

const QuestionList = () => {
  const questionList: Question[] = useAppSelector(selectQuestions);
  const totalPages = useAppSelector(selectTotalPages);
  const currentPage = useAppSelector(selectCurrentPage);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const Login = useAppSelector(selectStatus);

  const pageUtil = (x: number) => {
    if (x % 5 === 0) {
      // 5의 배수인 경우
      return x + 4;
    } else {
      // 5의 배수가 아닌 경우
      return Math.floor(x / 5) * 5 + 4;
    }
  };

  useEffect(() => {
    dispatch(updateQuestions({ page: 0, kw: "" }));
  }, []);

  const [kw, setKw] = useState<string>("");

  return (
    <>
      <div className="overflow-x-auto w-screen flex flex-col items-center justify-start">
        <table className="table mb-5 shadow-md rounded-none">
          {/* head */}
          <thead>
            <tr className="bg-slate-800 text-white">
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {questionList?.map((question, key) => {
              return (
                <tr
                  className="hover cursor-pointer"
                  onClick={() => {
                    navigate(`/question/detail/${question.id}`);
                  }}
                  key={key}
                >
                  <th>{question.id}</th>
                  <td>
                    {question.subject}
                    <div className="badge badge-neutral ml-5">
                      {question.answerList.length}
                    </div>
                  </td>
                  <td>{question.author ? question.author.username : "null"}</td>
                  <td>{timestamp(new Date(question.createDate))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered join-item"
                placeholder="Search"
                onChange={(e) => {
                  setKw(e.target.value);
                }}
                value={kw}
              />
            </div>
          </div>
          <div className="indicator">
            <button
              className="btn join-item"
              onClick={() => {
                dispatch(updateQuestions({ page: 0, kw: kw }));
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="join my-5">
          <button
            className={`join-item btn`}
            onClick={() => {
              if (currentPage > 0) {
                dispatch(updateQuestions({ page: currentPage - 1, kw: "" }));
              }
            }}
          ></button>
          {Array(totalPages)
            .fill(0)
            .map((_v, i) => {
              if (i <= pageUtil(currentPage) && i > pageUtil(currentPage) - 5) {
                return (
                  <button
                    className={`join-item btn ${
                      currentPage == i ? "btn-active" : ""
                    }`}
                    onClick={() =>
                      dispatch(updateQuestions({ page: i, kw: "" }))
                    }
                    key={i}
                  >
                    {i}
                  </button>
                );
              }
            })}
          <button
            className="join-item btn"
            onClick={() =>
              dispatch(updateQuestions({ page: currentPage + 1, kw: "" }))
            }
          >
            »
          </button>
        </div>
        <button
          className="btn btn-neutral w-2/3"
          onClick={() => {
            if (Login) {
              (document.getElementById("addQuestion") as any).showModal();
            } else {
              alert("로그인을 먼저 진행해주세요.");
            }
          }}
        >
          질문 등록하기
        </button>
        <QuestionRegistry />
      </div>
    </>
  );
};

export default QuestionList;
