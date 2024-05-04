import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

const decreaseCartItem = (cartItems, productToDecrease) => {
  const existingMultipleCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToDecrease.id && cartItem.quantity > 1
  );

  if (existingMultipleCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToDecrease.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }

  return clearCartItem(cartItems, productToDecrease);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);

  useEffect(() => {
    const updatedCartCount = cartItems.reduce(
      (sum, currentItem) => sum + currentItem.quantity,
      0
    );

    setCartCount(updatedCartCount);
  }, [cartItems]);

  useEffect(() => {
    const updatedCartTotal = cartItems.reduce(
      (sum, currentItem) => sum + currentItem.quantity * currentItem.price,
      0
    );

    setCartTotal(updatedCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const clearItemFromCart = (productToRemove) => {
    setCartItems(clearCartItem(cartItems, productToRemove));
  };

  const decreaseItemInCart = (productToDecrease) => {
    setCartItems(decreaseCartItem(cartItems, productToDecrease));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    clearItemFromCart,
    decreaseItemInCart,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
