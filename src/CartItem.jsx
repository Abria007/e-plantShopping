import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../features/CartSlice";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // 🧮 Calculate total cost
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.quantity * parseFloat(item.cost), 0)
      .toFixed(2);
  };

  // 🧮 Subtotal for one item
  const calculateItemSubtotal = (item) => {
    return (item.quantity * parseFloat(item.cost)).toFixed(2);
  };

  // ➕➖ Quantity handlers
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ❌ Remove button
  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  // 🔁 Go back to product list
  const handleContinueShopping = () => {
    navigate("/products"); // or your route name
  };

  // ✅ Checkout dummy
  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  return (
    <div className="cart-items-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item-card">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
                width="120"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Cost: ₹{item.cost}</p>
                <p>Subtotal: ₹{calculateItemSubtotal(item)}</p>

                <div className="cart-quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <button onClick={() => handleRemove(item.name)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ₹{calculateTotalAmount()}</h3>
          </div>

          <div className="cart-actions">
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItems;