<template class="w-screen">
  <header class="text-white py-4">
    <div class="wrapper">
      <nav class="">
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/about" class="mr-4">About</RouterLink>
        <RouterLink to="/products" class="mr-4">Products</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/auth" class="mr-4"
          >Login</RouterLink
        >
        <RouterLink v-if="isLoggedIn" to="/admin" class="mr-4">
          Admin
        </RouterLink>
        <button v-if="isLoggedIn" @click="logout" class="mr-4">Logout</button>

        <!-- RouterLink to ducks, Auth, Admin & and logout button -->

        <!-- toggle cart button -->
        <button @click="toggleCart" class="mr-4">Cart</button>

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

  <!-- CartBasket component -->
  <CartBasket v-model:isVisible="isCartVisible" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useUsers } from "./modules/auth/useUsers";
import { state } from "./modules/globalStates/state";
import CartBasket from "./components/pond/PondBasketView.vue";

const isCartVisible = ref(false);

const toggleCart = () => {
  isCartVisible.value = !isCartVisible.value;
};

const { logout } = useUsers();

const isLoggedIn = computed(() => state.isLoggedIn);
</script>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
.router-link-active {
  color: rgb(0, 180, 0);
}
</style>
