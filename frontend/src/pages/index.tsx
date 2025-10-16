import { useCallback, useState } from "react";
import { useItems } from "../hooks/useItems";
import { useUsers } from "../hooks/useUsers";
import useOrders from "../hooks/useOrders";
import useDeleteItem from "../hooks/useDeleteItem";
import Item from "../components/item";
import Header from "../components/header";
import FullScreenPlaceholder from "../components/fullScreenPlaceholder";
import ItemDetails from "../components/itemDetails";
import { ItemModel } from "../models/item";
import Loader from "../components/loader";
import { useAuth } from "../context/";
import Table from "../components/table";
import Footer from "../components/footer";

const ItemsList = () => {
  const { items, loading, error, setReload } = useItems();
  const { users } = useUsers();
  const { deleteItem: deleteItemHook, loading: deleteLoading } =
    useDeleteItem();
  const [selectedItem, setSelectedItem] = useState({} as ItemModel);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOrdersOpen, setIsDialogOrdersOpen] = useState(false);
  const { allOrders } = useOrders();
  const { user } = useAuth();

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
  return user && user.role === "admin" ? (
    <>
      <div>
        <Header
          itemsReload={itemsReload}
          isDialogOrdersOpen={isDialogOrdersOpen}
          setIsDialogOrdersOpen={setIsDialogOrdersOpen}
        />
      </div>
      <h1>Items Table</h1>
      <div className="admin_table">
        <Table
          data={items}
          columns={["id", "name", "price", "description"]}
          deleteItem={(id) => deleteItem(id)}
        />
      </div>
      <h1>Users Table</h1>
      <div className="admin_table">
        <Table
          data={users}
          columns={["id", "first_name", "last_name", "role", "email"]}
        />
      </div>
      <h1>Orders Table</h1>
      <div className="admin_table">
        <Table data={allOrders} columns={["id", "user_id", "amount"]} />
      </div>

      <Footer />
    </>
  ) : (
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
      <Footer />
    </>
  );
};

export default ItemsList;
