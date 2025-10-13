import { useCallback, useState } from "react";
import { useItems } from "../hooks/useItems";
import useDeleteItem from "../hooks/useDeleteItem";
import Item from "../components/item";
import Header from "../components/header";

import ItemDetails from "../components/itemDetails";
import { ItemModel } from "../models/item";
import Loader from "../components/loader";

const ItemsList = () => {
  const { items, loading, error } = useItems();
  const { deleteItem: deleteItemHook, loading: deleteLoading } =
    useDeleteItem();
  const [selectedItem, setSelectedItem] = useState({} as ItemModel);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteItem = useCallback((item: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (isConfirmed) {
      deleteItemHook(item);
    } else {
      console.log("Item not deleted");
    }
  }, []);

  const openModal = useCallback((item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (loading || deleteLoading) return <Loader isBig={true} />;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="App">
        <div className="items_grid">
          {items.map((item: any) => (
            <div
              key={item.id}
              onClick={() => {
                openModal(item);
              }}
            >
              <Item
                key={item.id}
                item={item}
                deleteItem={() => deleteItem(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
      <ItemDetails
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ItemsList;
