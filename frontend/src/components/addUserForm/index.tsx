import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context";
import useDragging from "../../hooks/useDragging";
import axios from "axios";

interface AddUserFormInterface {
  showModal: boolean;
  closeModal: () => void;
}

const AddUserForm: React.FC<AddUserFormInterface> = ({
  showModal,
  closeModal,
}) => {
  const URL = process.env.REACT_APP_API_URL;
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { user } = useAuth();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragProps = useDragging(dialogRef, true);

  useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("user[first_name]", first_name);
    formData.append("user[last_name]", last_name);
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append("user[role]", role);

    try {
      const response = await axios.post(`${URL}/users`, formData);

      if (!response) {
        throw new Error("Failed to add user");
      }

      const data = await response.data;
      console.log("User created:", data);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("");
      setSuccess("User added successfully");
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <dialog ref={dialogRef} className="modal-dialog" {...dragProps}>
      <button className="close-btn" onClick={closeModal}>
        X
      </button>
      <h2>Add User</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {user && user.email === "admin@example.com" ? (
          <div>
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        ) : null}

        <button type="submit">Add User</button>
      </form>
    </dialog>
  );
};

export default AddUserForm;
