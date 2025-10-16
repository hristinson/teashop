import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context";
import axios from "axios";
import { useDeleteOrder } from "../../hooks/useDeleteOrder";
import useDragging from "../../hooks/useDragging";
import "./index.css";

type Order = {
  id: number;
  amount: number;
  createdAt: string;
  orders_descriptions: Record<string, any>;
};

const URL = process.env.REACT_APP_API_URL;
interface OrdersDialogInterface {
  showModal: boolean;
  closeModal: () => void;
}

const OrdersDialog: React.FC<OrdersDialogInterface> = ({
  showModal,
  closeModal,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dragProps = useDragging(dialogRef, true);
  const { user } = useAuth();
  const { deleteOrder } = useDeleteOrder();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmed) return;

    const success = await deleteOrder(id);
    if (success) {
      closeModal();
    }
  };

  useEffect(() => {
    if (showModal && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      const fetchOrders = async () => {
        if (user) {
          try {
            const response = await axios.get(`${URL}/users/${user.id}/orders`);
            setOrders(response.data);
          } catch (err) {
          } finally {
          }
        }
      };

      fetchOrders();
    }
  }, [user, showModal]);

  return (
    <dialog
      ref={dialogRef}
      id="orders-dialog"
      className="dialog"
      {...dragProps}
    >
      <button className="close-btn" onClick={closeModal}>
        X
      </button>
      <h2 className="dialog-title">List of Orders</h2>

      <ul className="order-list">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Item name</th>
              <th>Item price</th>
              <th>quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>
                    {order.orders_descriptions[0] &&
                      order.orders_descriptions[0].item.name}
                  </td>
                  <td>
                    {order.orders_descriptions[0] &&
                      order.orders_descriptions[0].item.price}
                  </td>
                  <td>
                    {order.orders_descriptions[0] &&
                      order.orders_descriptions[0].quantity}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(order.id)}>X</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </ul>
    </dialog>
  );
};

export default OrdersDialog;
