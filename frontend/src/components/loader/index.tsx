import React from "react";
import "./index.css";

const Loader: React.FC<any> = ({ isBig }) => {
  return (
    <div className={isBig ? "loader_container" : "loader_small_container"}>
      <div className={isBig ? "loader" : "loader_small"}></div>
    </div>
  );
};

export default Loader;
