import React, { useState } from "react";
import { db } from "../fbase";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()}Switter</footer>
    </>
  );
}

export default App;
