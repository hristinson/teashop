import { useState } from "react";
import { ItemProps } from "../../models/item";
import Loader from "../../components/loader";
import noImage from "../../assets/noImage.jpeg";
import { useAuth } from "../../context";
import "./index.css";
import useOrders from "../../hooks/useOrders";

const Item: React.FC<ItemProps> = (props) => {
  const { item, deleteItem, openModal } = props;
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { createOrder } = useOrders();

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="item">
      <div className="item_image">
        <img
          src={item.image_url ? item.image_url : noImage}
          alt={item.name || "Item"}
          className="item_img"
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={openModal}
        />
      </div>
      {isLoading ? <Loader isBig={false} /> : null}
      {hasError ? <>Error loading</> : null}
      <div className="item_info">
        <h3 className="item_title">{item.name}</h3>
        <p className="item_price">{item.price}</p>
        {user && user.role === "admin" ? (
          <button className="item_delete_button" onClick={deleteItem}>
            X
          </button>
        ) : null}
        {user && user.role !== "admin" ? (
          <button
            className="item_buy_button"
            onClick={() => {
              createOrder(item.id, 1);
            }}
          >
            Add to Basket
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Item;
