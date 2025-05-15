<template>
  <div v-if="duck && duck.length > 0" class="flex flex-wrap">
    <div class="w-1/2 p-4">
      <img
        class="w-full rounded-lg object-cover h-full"
        :src="duck[0].imageURL"
        alt=""
      />
    </div>
    <div class="w-1/2 p-4">
      <h2 class="text-2xl font-bold mb-4">{{ duck[0].name }}</h2>
      <p class="text-slate-200 mb-4">{{ duck[0].aboutDuck }}</p>
    </div>
  </div>
  <div v-else>Loading duck details...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDucks } from "../modules/useDucks";
import type { Duck } from "../interfaces/interfaces";

const route = useRoute();
const duck = ref<Duck[] | null>(null);

const { fetchDuckById } = useDucks();

onMounted(async () => {
  const duckId = route.params.id as string;
  const fetchedDuck = await fetchDuckById(duckId);
  console.log("fetched duck: ", fetchedDuck);
  duck.value = fetchedDuck;
  console.log("duck: ", duck.value);
});
</script>

<style></style>
