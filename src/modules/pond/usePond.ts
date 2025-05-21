import { ref, watch } from "vue";
import type { CartItem, OrderItems } from "@/interfaces/interfaces";

export const useCart = () => {
  const cart = ref<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const addToCart = (duck: Omit<CartItem, "quantity">) => {
    const existingItem = cart.value.find((item) => item._id === duck._id);
    if (existingItem) {
      existingItem.quantity += 1;
      console.log("Updated existing item in cart", existingItem);
    } else {
      cart.value.push({ ...duck, quantity: 1 });
      console.log("Added new item to cart", cart.value);
    }
    localStorage.setItem("cart", JSON.stringify(cart.value));
    console.log("Added to cart: ", cart.value);
  };

  const removeFromCart = (duckId: string) => {
    const existingItem = cart.value.find((item) => item._id === duckId);
    if (existingItem) {
      cart.value = cart.value.filter((item) => item._id !== duckId);
      localStorage.setItem("cart", JSON.stringify(cart.value));
    }
  };

  const updateQuantity = (duckId: string, quantity: number) => {
    const item = cart.value.find((item) => item._id === duckId);
    localStorage.setItem("cart", JSON.stringify(cart.value));
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromCart(duckId);
      } else {
        localStorage.setItem("cart", JSON.stringify(cart.value));
      }
    }
    console.log(`Updated quantity: ${duckId}, Quantity: ${quantity}`);
  };

  const cartTotal = (): number => {
    return Number(
      cart.value
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2)
    );
  };

  const cartTotalIndividualDuck = (duckId: string) => {
    const item = cart.value.find((item) => item._id === duckId);
    return item ? item.price * item.quantity : 0;
  };

  const salesTax = (): number => {
    const taxRates = 0.25;
    return Math.round(cartTotal() * taxRates * 100) / 100;
  };

  const code = ref<string>("");

  const couponCodeDiscount = (codes: string) => {
    const couponCodeAccepted = codes === "DISCOUNT";
    return couponCodeAccepted ? 0.9 : 1;
  };

  const grandTotal = (): number => {
    return Number(
      ((cartTotal() + salesTax()) * couponCodeDiscount(code.value)).toFixed(2)
    );
  };

  const orders = ref<OrderItems[]>(
    JSON.parse(localStorage.getItem("orders") || "[]")
  );

  watch(
    orders,
    (newOrders) => {
      localStorage.setItem("orders", JSON.stringify(newOrders));
    },
    { deep: true }
  );

  const checkOutBuy = () => {
    const newOrder: OrderItems = {
      _id: `order${orders.value.length + 1}`,
      orderDate: new Date().toISOString(),
      total: cartTotal(),
      orderStatus: "Pending",
      orderNumber: orders.value.length + 1,
      userName: localStorage.getItem("userName") || "Anon",
      orderLine: cart.value.map((item) => ({
        duck: {
          _id: item._id,
          name: item.name,
          description: "",
          price: item.price,
          imageURL: item.imageURL,
          onSale: false,
          discountPct: 0,
          isHidden: false,
          _createdBy: "",
        },
        quantity: item.quantity,
      })),
    };
    orders.value.push(newOrder);
    cart.value = [];
    localStorage.setItem("cart", JSON.stringify(cart.value));
    console.log("Order placed", orders.value);
    localStorage.setItem("orders", JSON.stringify(orders.value));
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartTotalIndividualDuck,
    salesTax,
    code,
    grandTotal,
    orders,
    checkOutBuy,
  };
};
