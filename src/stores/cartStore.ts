import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("totalCartItems") || '[]'),
    itemsToBuy: JSON.parse(localStorage.getItem("cart")  || '[]')
  }),

  getters: {
    allItems: (state) => {
      return state.itemsToBuy
    },
  },
  actions: {
    clearCart() {
      this.items = []
      this.itemsToBuy = []
      localStorage.removeItem("totalCartItems")
      localStorage.removeItem("cart")
    }
  }
});
