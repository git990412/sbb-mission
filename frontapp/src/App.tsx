import { Route, Routes } from "react-router-dom";
import QuestionList from "./QuestionList.tsx";
import QuestionDetail from "./QuestionDetail.tsx";
import Navbar from "./components/Navbar.tsx";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogin } from "./app/feature/LoginStatus.ts";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/user/isLogin")
      .then(() => {
        dispatch(setLogin(true));
      })
      .catch(() => {
        dispatch(setLogin(false));
      });
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="question/list" element={<QuestionList />} />
        <Route path="question/detail/:index" element={<QuestionDetail />} />
      </Routes>
    </>
  );
}

export default App;
