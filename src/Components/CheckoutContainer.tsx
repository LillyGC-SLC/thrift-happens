import type { CheckoutItem } from "./ThriftHappensApp";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  checkoutData: CheckoutItem[];
  handleRemoveFromCart: (cartItem: CheckoutItem) => void;
  handleClearCart: () => void;
}

export default function CheckoutContainer({ checkoutData, handleRemoveFromCart, handleClearCart }: CheckoutContainerProps) {
  return (
    <div className="CheckoutContainer">
      {checkoutData.map((item) => (
        <CheckoutCard key={item.id} {...item} handleRemoveFromCart={handleRemoveFromCart}/>
      ))}

      <h2>
        {checkoutData.length > 0
          ? `Cart Total: ${checkoutData.reduce((acc, item) => acc + item.total, 0).toFixed(2)}`
          : "Cart is empty"}
      </h2>
      <button onClick={() => { handleClearCart() }} disabled={checkoutData.length <= 0 ? true: false}>Empty Cart</button>
    </div>
  );
}
