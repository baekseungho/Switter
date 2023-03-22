import React, { useEffect, useState } from "react";
import { db } from "../fbase";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // 로그인 변화가 있는지를 확인 누군가가 createaccount를 했거나 login을 눌렀거나
    // 아니면 이미 로그인 되있는지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()}Switter</footer>
    </>
  );
}

export default App;
