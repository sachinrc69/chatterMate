import "./App.css";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "./contexts/userContext";
import { CurrentChatProvider } from "./contexts/currentChat";
import { SocketContextProvider } from "./contexts/socketContext";
import { MessageContextProvider } from "./contexts/messages";
import { OtherUesrsContextProvider } from "./contexts/otherUesrsContext";
import { CurrentGroupProvider } from "./contexts/currentGroup";

function App() {
  const [user, setUser] = useState(null);

  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const temp = localStorage.getItem("user");
    const temp2 = JSON.parse(temp);
    setUser(temp2);
    setAuthToken(localStorage.getItem("authToken") || null);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center ">
      <CurrentChatProvider>
        <UserContext.Provider value={{ user, setUser }}>
          <SocketContextProvider>
            <MessageContextProvider>
              <OtherUesrsContextProvider>
                <CurrentGroupProvider>
                  <Routes>
                    <Route
                      path="/"
                      element={user ? <Home /> : <Navigate to="/login" />}
                    ></Route>
                    <Route
                      path="/login"
                      element={user ? <Navigate to="/" /> : <Login />}
                    ></Route>
                    <Route
                      path="/signup"
                      element={user ? <Navigate to="/" /> : <Signup />}
                    ></Route>
                  </Routes>
                </CurrentGroupProvider>
              </OtherUesrsContextProvider>
            </MessageContextProvider>
          </SocketContextProvider>
        </UserContext.Provider>
      </CurrentChatProvider>
    </div>
  );
}

export default App;
