// src/App.tsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes, { AppRoute } from "./routes/RouteConfig";

// Toast
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css"; // keep if you have custom toast styles

const LoadingFallback = () => <div>Loading...</div>;

function wrapWithLayout(
  Layout: React.ComponentType<any> | undefined,
  guard: ((node: React.ReactElement) => React.ReactElement) | undefined,
  element: React.ReactElement | null
): React.ReactElement | null {
  if (!element) return null;
  const guarded = guard ? guard(element) : element;
  if (!Layout) return guarded;
  return React.createElement(Layout, null, guarded);
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {routes.map((r: AppRoute) => {
            // If parent has children, render parent Route with a layout element
            if (r.children?.length) {
              const ParentLayout = r.layout;
              const parentElement = r.element ?? <></>;
              const parentNode = wrapWithLayout(ParentLayout, r.guard, parentElement);

              return (
                <Route key={r.path ?? "/"} path={r.path} element={parentNode}>
                  {r.children!.map((child) => {
                    const ChildLayout = child.layout;
                    const childElement = child.element ?? <></>;
                    const childNode = wrapWithLayout(ChildLayout, child.guard, childElement);

                    if (child.index) {
                      return <Route key={child.path ?? "index"} index element={childNode} />;
                    }
                    return <Route key={`${r.path}/${child.path}`} path={child.path} element={childNode} />;
                  })}
                </Route>
              );
            }

            // no children
            const LayoutComp = r.layout;
            const final = wrapWithLayout(LayoutComp, r.guard, r.element ?? <></>);
            if (r.index) return <Route key={r.path ?? "index"} index element={final} />;
            return <Route key={r.path ?? Math.random().toString()} path={r.path} element={final} />;
          })}
        </Routes>

        {/* ToastContainer: placed at root so all components can fire toasts */}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          pauseOnFocusLoss
          draggable
          transition={Slide}
        />
      </Suspense>
    </BrowserRouter>
  );
}
