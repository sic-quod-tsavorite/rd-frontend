import { ref, watch } from "vue";
import type { PondItem, OrderItems } from "@/interfaces/interfaces";

export const usePond = () => {
  const pond = ref<PondItem[]>(
    JSON.parse(localStorage.getItem("pond") || "[]")
  );

  const addToPond = (duck: Omit<PondItem, "quantity">) => {
    const existingItem = pond.value.find((item) => item._id === duck._id);
    if (existingItem) {
      existingItem.quantity += 1;
      console.log("Updated existing item in pond", existingItem);
    } else {
      pond.value.push({ ...duck, quantity: 1 });
      console.log("Added new item to pond", pond.value);
    }
    localStorage.setItem("pond", JSON.stringify(pond.value));
    console.log("Added to pond: ", pond.value);
  };

  const removeFromPond = (duckId: string) => {
    const existingItem = pond.value.find((item) => item._id === duckId);
    if (existingItem) {
      pond.value = pond.value.filter((item) => item._id !== duckId);
      localStorage.setItem("pond", JSON.stringify(pond.value));
    }
  };

  const updateQuantity = (duckId: string, quantity: number) => {
    const item = pond.value.find((item) => item._id === duckId);
    localStorage.setItem("pond", JSON.stringify(pond.value));
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        removeFromPond(duckId);
      } else {
        localStorage.setItem("pond", JSON.stringify(pond.value));
      }
    }
    console.log(`Updated quantity: ${duckId}, Quantity: ${quantity}`);
  };

  const pondTotal = (): number => {
    return Number(
      pond.value
        .reduce((acc, item) => acc + item.netWorth * item.quantity, 0)
        .toFixed(2)
    );
  };

  const pondTotalIndividualDuck = (duckId: string) => {
    const item = pond.value.find((item) => item._id === duckId);
    return item ? item.netWorth * item.quantity : 0;
  };

  const salesTax = (): number => {
    const taxRates = 0.25;
    return Math.round(pondTotal() * taxRates * 100) / 100;
  };

  const code = ref<string>("");

  const couponCodeDiscount = (codes: string) => {
    const couponCodeAccepted = codes === "DISCOUNT";
    return couponCodeAccepted ? 0.9 : 1;
  };

  const grandTotal = (): number => {
    return Number(
      ((pondTotal() + salesTax()) * couponCodeDiscount(code.value)).toFixed(2)
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
      total: pondTotal(),
      orderStatus: "Pending",
      orderNumber: orders.value.length + 1,
      userName: localStorage.getItem("userName") || "Anon",
      orderLine: pond.value.map((item) => ({
        duck: {
          _id: item._id,
          name: item.name,
          aboutDuck: "",
          netWorth: item.netWorth,
          imageURL: item.imageURL,
          isDank: false,
          cutenessPct: 0,
          isHidden: false,
          _createdBy: "",
        },
        quantity: item.quantity,
      })),
    };
    orders.value.push(newOrder);
    pond.value = [];
    localStorage.setItem("pond", JSON.stringify(pond.value));
    console.log("Order placed", orders.value);
    localStorage.setItem("orders", JSON.stringify(orders.value));
  };

  return {
    pond,
    addToPond,
    removeFromPond,
    updateQuantity,
    pondTotal,
    pondTotalIndividualDuck,
    salesTax,
    code,
    grandTotal,
    orders,
    checkOutBuy,
  };
};
