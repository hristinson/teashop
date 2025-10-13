import { useState } from "react";
import { ItemProps } from "../../models/item";
import Loader from "../../components/loader";
import "./index.css";

const Item: React.FC<ItemProps> = (props) => {
  const { item, deleteItem } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
          src={item.image_url ? item.image_url : "https://placehold.co/300x300"}
          alt={item.name || "Item"}
          className="item_img"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      {isLoading ? <Loader isBig={false} /> : null}
      {hasError ? <>Error loading</> : null}
      <div className="item_info">
        <h3 className="item_title">{item.name}</h3>
        <p className="item_price">{item.price}</p>
        <button className="item_delete_button" onClick={deleteItem}>
          X
        </button>
      </div>
    </div>
  );
};

export default Item;
