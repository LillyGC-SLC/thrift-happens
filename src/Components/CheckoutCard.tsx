import type { CheckoutItem } from "./ThriftHappensApp";

// Lilly Grant Cochrane
// Web Development Project #1

export interface CheckoutCardProps extends CheckoutItem
{
  handleRemoveFromCart: (checkoutItem: CheckoutItem) => void;
}

export default function CheckoutCard({
  id,
  image,
  product,
  price,
  itemQuantity,
  total,
  handleRemoveFromCart,
}: CheckoutCardProps) {
  return (
    <div className="CheckoutCard">
      <img src={image} alt="" width="50px" height="50px"></img>
      <h2>{product}</h2>
      <p>Quantity: {itemQuantity}</p>
      <p>Price: {price.toFixed(2)}$</p>
      <p>Subtotal: {total.toFixed(2)}$</p>
      <button onClick={() => handleRemoveFromCart({ id, image, product, price, itemQuantity, total,})}>Remove</button>
    </div>
  );
}