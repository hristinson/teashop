import { useState, useEffect } from "react";
import { ItemModel } from "../models/item";

const URL = process.env.REACT_APP_API_URL;

export const useItems = () => {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (URL) {
      fetch(`${URL}/items`, {
        headers: { "Content-Type": "application/json" },
        // credentials: "include", //auth
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error download");
          return res.json();
        })
        .then((data) => {
          setItems(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);

          setLoading(false);
        });
    }
  }, []);

  return { items, loading, error };
};
