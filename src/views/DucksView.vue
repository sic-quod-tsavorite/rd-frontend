<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-4">Ducks</h2>
    <div v-if="loading" class="text-center">Loading...</div>
    <!-- Loading wait screen with v-if -->

    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <!-- Error message with v-else-if -->

    <div v-else class="flex flex-wrap -mx-2">
      <!-- Loop through the ducks -->
      <div
        v-for="duck in ducks"
        :key="duck._id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
      >
        <!-- Duck card with v-for -->
        <div class="bg-white p-4 rounded-lg shadow-md">
          <img
            :src="duck.imageURL"
            alt="Duck Image"
            class="w-full h-48 object-cover mb-4 rounded-lg"
          />
          <!-- Duck image -->
          <h3 class="text-lg text-gray-700 font-semibold mb-2">
            {{ duck.name }}
          </h3>
          <!-- Duck name -->
          <p class="text-gray-700">{{ duck.aboutDuck }}</p>
          <!-- About Duck -->
          <p class="text-blue-500 font-bold mt-2">{{ duck.netWorth }}</p>
          <!-- Duck net worth -->
          <div class="flex justify-between mt-4">
            <router-link
              :to="`ducks/${duck._id}`"
              class="bg-blue-500 text-white px-1 py-2 rounded hover:bg-blue-600"
            >
              Duck Details
            </router-link>
            <button
              @click="addToPond(duck)"
              class="bg-green-500 text-white px-1 py-2 rounded hover:bg-green-600"
            >
              Add to Pond
            </button>
            <!-- Add to pond button -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useDucks } from "../modules/useDucks";
import { usePond } from "@/modules/pond/usePond";

const { addToPond } = usePond();

const { ducks, fetchDucks, error, loading } = useDucks();

onMounted(() => {
  fetchDucks();
});
</script>

<style scoped></style>
