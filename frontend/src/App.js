import ChatPage from "./Components/ChatPage";
import Home from "./Components/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      ;
    </Router>
  );
}

export default App;
