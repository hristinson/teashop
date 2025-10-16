import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

const useOrders = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.get(`${URL}/orders/all`);

      if (response.status !== 200) {
        throw new Error("Failed to fetch orders");
      }

      setAllOrders(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unknown error:", err);
      }
      return [];
    }
  }, []);

  const fetchOrdersCount = useCallback(async () => {
    if (user && user.id) {
      try {
        const response = await axios.get(`${URL}/count`, {
          params: { user_id: user.id },
        });

        setOrdersCount(response.data.order_count);
        // console.log("ToDo");
        // console.log(ordersCount);
        // console.log("------");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(axios.isAxiosError(err));
        }
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchOrdersCount();
    fetchAllOrders();
  }, [user, fetchOrdersCount, fetchAllOrders]);

  const createOrder = async (itemId: string | undefined, quantity: number) => {
    if (user && user.id && itemId) {
      const formData = new FormData();
      formData.append("order[user_id]", user.id.toString());
      formData.append("order[amount]", quantity.toString());
      formData.append("order[item][item_id]", itemId.toString());
      formData.append("order[item][quantity]", quantity.toString());

      try {
        const response = await axios.post(`${URL}/orders`, formData);
        if (response.status !== 201) {
          throw new Error("Failed to add item");
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(axios.isAxiosError(err));
        }
      } finally {
        fetchOrdersCount();
      }
    }
  };

  return { ordersCount, loading, createOrder, allOrders };
};

export default useOrders;
