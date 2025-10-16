import { useState, useEffect } from "react";
import { UserModel } from "../models/user";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export const useUsers = () => {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (URL) {
        setLoading(true);

        try {
          const response = await axios.get(`${URL}/users`, {
            headers: { "Content-Type": "application/json" },
          });

          setUsers(response.data);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            setError(err.message);
          } else {
            setError("Unknown error occurred");
          }
        } finally {
          setLoading(false);
          setReload(false);
        }
      }
    };

    fetchItems();
  }, [reload]);

  return { users, loading, error, setReload, reload };
};
