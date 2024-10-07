import { Navigate, Route, Routes, useLocation, BrowserRouter as Router } from 'react-router-dom';
import React, { useEffect } from "react";
import Facebook from './Pages/FacebookPixel';
import useAnalytics from './useAnalytics';
import ScrollToTop from './Pages/ScrollToTop';
import MainStack from './Navigations/MainStack';
import AuthStack from './Navigations/AuthStack';

function App() {
  const location = useLocation();
  useAnalytics();
  const userToken = window.localStorage.getItem("userToken");

  return (
    <>
      <ScrollToTop />
      {/* <Navbar /> */}
      <Facebook />
      {userToken ? <MainStack /> : <AuthStack />}
      {/* <Footer /> */}
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
