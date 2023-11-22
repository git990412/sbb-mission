import { Route, Routes } from "react-router-dom";
import QuestionList from "./QuestionList.tsx";
import QuestionDetail from "./QuestionDetail.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {
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
