<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ message }}</p>

    <p data-testid="count">Count: {{ count }}</p>
    <button @click="increase" data-testid="increase">+</button>
    <button @click="decrease" data-testid="decrease">-</button>
    <button @click="reset" data-testid="reset">x</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref<string>("hiii");
const count = ref<number>(0);

const increase = () => {
  count.value++;
};
const decrease = () => {
  count.value--;
};
const reset = () => {
  count.value = 0;
};
</script>

<style>
@media (width < 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
