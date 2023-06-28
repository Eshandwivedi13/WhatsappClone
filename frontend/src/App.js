import ChatPage from "./Components/ChatPage";
import Home from "./Components/Home";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Components/Login";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  return (
    <Router>
      <div className="App">
        {user ? (
          <Routes>
            <Route path="/:emailId" element={<ChatPage currentUser={user} />} />
            <Route
              path="/"
              element={
                <Home
                  currentUser={user}
                  parentCallBack={(childData) => {
                    setUser(childData);
                    // console.log("hat gya");
                  }}
                />
              }
            />
          </Routes>
        ) : (
          <Login setUser={setUser} /> //sending set user func as a prop
        )}
      </div>
      ;
    </Router>
  );
}

export default App;
