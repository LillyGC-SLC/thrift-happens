import type { ClothingProduct } from "../data/data";
import CheckoutContainer from "./CheckoutContainer";
import ItemsContainer from "./ItemsContainer";
import { useState } from "react";

interface ItemData {
  data: ClothingProduct[];
}
export interface ItemInfo {
  id: number;
  image: string;
  name: string;
  quantity: number;
  itemQuantity: number;
  price: number;
}

export interface CheckoutItem {
  id: string;
  image: string;
  product: string;
  itemQuantity: number;
  price: number;
  total: number;
}

export default function ThriftHappensApp({ data }: ItemData) {
  const [itemInfo, setItemInfo] = useState<ItemInfo[]>(() =>
    data.map((product) => ({
      id: product.id,
      image: product.image,
      name: product.name,
      quantity: product.quantity,
      itemQuantity: product.itemQuantity,
      price: product.price,
    })),
  );

  const [cartItems, setCartItems] = useState<CheckoutItem[]>([]);

  function handleAdjustQuantity(id: number, delta: number) {
    setItemInfo((prevData) =>
      prevData.map((info) => {
        if (info.id === id) {
          const newSelected = Math.max(0, info.itemQuantity + delta);
          const clampedSelected = Math.min(newSelected, info.quantity);
          return { ...info, itemQuantity: clampedSelected };
        }
        return info;
      }),
    );
  }

  function handleAddToCart(checkoutItem: CheckoutItem) {
    // Removes from the stock quantity the amount that the user would like to purchase.
    setItemInfo((prevData) =>
      prevData.map((info) =>
        info.name === checkoutItem.product
          ? {
              ...info,
              quantity: info.quantity - checkoutItem.itemQuantity,
              itemQuantity: 0,
            }
          : info,
      ),
    );
    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product === checkoutItem.product,
      );

      // If the item already exists in the shopping cart, replace the entry in the array with an updated one with the
      // correct quantity instead of adding it as a seperate entry.
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        const existingItem = prevCart[existingIndex];
        const newQuantity =
          existingItem.itemQuantity + checkoutItem.itemQuantity;
        updatedCart[existingIndex] = {
          ...existingItem,
          itemQuantity: newQuantity,
          total: newQuantity * existingItem.price,
        };
        return updatedCart;
      } else {
        return [...prevCart, checkoutItem];
      }
    });
  }

  function handleRemoveFromCart(checkoutItem: CheckoutItem) {
    // Adds whatever the purchase quantity was before removal to the original item's stock quantity.
    setItemInfo((prevData) =>
      prevData.map((info) =>
        info.name === checkoutItem.product
          ? {
              ...info,
              quantity: info.quantity + checkoutItem.itemQuantity,
            }
          : info,
      ),
    );

    // Creates a new cart array without the deleted item.
    setCartItems((prevCart) =>
      prevCart.filter((entry) => entry.id !== checkoutItem.id),
    );
  }

  function handleClearCart() {
    // Deletes all cart items from the array and resets product stock quantity values back to their defaults.
    setCartItems([]);
    setItemInfo(() => data.map((product) => 
    ({
      ...product,
      quantity: product.quantity,
    })));
  }

  return (
    <div className="AppLayout">
      <ItemsContainer
        data={data}
        itemInfo={itemInfo}
        handleAdjustQuantity={handleAdjustQuantity}
        handleAddToCart={handleAddToCart}
      />
      <CheckoutContainer
        checkoutData={cartItems}
        handleRemoveFromCart={handleRemoveFromCart}
        handleClearCart={handleClearCart}
      />
    </div>
  );
}
