// src/App.tsx
import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { routes } from "@/routes";
import api from "./api/axios";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import "./LoadingFallback.css";
import { useAppDispatch } from "./store/hooks";
import { fetchMe,logoutThunk,setUser } from "./store/authSlice";
const NotFoundPage = React.lazy(
  () => import("@/pages/NotFoundPage/NotFoundPage")
);


const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-orb-container">
      <div className="loading-orb loading-orb-1"></div>
      <div className="loading-orb loading-orb-2"></div>
      <div className="loading-orb loading-orb-3"></div>
    </div>

    <div className="loading-content">
      <div className="loading-logo-wrapper">
        <div className="loading-logo-container">
          <div className="loading-ring loading-ring-outer"></div>
          <div className="loading-ring loading-ring-middle"></div>
          <div className="loading-ring loading-ring-inner"></div>
        </div>
      </div>

      <h1 className="loading-title">InterLearn</h1>

      <div className="loading-dots-container">
        <div className="loading-dot loading-dot-1"></div>
        <div className="loading-dot loading-dot-2"></div>
        <div className="loading-dot loading-dot-3"></div>
      </div>

      <p className="loading-subtext">Preparing your experience</p>
    </div>
  </div>
);

export default function App() {
  const dispatch = useAppDispatch();
 
useEffect(() => {
  const initAuth = async () => {
    try {
      let token = localStorage.getItem("accessToken");
      
      if (!token) {
        const res = await api.post("/auth/refresh-token");
        token = res.data.data.accessToken;
        localStorage.setItem("accessToken", token);
      }
      const me = await api.get("/auth/me");
      dispatch(setUser(me.data.data.result));
    

    } catch (err) {
      dispatch(logoutThunk());
    }
  };

  initAuth();
}, []);

  return (
    <>
 
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routes.map((route) => {
          const Layout = route.layout;
          const Guard = route.guard;

          const element = Guard ? (
            <Guard>
              {Layout ? <Layout /> : route.element}
            </Guard>
          ) : (
            Layout ? <Layout /> : route.element
          );

          return (
            <Route key={route.path} path={route.path} element={element}>
              {route.children?.map((child) => (
                <Route
                  key={child.path ?? "index"}
                  index={child.index}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          );
        })}
       
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        transition={Slide}
      />
    </Suspense>
    </>
  );
}
