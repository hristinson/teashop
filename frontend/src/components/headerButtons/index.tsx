import { useState, useCallback } from "react";
import "./index.css";
import packageInfo from "../../../package.json";
import LoginModal from "../../components/loginModal";
import AddItemForm from "../../components/addItemForm";
import AddUserForm from "../../components/addUserForm";
import { useAuth } from "../../context";

interface HeaderButtonsInterface {
  itemsReload: () => void;
}

const HeaderButtons: React.FC<HeaderButtonsInterface> = ({ itemsReload }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isDialogProductOpen, setIsDialogProductOpen] = useState(false);
  const [isDialogUserOpen, setIsDialogUserOpen] = useState(false);
  const openModal = () => setIsLoginModalOpen(true);
  const { user, setUser } = useAuth();

  const closeModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsDialogProductOpen(false);
    setIsDialogUserOpen(false);
    setIsDialogProductOpen(false);
    itemsReload();
  }, [setIsDialogProductOpen, itemsReload]);

  return (
    <header className="headerButtons">
      <div className="ribbon">
        <span className="version">version: {packageInfo.version}</span>
        <span className="version">
          {user && user.email ? (
            <>
              {user.first_name} {user.last_name}
            </>
          ) : null}
        </span>
        <div className="btnsBlock">
          {user && user.role === "admin" ? (
            <>
              <button
                onClick={() => setIsDialogProductOpen(true)}
                className="login-btn"
              >
                Add product
              </button>
              <button
                onClick={() => setIsDialogUserOpen(true)}
                className="login-btn"
              >
                Add user
              </button>
            </>
          ) : null}
          <button
            className="login-btn"
            onClick={user ? () => setUser(null) : openModal}
          >
            {user ? "Exit" : "Login"}
          </button>
          {!user ? (
            <button
              onClick={() => setIsDialogUserOpen(true)}
              className="login-btn"
            >
              Sign in
            </button>
          ) : null}
        </div>
      </div>
      <LoginModal showModal={isLoginModalOpen} closeModal={closeModal} />
      <AddItemForm showModal={isDialogProductOpen} closeModal={closeModal} />
      <AddUserForm showModal={isDialogUserOpen} closeModal={closeModal} />
    </header>
  );
};

export default HeaderButtons;
