import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks.ts";
import {
  selectQuestions,
  updateQuestions,
} from "./app/feature/QuestionListSlice.ts";
import { Question } from "./types.ts";
import QuestionRegistry from "./QuestionRegistry.tsx";

const QuestionList = () => {
  const questionList: Question[] = useAppSelector(selectQuestions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateQuestions());
  }, []);

  return (
    <>
      <div className="overflow-x-auto w-screen h-screen  flex flex-col items-center justify-start px-5">
        <table className="table mb-5">
          {/* head */}
          <thead>
            <tr className="bg-slate-800 text-white">
              <th>번호</th>
              <th>제목</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {questionList?.map((question) => {
              return (
                <tr className="hover cursor-pointer">
                  <th>{question.id}</th>
                  <td>{question.subject}</td>
                  <td>{new Date(question.createDate).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          className="btn btn-neutral w-2/3"
          onClick={() =>
            (document.getElementById("addQuestion") as any).showModal()
          }
        >
          질문 등록하기
        </button>
        <QuestionRegistry />
      </div>
    </>
  );
};

export default QuestionList;
