import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 라우터가 부분적으로 경로가 닮으면 인식이 잘못될 수 있어 정확한 경로로 가겠끔 exact를 넣어줌 */}
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
