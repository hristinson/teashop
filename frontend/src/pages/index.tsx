import { useCallback, useState } from "react";
import { useItems } from "../hooks/useItems";
import useDeleteItem from "../hooks/useDeleteItem";
import Item from "../components/item";
import Header from "../components/header";
import FullScreenPlaceholder from "../components/fullScreenPlaceholder";
import ItemDetails from "../components/itemDetails";
import { ItemModel } from "../models/item";
import Loader from "../components/loader";

const ItemsList = () => {
  const { items, loading, error, setReload } = useItems();
  const { deleteItem: deleteItemHook, loading: deleteLoading } =
    useDeleteItem();
  const [selectedItem, setSelectedItem] = useState({} as ItemModel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOrdersOpen, setIsDialogOrdersOpen] = useState(false);

  const itemsReload = useCallback(() => {
    setReload(true);
  }, [setReload]);

  const deleteItem = useCallback(
    (item: string | undefined) => {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );

      if (isConfirmed) {
        deleteItemHook(item);
        itemsReload();
      } else {
        console.error("Item not deleted");
      }
    },
    [deleteItemHook, itemsReload]
  );

  const openModal = useCallback(
    (item: ItemModel) => {
      setSelectedItem(item);
      setIsModalOpen(true);
    },
    [setSelectedItem, setIsModalOpen]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (loading || deleteLoading) return <Loader isBig={true} />;
  if (error) return <FullScreenPlaceholder />;
  return (
    <>
      <div>
        <Header
          itemsReload={itemsReload}
          isDialogOrdersOpen={isDialogOrdersOpen}
          setIsDialogOrdersOpen={setIsDialogOrdersOpen}
        />
      </div>
      <div className="App">
        <div className="items_grid">
          {items.map((item: ItemModel) => (
            <div key={item.id}>
              <Item
                setIsDialogOrdersOpen={setIsDialogOrdersOpen}
                key={item.id}
                item={item}
                deleteItem={() => deleteItem(item.id)}
                openModal={() => {
                  openModal(item);
                }}
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
