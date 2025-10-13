import React, { useRef } from "react";
import "./index.css";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showModal]);

  return (
    <dialog ref={dialogRef} className="modal-dialog">
      <button className="close-btn" onClick={closeModal}>
        X
      </button>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
};

export default Modal;
