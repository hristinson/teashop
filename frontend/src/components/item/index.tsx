import React from "react";
import { ItemProps } from "../../models/item";

const Item: React.FC<ItemProps> = (props) => {
  const { item } = props;

  return (
    <div className="item">
      <div className="item-image">
        <img
          src={item.image_url ? item.image_url : "https://placehold.co/300x300"}
          alt={item.name || "Item"}
          className="item-img"
        />
      </div>
      <div className="item-info">
        <h3 className="item-title">{item.name}</h3>
        <p className="item-price">{item.price}</p>
      </div>
    </div>
  );
};

export default Item;
