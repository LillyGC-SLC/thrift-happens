import type { ClothingProduct } from "../data/data";
import type { ItemInfo } from "./ThriftHappensApp";
import type { CheckoutItem } from "./ThriftHappensApp";

// Lilly Grant Cochrane
// Web Development Project #1

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
      {
        // Disables the '-' button if the selected amount is less than or equal to 0.
        // Disables the '+' button if the selected amount is greater than or equal to the item's stock quantity.
        // Note: I probably could've gotten away with just saying selected amount === 0 or selected amount === stock quantity,
        // but I chose to do it this way just in case some crazy glitch or something happened on the user's end.
      }
      <button onClick={() => handleQuantityAdjust(-1)} disabled={itemInfo.itemQuantity <= 0 ? true : false}>{" - "}</button>
      <span>{itemInfo.itemQuantity}</span>
      <button onClick={() => handleQuantityAdjust(1)} disabled={itemInfo.itemQuantity >= itemInfo.quantity ? true : false}>{" + "}</button>
      {
        // Disables the Add to Cart button if an item is out of stock.
      }
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
