import React, { useState } from "react";
import "./index.css";
import packageInfo from "../../../package.json";
import LoginModal from "../../components/loginModal";
import AddItemForm from "../../components/addItemForm";
import { useAuth } from "../../context";

const HeaderButtons: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="headerButtons">
      <div className="ribbon">
        <span className="version">version: {packageInfo.version}</span>
        <span className="version">
          {user && user.email === "admin@example.com" ? (
            <>
              {user.first_name} {user.last_name}
            </>
          ) : null}
        </span>
        <div className="btnsBlock">
          {user && user.email === "admin@example.com" ? (
            <button onClick={() => setIsDialogOpen(true)} className="login-btn">
              Add
            </button>
          ) : null}
          <button className="login-btn" onClick={openModal}>
            Login
          </button>
        </div>
      </div>

      <LoginModal showModal={isModalOpen} closeModal={closeModal} />
      <dialog open={isDialogOpen} className="dialog">
        <h2>Item Details</h2>
        <>
          <AddItemForm />
          <button onClick={() => setIsDialogOpen(false)}>Close</button>
        </>
      </dialog>
    </header>
  );
};

export default HeaderButtons;
