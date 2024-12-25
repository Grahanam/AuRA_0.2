import { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Aura from "./hocs/Aura";

import { useSelector, useDispatch } from "react-redux";
import { checkcookies, checkTokenstamp } from "./features/Auth/authSlice";
import { fetchSingleUser } from "./actions/user/useraction";

function App() {
  const { token, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const initialize = async () => {
  //     await dispatch(checkcookies()); // Wait for checkcookies to complete
  //     console.log(token?.userid);
  //     if (token?.userid) {
  //       dispatch(fetchSingleUser(token.userid));
  //     }
  //   };

  //   initialize();
  // }, [dispatch]);
  useEffect(() => {
    const initialize = async () => {
      await dispatch(checkcookies()); // Ensure it completes
    };

    initialize();
  }, [dispatch]);

  // Trigger `fetchSingleUser` when `token?.userid` becomes available
  // useEffect(() => {
  //   if (token?.userid) {
  //     dispatch(fetchSingleUser(token.userid));
  //   }
  // }, [dispatch, token?.userid]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<Aura />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
