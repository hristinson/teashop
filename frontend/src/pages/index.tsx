import { useState } from "react";
import { useItems } from "../hooks/useItems";
import useDeleteItem from "../hooks/useDeleteItem";
import Item from "../components/item";
import Header from "../components/header";
import AddItemForm from "../components/addItemForm";
import ItemDetails from "../components/itemDetails";
import { ItemModel } from "../models/item";

const ItemsList = () => {
  const { items, loading, error } = useItems();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { deleteItem, loading: deleteLoading } = useDeleteItem();
  const [selectedItem, setSelectedItem] = useState({} as ItemModel);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading || deleteLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <div>
        <Header />
        <button onClick={() => setIsDialogOpen(true)}>Add</button>
      </div>
      <div className="App">
        <div className="items-grid">
          {items.map((item: any) => (
            <div
              key={item.id}
              onClick={() => {
                openModal(item);
              }}
            >
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
      <ItemDetails
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ItemsList;
