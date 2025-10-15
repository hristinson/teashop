import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context";
import axios from "axios";

type Order = {
  id: number;
  amount: number;
  createdAt: string;
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
  const { user } = useAuth();

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
    <dialog ref={dialogRef} id="orders-dialog" className="dialog">
      <button className="close-btn" onClick={closeModal}>
        X
      </button>
      <h2 className="dialog-title">List of Orders</h2>

      <ul className="order-list">
        {orders.map((order) => {
          return (
            <li key={order.id} className="order-item">
              <span className="order-amount">${order.amount}</span>
              <span className="order-date">{order.createdAt}</span>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
};

export default OrdersDialog;
