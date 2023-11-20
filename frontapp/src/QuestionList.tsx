import { useEffect, useState } from "react";
import axios from "axios";
import { Question } from "./types.ts";

const QuestionList = () => {
  useEffect(() => {
    axios.get("/api/question/list").then((res) => {
      setQuestionList(res.data);
    });
  }, []);

  const [questionList, setQuestionList] = useState<Question[]>();

  return (
    <>
      <div className="overflow-x-auto w-screen h-screen  flex flex-col justify-start px-5">
        <table className="table">
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
      </div>
    </>
  );
};

export default QuestionList;
