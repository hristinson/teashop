import { useState, useEffect } from "react";

type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

// const URL = "https://teashop-n3kp.onrender.com/items"; https://corsfix.com/https://teashop-n3kp.onrender.com/items
const URL = "https://corsfix.com/https://teashop-n3kp.onrender.com/items";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(URL, {
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
        console.log("------Error-----");
        console.log(err);
        console.log("----------------");
        setLoading(false);
      });
  }, []);

  return { items, loading, error };
}
