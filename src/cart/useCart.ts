import { useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  priceEth: string;
  imageUrl: string;
  quantity: number;
}

const STORAGE_KEY = "kurio-cart";

function loadCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    return JSON.parse(savedCart) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  function updateItems(update: (items: CartItem[]) => CartItem[]) {
    setItems((current) => {
      const next = update(current);
      saveCart(next);

      return next;
    });
  }

  function addItem(item: Omit<CartItem, "quantity">, quantity: number) {
    updateItems((current) => {
      const existing = current.find(
        (currentItem) => currentItem.id === item.id,
      );

      if (!existing) {
        return [...current, { ...item, quantity }];
      }

      return current.map((currentItem) =>
        currentItem.id === item.id
          ? {
            ...currentItem,
            quantity: currentItem.quantity + quantity,
          }
          : currentItem,
      );
    });
  }

  function increaseQuantity(id: string) {
    updateItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  function decreaseQuantity(id: string) {
    updateItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  }

  function removeItem(id: string) {
    updateItems((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    updateItems(() => []);
  }

  return {
    items,
    addItem,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  };
}
