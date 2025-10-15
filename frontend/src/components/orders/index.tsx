import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context";
import axios from "axios";
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
        <table className="orders-table">
          <thead>
            <tr>
              <th>Item name</th>
              <th>Item price</th>
              <th>quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.orders_descriptions[0].item.name}</td>
                  <td>{order.orders_descriptions[0].item.price}</td>
                  <td>{order.orders_descriptions[0].quantity}</td>
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
