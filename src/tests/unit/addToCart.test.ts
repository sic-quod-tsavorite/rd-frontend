import { describe, it, expect, beforeEach, vi } from "vitest";
import { useCart } from "../../modules/pond/usePond";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const duck = {
  _id: "6830484156df2033d7e030ab",
  name: "Duck #1 (made by Bender)",
  description: "Chunky",
  imageURL: "https://i.pinimg.com/736x/de/9a/11/de9a11ca199ebd5bb05f99ca5897dfaa.jpg",
  price: 20000,
  onSale: true,
  discountPct: 35,
  isHidden: false,
  _createdBy: "6830484156df2033d7e030a6",
  __v: 0,
};

describe("Cart functionality", () => {
  let cartApi: ReturnType<typeof useCart>;

  beforeEach(() => {
    window.localStorage.clear();
    cartApi = useCart();
  });

  it("Add an item to the cart", () => {
    cartApi.addToCart(duck);
    expect(cartApi.cart.value.length).toBe(1);
    expect(cartApi.cart.value[0]._id).toBe(duck._id);
    expect(cartApi.cart.value[0].quantity).toBe(1);
  });

  it("Increment the quantity", () => {
    cartApi.addToCart(duck);
    cartApi.addToCart(duck);
    expect(cartApi.cart.value.length).toBe(1);
    expect(cartApi.cart.value[0].quantity).toBe(2);
  });

  it("Remove the item from the cart", () => {
    cartApi.addToCart(duck);
    cartApi.removeFromCart(duck._id);
    expect(cartApi.cart.value.length).toBe(0);
  });
});