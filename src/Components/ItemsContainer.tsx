import type { ClothingProduct } from "../data/data";
import type { ItemInfo } from "./ThriftHappensApp";
import type { CheckoutItem } from "./ThriftHappensApp";
import ItemCard from "./ItemCard";

// Lilly Grant Cochrane
// Web Development Project #1

interface ItemsContainerProps {
  data: ClothingProduct[];
  itemInfo: ItemInfo[];
  handleAdjustQuantity: (id: number, delta: number) => void;
  handleAddToCart: (cartItem: CheckoutItem) => void;
}

export default function ItemsContainer({
  data,
  itemInfo,
  handleAdjustQuantity,
  handleAddToCart,
}: ItemsContainerProps) 
{
    return (
        <div className="ItemsContainer">
            {data.map((product) => {
                const info = itemInfo.find((info) => info.id === product.id);
                if (!info) return null;
                return (
                    <ItemCard
                        key={product.id}
                        {...product}
                        itemInfo = {info}
                        handleQuantityAdjust={(delta) =>
                            handleAdjustQuantity(product.id, delta)
                        }
                        handleAddToCart={handleAddToCart}
                    />
                );
            })}
        </div>
    )
}
