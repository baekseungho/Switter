import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

// app.js에의해서 같은 userObj prop을 받는다
const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
};
export default AppRouter;
