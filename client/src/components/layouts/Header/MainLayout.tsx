import React from "react";
import Header from "../Header/Header"


const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer />  if you want global footer also */}
    </>
  );
};

export default MainLayout;
