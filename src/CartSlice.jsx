import { createSlice } from "@reduxjs/toolkit";

// Initial state: an array of items (each with name, image, cost, quantity)
const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 🔹 Adds a new plant or increments quantity if it exists
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // 🔹 Removes a plant from cart by name
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // 🔹 Updates the quantity of a specific plant
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  }
});

// 🔁 Export action creators for use in components
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// 🧠 Export reducer to plug into store.js
export default cartSlice.reducer;