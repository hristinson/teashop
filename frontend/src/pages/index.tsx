import { useState } from "react";
import { useItems } from "../hooks/useItems";
import useDeleteItem from "../hooks/useDeleteItem";
import Item from "../components/item";
import Header from "../components/header";
import AddItemForm from "../components/addItemForm";

const ItemsList = () => {
  const { items, loading, error } = useItems();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteItem, success } = useDeleteItem();

  if (loading) return <div>Завантаження айтемів...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <>
      <div>
        <Header />
        <button onClick={() => setIsDialogOpen(true)}>Add</button>
      </div>
      <div className="App">
        <div className="items-grid">
          {items.map((item: any) => (
            <div key={item.id}>
              <Item key={item.id} item={item} />
              <button onClick={() => deleteItem(item.id)}>X</button>
            </div>
          ))}
        </div>
      </div>

      <dialog open={isDialogOpen} className="modal">
        <h2>Item Details</h2>
        <>
          <AddItemForm />
          <button onClick={() => setIsDialogOpen(false)}>Close</button>
        </>
      </dialog>
    </>
  );
};

export default ItemsList;
