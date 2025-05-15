<template class="w-screen">
  <header class="text-white py-4">
    <div class="wrapper">
      <nav class="">
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/about" class="mr-4">About</RouterLink>
        <RouterLink to="/ducks" class="mr-4">Ducks</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/auth" class="mr-4"
          >Login</RouterLink
        >
        <RouterLink v-if="isLoggedIn" to="/admin" class="mr-4">
          Admin
        </RouterLink>
        <button v-if="isLoggedIn" @click="logout" class="mr-4">Logout</button>

        <!-- RouterLink to ducks, Auth, Admin & and logout button -->

        <!-- toggle pond button -->
        <button @click="togglePond" class="mr-4">Pond</button>

        <!-- Routerlink to orders -->
        <RouterLink v-if="isLoggedIn" to="/orders" class="mr-4">
          Orders
        </RouterLink>
      </nav>
    </div>
  </header>
  <div class="px-4">
    <RouterView />
  </div>

  <!-- PondBasket component -->
  <PondBasket v-model:isVisible="isPondVisible" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUsers } from "./modules/auth/useUsers";
import { state } from "./modules/globalStates/state";
import PondBasket from "./components/pond/PondBasketView.vue";

const isPondVisible = ref(false);

const togglePond = () => {
  isPondVisible.value = !isPondVisible.value;
};

const { logout } = useUsers();

const isLoggedIn = computed(() => state.isLoggedIn);
</script>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
