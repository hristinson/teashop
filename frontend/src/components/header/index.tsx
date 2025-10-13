import React from "react";
import banner from "../../assets/banner.webp";
import HeaderButtons from "../headerButtons";
import "./index.css";

const Header: React.FC = () => {
  return (
    <div className="header" style={{ backgroundImage: `url(${banner})` }}>
      <HeaderButtons />
    </div>
  );
};

export default Header;
