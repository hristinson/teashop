import { useState, useEffect } from "react";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/items", {
      headers: { "Content-Type": "application/json" },
      //   credentials: "include", //auth
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
  }, []);

  return { items, loading, error };
}
