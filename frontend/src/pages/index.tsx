// export default function Main() {
//   return <div>Hello world!</div>;
// }

import React from "react";
import { useItems } from "../hooks/useItems";

const ItemsList: React.FC = () => {
  const { items, loading, error } = useItems();

  if (loading) return <div>Завантаження айтемів...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong>: {item.description} — {item.price} грн
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
