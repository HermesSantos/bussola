import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("totalCartItems")) as any[],
    itemsToBuy: JSON.parse(localStorage.getItem("cart")) as any[]
  }),

  getters: {
    allItems: (state) => {
      return state.itemsToBuy
    },
  },
});
