import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Question } from "./types.ts";

const QuestionDetail = () => {
  let param = useParams();

  const getQuestionById = () => {
    axios.get(`/api/question/detail/${param.index}`).then((res) => {
      setQuestion(res.data);
    });
  };

  useEffect(() => {
    getQuestionById();
  }, []);

  const handleSumbit = (e: any) => {
    e.preventDefault();
    const content: string = e.target.content.value;
    console.log(e.target.content.value);
    axios
      .post(`/api/answer/create/${param.index}`, null, {
        params: { content: content },
      })
      .then(() => {
        getQuestionById();
      });
  };

  const [question, setQuestion] = useState<Question>();

  return (
    <>
      <div className="flex flex-col w-screen px-5">
        <h1 className="text-2xl font-bold">{question?.subject}</h1>
        <div className="divider" />
        <div className="flex-col mb-5 place-content-between h-20 card bg-base-300 rounded-box">
          <p className="p-2">{question?.content}</p>
          <div className="self-end m-2 badge badge-md badge-neutral">
            {question?.createDate}
          </div>
        </div>
        <h5 className="text-xl font-bold">
          {question?.answerList.length}개의 답변이 있습니다.
        </h5>
        <div className="divider" />
        {question?.answerList.map((answer) => {
          return (
            <div className="flex-col mb-5 place-content-between h-20 card bg-base-300 rounded-box">
              <p className="p-2">{answer.content}</p>
              <div className="self-end m-2 badge badge-md badge-neutral">
                {answer.createDate}
              </div>
            </div>
          );
        })}
        <form onSubmit={handleSumbit}>
          <textarea
            className="textarea textarea-bordered w-full"
            name="content"
            id="content"
            rows={10}
          ></textarea>
          <button className="btn w-full" type="submit">
            답변등록
          </button>
        </form>
      </div>
    </>
  );
};

export default QuestionDetail;
