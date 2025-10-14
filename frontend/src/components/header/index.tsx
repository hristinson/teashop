import React from "react";
import banner from "../../assets/banner.webp";
import HeaderButtons from "../headerButtons";
import "./index.css";
interface HeaderInterface {
  itemsReload: () => void;
}

const Header: React.FC<HeaderInterface> = ({ itemsReload }) => {
  return (
    <div className="header" style={{ backgroundImage: `url(${banner})` }}>
      <HeaderButtons itemsReload={itemsReload} />
    </div>
  );
};

export default Header;
