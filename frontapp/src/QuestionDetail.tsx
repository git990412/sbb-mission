import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Question} from "./types.ts";

const QuestionDetail = () => {
    let param = useParams();

    useEffect(() => {
        axios.get(`/api/question/detail/${param.index}`).then((res) => {
            setQuestion(res.data)
        })
    }, [])

    const [question, setQuestion] = useState<Question>();
    return (
        <>
            <h1>{question?.subject}</h1>
            <div>{question?.content}</div>
        </>
    )
}

export default QuestionDetail;