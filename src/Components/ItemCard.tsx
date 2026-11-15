import type { ClothingProduct } from "../data/data";
import type { ItemInfo } from "./ThriftHappensApp";
import type { CheckoutItem } from "./ThriftHappensApp";

interface ItemCardProps extends ClothingProduct {
  itemInfo: ItemInfo;
  handleQuantityAdjust: (delta: number) => void;
  handleAddToCart: (checkoutItem: CheckoutItem) => void;
}

export default function ItemCard({
  image,
  name,
  fit,
  category,
  color,
  description,
  size,
  itemInfo,
  handleQuantityAdjust,
  handleAddToCart,
}: ItemCardProps) {
  return (
    <div className="ItemCard">
      <img src={image} alt="" height="100px"></img>
      <h2>{name}</h2>
      <p>Fit: {fit}</p>
      <p>Category: {category}</p>
      <p>Color: {color}</p>
      <p>{description}</p>
      <p>Size: {size}</p>
      <p>Price: ${itemInfo.price.toFixed(2)}</p>
      <p>
        {itemInfo.quantity > 0
          ? `Quantity: ${itemInfo.quantity}`
          : "Out of stock"}
      </p>
      <button onClick={() => handleQuantityAdjust(-1)} disabled={itemInfo.itemQuantity <= 0 ? true : false}>{" - "}</button>
      <span>{itemInfo.itemQuantity}</span>
      <button onClick={() => handleQuantityAdjust(1)} disabled={itemInfo.itemQuantity >= itemInfo.quantity ? true : false}>{" + "}</button>
      <button
        onClick={() => {
          if (
            itemInfo.itemQuantity <= 0 ||
            itemInfo.itemQuantity > itemInfo.quantity
          ) {
            return;
          }
          handleAddToCart({
            id: crypto.randomUUID(),
            image: itemInfo.image,
            product: name,
            price: itemInfo.price,
            itemQuantity: itemInfo.itemQuantity,
            total: itemInfo.itemQuantity * itemInfo.price,
          });
        }} disabled = {itemInfo.quantity > 0 || itemInfo.itemQuantity < itemInfo.quantity ? false : true}
      >
        Add to Cart
      </button>
    </div>
  );
}
