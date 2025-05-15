<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Checkout Section</h2>
    <p v-if="pond.length === 0" class="text-center pt-5">
      Items have been ordered <br />
      You have no orders currently
    </p>
    <!-- If pond is empty -->
    <div v-else>
      <!-- If pond is not empty -->
      <div
        v-for="item in pond"
        :key="item._id"
        class="flex items-center mb-4 border-b pb-4"
      >
        <!-- Loop through the pond items -->
        <!-- First Column: Image -->
        <div class="w-1/6">
          <img
            :src="item.imageURL"
            alt="Duck Image"
            class="w-full h-24 object-cover rounded-lg"
          />
          <!-- Duck image -->
        </div>
        <!-- Second Column: Title and Description -->
        <div class="w-2/6 px-4">
          <p class="font-semibold">{{ item.name }}</p>
          <!-- Duck name -->
          <!--  <p class="text-gray-500">{{ item.description }}</p> -->
        </div>
        <!-- Third Column: Quantity with + and - -->
        <div class="w-2/6 flex items-center">
          <button
            @click="updateQuantity(item._id, item.quantity - 1)"
            class="bg-orange-600 px-2"
          >
            -
          </button>
          <!-- Decrease quantity -->
          <span class="mx-2">{{ item.quantity }}</span>
          <!-- Quantity -->
          <button
            @click="updateQuantity(item._id, item.quantity + 1)"
            class="bg-teal-600 px-2"
          >
            +
          </button>
          <!-- Increase quantity -->
        </div>
        <!-- Fourth Column: Total netWorth -->
        <div class="w-1/6 text-right">
          <p class="font-semibold">
            $ {{ pondTotalIndividualDuck(item._id).toFixed(2) }}
          </p>
          <!-- Total netWorth of the duck with .toFixed() -->
        </div>
      </div>

      <!-- Summary Row -->
      <div class="mt-4 pt-4">
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Subtotal:</p>
          <p>$ {{ pondTotal() }}</p>
          <!-- Total in the pond -->
        </div>
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Sales Tax:</p>
          <p>$ {{ salesTax() }}</p>
          <!-- Salestax in the pond -->
        </div>
        <div class="flex justify-between mb-2">
          <p class="font-semibold">Coupon Code:</p>
          <input
            v-model="code"
            type="text"
            class="border p-1 pr-2 bg-[#181818] text-right w-28"
            placeholder="Enter code"
          />
          <!-- Coupon code -->
        </div>
        <div class="flex justify-between mb-4">
          <p class="font-semibold">Grand Total:</p>
          <p>$ {{ grandTotal() }}</p>
          <!-- Grand total in the pond -->
        </div>
        <div class="flex justify-end">
          <button
            @click="checkOutBuy"
            class="bg-orange-600 text-white p-2 rounded hover:bg-orange-700"
          >
            Buy Now
          </button>
          <!-- Checkout button on click -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePond } from "@/modules/pond/usePond";
//import { RouterLink } from "vue-router";

const {
  pond,
  updateQuantity,
  pondTotal,
  pondTotalIndividualDuck,
  salesTax,
  grandTotal,
  code,
  checkOutBuy,
} = usePond();
</script>

<style scoped>
/* Add your styles here */
</style>
