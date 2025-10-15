import { useState } from "react";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

const useDeleteItem = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const deleteItem = async (id: string | undefined) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.delete(`${URL}/items/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response) {
        throw new Error("Failed to delete item");
      }
      setSuccess("Item deleted successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading, error, success };
};

export default useDeleteItem;
