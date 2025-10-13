import React from "react";
import "./index.css";
import { ItemModel } from "../../models/item";
interface ItemDetailsProps {
  item: ItemModel;
  isOpen: boolean;
  onClose: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <div className="modal-body">
          <h2>{item.name}</h2>
          <img src={item.image_url} alt={item.name} className="modal-image" />
          <p>{item.description}</p>
          <p>
            <strong>Price: </strong>
            {item.price} USD
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
