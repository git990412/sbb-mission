import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Question } from "./types.ts";

const QuestionDetail = () => {
  let param = useParams();

  useEffect(() => {
    axios.get(`/api/question/detail/${param.index}`).then((res) => {
      setQuestion(res.data);
      console.log(question);
    });
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
        axios.get(`/api/question/detail/${param.index}`).then((res) => {
          setQuestion(res.data);
          console.log(question);
        });
      });
  };

  const [question, setQuestion] = useState<Question>();

  return (
    <>
      <h1>{question?.subject}</h1>
      <div>{question?.content}</div>
      <h5>{question?.answerList.length}개의 답변이 있습니다.</h5>
      <div>
        <ul>
          {question?.answerList.map((answer) => {
            return <li>{answer.content}</li>;
          })}
        </ul>
      </div>
      <form onSubmit={handleSumbit}>
        <textarea name="content" id="content" rows={15}></textarea>
        <input type="submit" value="답변등록" />
      </form>
    </>
  );
};

export default QuestionDetail;
