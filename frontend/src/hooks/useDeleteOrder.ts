import { useState } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

interface UseDeleteOrderReturn {
  deleteOrder: (orderId: number | string) => Promise<boolean>;
  isDeleting: boolean;
  error: string | null;
}

export const useDeleteOrder = (): UseDeleteOrderReturn => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteOrder = async (orderId: number | string): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`${URL}/orders/${orderId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message);
      } else {
        setError("Unknown error");
      }
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteOrder, isDeleting, error };
};
