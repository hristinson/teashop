import { useState, useEffect } from "react";
import { ItemModel } from "../models/item";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

export const useItems = () => {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      if (URL) {
        setLoading(true);

        try {
          const response = await axios.get(`${URL}/items`, {
            headers: { "Content-Type": "application/json" },
          });

          setItems(response.data);
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

  return { items, loading, error, setReload, reload };
};
