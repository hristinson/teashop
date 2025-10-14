import React, { useState, useRef } from "react";
import "./index.css";
import { useAuth } from "../../context/";
import useDragging from "../../hooks/useDragging";

const URL = process.env.REACT_APP_API_URL;

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const LoginModal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { setUser } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const dragProps = useDragging(dialogRef, true);

  React.useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      setUser(data.user);
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <dialog ref={dialogRef} className="modal-dialog" {...dragProps}>
      <button className="close-btn" onClick={closeModal}>
        X
      </button>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>{" "}
        <input
          type="text"
          id="username"
          name="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>{" "}
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
};

export default LoginModal;
