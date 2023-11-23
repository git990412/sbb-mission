import { useNavigate, useParams } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { Err, Question } from "./types.ts";
import QuestionModifier from "./components/QuestionModifier.tsx";
import AnswerModifier from "./components/AnswerModifier.tsx";
import timestamp from "./util/timestamp.ts";

const TextBox = (props: { children: ReactNode }) => {
  return (
    <div className="flex-col mb-5 place-content-between card bg-base-300 rounded-box p-4">
      {props.children}
    </div>
  );
};

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
      })
      .catch((error) => {
        setErr({
          error: true,
          message: error.response.data.message,
        });
      });
  };

  const [question, setQuestion] = useState<Question>();
  const [err, setErr] = useState<Err>({
    error: false,
    message: "",
  });
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col w-screen px-5">
        <h1 className="text-2xl font-bold">{question?.subject}</h1>
        <div className="divider" />
        <TextBox>
          <p>{question?.content}</p>
          <div className="flex justify-between items-center mt-5">
            <div>
              <button
                className="btn btn-neutral btn-xs"
                onClick={() => {
                  (
                    document.getElementById("modifyQuestion") as any
                  ).showModal();
                }}
              >
                수정
              </button>
              <QuestionModifier index={question?.id as number} />
              <button
                className="btn btn-neutral btn-xs ml-2"
                onClick={() => {
                  axios
                    .get(`/api/question/delete/${question?.id as number}`)
                    .then(() => {
                      navigate("/question/list");
                    });
                }}
              >
                삭제
              </button>
            </div>
            <div className="badge badge-md rounded-md badge-neutral">
              {timestamp(new Date(question?.createDate as any))}
            </div>
          </div>
        </TextBox>
        <h5 className="text-xl font-bold">
          {question?.answerList.length}개의 답변이 있습니다.
        </h5>
        <div className="divider" />
        {question?.answerList.map((answer) => {
          return (
            <TextBox>
              <p>{answer.content}</p>
              <div className="flex justify-between items-center mt-5">
                <div>
                  <button
                    className="btn btn-neutral btn-xs"
                    onClick={() => {
                      (
                        document.getElementById("modifyAnswer") as any
                      ).showModal();
                    }}
                  >
                    수정
                  </button>
                  <AnswerModifier index={answer?.id as number} />
                  <button
                    className="btn btn-neutral btn-xs ml-2"
                    onClick={() => {
                      axios
                        .get(`/api/answer/delete/${answer?.id as number}`)
                        .then(() => {
                          navigate(`/question/detail/${param.index}`);
                        })
                        .catch(() => {
                          alert("삭제 권한이 없습니다.");
                        });
                    }}
                  >
                    삭제
                  </button>
                </div>
                <div className="flex">
                  <div
                    className={`self-end badge badge-xs h-auto rounded-md leading-4 font-bold badge-neutral ${
                      answer.modifyDate ? "inline-flex" : "hidden"
                    }`}
                  >
                    modified at
                    <br className="p-5" />
                    {timestamp(new Date(answer.createDate))}
                  </div>
                  <div className="ml-2 self-end badge badge-xs h-auto rounded-md leading-4 font-bold badge-neutral">
                    {answer.author ? answer.author.username : "null"}
                    <br className="p-5" />
                    {timestamp(new Date(answer.createDate))}
                  </div>
                </div>
              </div>
            </TextBox>
          );
        })}
        <form onSubmit={handleSumbit}>
          <textarea
            className="textarea textarea-bordered w-full mb-5"
            name="content"
            id="content"
            rows={10}
          ></textarea>
          <div
            role="alert"
            className={`alert alert-error ${
              err.error ? "flex" : "hidden"
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
            <span>{err.message}</span>
          </div>
          <button className="btn w-full" type="submit">
            답변등록
          </button>
        </form>
      </div>
    </>
  );
};

export default QuestionDetail;
