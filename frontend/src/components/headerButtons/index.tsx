import React, { useState } from "react";
import "./index.css";
import packageInfo from "../../../package.json";
import Modal from "../../components/loginModal";
import AddItemForm from "../../components/addItemForm";

const HeaderButtons: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="headerButtons">
      <div className="ribbon">
        <span className="version">version: {packageInfo.version}</span>
        <div className="btnsBlock">
          <button onClick={() => setIsDialogOpen(true)} className="login-btn">
            Add
          </button>
          <button className="login-btn" onClick={openModal}>
            Login
          </button>
        </div>
      </div>

      <Modal showModal={isModalOpen} closeModal={closeModal} />
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
