import { useState, useEffect, useCallback } from "react";
import { ItemModel } from "../models/item";

const URL = process.env.REACT_APP_API_URL;

export const useItems = () => {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(false);

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
          setLoading(true);
        })
        .finally(() => {
          setReload(false);
        });
    }
  }, [reload]);

  return { items, loading, error, setReload, reload };
};
