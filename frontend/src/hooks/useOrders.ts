import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context";
const URL = process.env.REACT_APP_API_URL;

const useOrders = () => {
  const [ordersCount, setOrdersCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchOrdersCount = useCallback(async () => {
    if (user && user.id) {
      try {
        const response = await fetch(`${URL}/count?user_id=${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch orders count");
        }

        const data = await response.json();
        setOrdersCount(data.order_count);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchOrdersCount();
  }, [user, fetchOrdersCount]);

  const createOrder = async (itemId: string | undefined, quantity: number) => {
    if (user && user.id) {
      const formData = new FormData();
      formData.append("order[user_id]", user.id.toString());
      formData.append("order[amount]", quantity.toString());

      try {
        const response = await fetch(`${URL}/orders`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to add item");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        fetchOrdersCount();
        console.log("ToDo");
        console.log(ordersCount);
        console.log("------");
      }
    }
  };

  return { ordersCount, loading, error, createOrder };
};

export default useOrders;
