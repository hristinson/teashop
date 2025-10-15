import React from "react";
import banner from "../../assets/banner.webp";
import HeaderButtons from "../headerButtons";
import "./index.css";
interface HeaderInterface {
  itemsReload: () => void;
  isDialogOrdersOpen: boolean;
  setIsDialogOrdersOpen: (state: boolean) => void;
}

const Header: React.FC<HeaderInterface> = ({
  itemsReload,
  isDialogOrdersOpen,
  setIsDialogOrdersOpen,
}) => {
  return (
    <div className="header" style={{ backgroundImage: `url(${banner})` }}>
      <HeaderButtons
        itemsReload={itemsReload}
        isDialogOrdersOpen={isDialogOrdersOpen}
        setIsDialogOrdersOpen={setIsDialogOrdersOpen}
      />
    </div>
  );
};

export default Header;
