<template>
  <div class="bg-[#181818] min-h-screen lazy-css">
    <h1 class="text-3xl font-bold mb-8">Admin View</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <!-- Loading wait screen -->
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <!-- Error message -->
    <div v-else class="flex flex-wrap -mx-2">
      <!-- add new duck section -->
      <div class="my-8 p-2 w-full">
        <h2 class="text-2xl font-semibold mb-4">Add Duck</h2>
        <form @submit.prevent="addDuckHandler">
          <!-- Add duck form -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              v-model="newDuck.name"
              placeholder="Name"
              class="p-2 border rounded"
            />
            <!-- Duck name -->
            <span class="absolute text-red-500 text-xs ml-2"
              >Can't be empty</span
            >
            <!-- Error message & validate -->

            <input
              type="text"
              v-model="newDuck.aboutDuck"
              placeholder="aboutDuck"
              class="p-2 border rounded"
            />
            <!-- Duck aboutDuck -->
            <div class="p-2 border rounded">
              <span class="uppercase font-bold">Duck net worth: </span>
              <input
                type="number"
                v-model="newDuck.netWorth"
                placeholder="netWorth"
                class="pl-2"
              />
              <!-- Duck netWorth -->
            </div>
            <div class="p-2 border rounded flex items-center">
              <input
                type="checkbox"
                v-model="newDuck.isDank"
                class="border rounded w-6 h-6 mr-2"
              />
              <span class="uppercase font-bold">Cuteness in %:</span>
              <!-- Cuteness in % -->
              <input
                type="number"
                v-model="newDuck.cutenessPct"
                placeholder="Cuteness %"
                class="ml-2 pl-2"
              />
              <!-- Cuteness % -->
            </div>
            <div class="p-2 border rounded flex items-center">
              <input
                type="checkbox"
                v-model="newDuck.isHidden"
                class="p-2 border rounded w-6 h-6 mr-2"
              />
              <span class="uppercase font-bold">Hidden duck</span>
              <!-- Hidden duck -->
            </div>
            <input
              type="text"
              v-model="newDuck.imageURL"
              placeholder="Image URL"
              class="p-2 border rounded h-10"
            />
            <!-- Image URL -->
          </div>
          <button
            type="submit"
            class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Create
          </button>
        </form>
      </div>

      <!-- Edit existing ducks -->
      <div class="my-8 p-2 w-full">
        <h2 class="text-2xl font-semibold mb-4">Ducks</h2>
        <div
          class="mb-4 p-4 border rounded bg-[#181818]"
          v-for="duck in ducks"
          :key="duck._id"
        >
          <!-- Loop through the ducks -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              v-model="duck.name"
              placeholder="Name"
              class="p-2 border rounded"
            />
            <!-- Duck name -->
            <input
              type="text"
              v-model="duck.aboutDuck"
              placeholder="aboutDuck"
              class="p-2 border rounded"
            />
            <!-- Duck aboutDuck -->
            <div class="p-2 border rounded">
              <span class="uppercase font-bold">Duck net worth: </span>
              <input
                type="number"
                v-model="duck.netWorth"
                placeholder="netWorth"
                class="pl-2"
              />
              <!-- Duck netWorth -->
            </div>
            <div class="p-2 border rounded flex items-center">
              <input
                type="checkbox"
                class="border rounded w-6 h-6 mr-2"
                v-model="duck.isDank"
              />
              <span class="uppercase font-bold">Cuteness in %:</span>
              <!-- Cuteness in % -->
              <input
                type="number"
                v-model="duck.cutenessPct"
                placeholder="Cuteness %"
                class="ml-2 pl-2"
              />
              <!-- Cuteness % -->
            </div>
            <div class="p-2 border rounded flex items-center">
              <input
                type="checkbox"
                v-model="duck.isHidden"
                class="p-2 border rounded w-6 h-6 mr-2"
              />
              <span class="uppercase font-bold">Hidden duck</span>
              <!-- Hidden duck -->
            </div>
            <input
              type="text"
              v-model="duck.imageURL"
              placeholder="Image URL"
              class="p-2 border rounded h-10"
            />
            <!-- Image URL -->
            <span>
              Thumbnail img:
              <img
                :src="duck.imageURL"
                alt="Duck Image"
                class="w-full h-24 w-24 object-cover mb-4 rounded-lg"
              />
              <!-- Duck image -->
            </span>
          </div>

          <div class="mt-4 flex space-x-2">
            <!-- Update and delete buttons -->
            <p>ID:</p>
            <!-- Duck ID for testing -->
            <button
              @click="deleteDuck(duck._id)"
              class="bg-red-600 text-white p-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
            <!-- Delete button -->
            <button
              @click="updateDuckHandler(duck)"
              class="bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Edit
            </button>
            <!-- Edit button -->
          </div>
        </div>
      </div>
    </div>
    <!-- Custom confirmation dialog -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useDucks } from "@/modules/useDucks";
import type { Duck } from "@/interfaces/interfaces";

const {
  ducks,
  error,
  loading,
  fetchDucks,
  deleteDuck,
  addDuck,
  getTokenAndUserId,
  updateDuck,
} = useDucks();

onMounted(() => {
  fetchDucks();
});

const newDuck = ref({
  name: "",
  aboutDuck: "",
  netWorth: 0,
  isDank: false,
  cutenessPct: 0,
  isHidden: false,
  imageURL: "",
  _createdBy: "",
});

const addDuckHandler = async () => {
  const { userId } = getTokenAndUserId(); // import the userId from the useDucks module
  newDuck.value._createdBy = userId; // set the userId to the new duck
  await addDuck(newDuck.value);
  newDuck.value = {
    ...newDuck.value,
  };
};

const updateDuckHandler = async (duck: Duck) => {
  const updatedDuck = {
    name: duck.name,
    aboutDuck: duck.aboutDuck,
    imageURL: duck.imageURL,
    netWorth: duck.netWorth,
    isDank: duck.isDank,
    cutenessPct: duck.cutenessPct,
    isHidden: duck.isHidden,
  };
  await updateDuck(duck._id, updatedDuck);
};
</script>

<style scoped>
input {
  background-color: #2b2b2b;
}

.lazy-css {
  color: #969696;
}

input[type="checkbox"] {
  accent-color: var(--input-field-color);
}
</style>
