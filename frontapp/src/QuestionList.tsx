import {useEffect, useState} from "react";
import axios from "axios";
import {Question} from "./types.ts";

const QuestionList = () => {
    useEffect(() => {
        axios.get("/api/question/list").then((res) => {
            setQuestionList(res.data)
        })
    }, [])

    const [questionList, setQuestionList] = useState<Question[]>()

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th>제목</th>
                    <th>작성일시</th>
                </tr>
                </thead>
                {questionList?.map(question => {
                    return (
                        <tr>
                            <td>{question.subject}</td>
                            <td>{question.createDate}</td>
                        </tr>
                    );
                })}
            </table>
        </>
    )
}

export default QuestionList;