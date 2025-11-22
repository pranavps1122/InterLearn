import React from "react";
import LogoImg from "../../../assets/images/logos/Interlearn.logo.png";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo-wrapper">
      <img 
        src={LogoImg} 
        alt="InterLearn Logo" 
        className="logo-image"
      />
    </div>
  );
}
