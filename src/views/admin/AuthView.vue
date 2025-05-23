<template>
  <div class="flex h-max">
    <!-- Left side with background image -->
    <div
      class="w-1/2 bg-cover bg-center"
      style="
        background-image: url('https://picsum.photos/800/1200');
        background-color: var(--vt-c-black, #181818);
      "
    ></div>

    <!-- Right side with login and register forms -->
    <div class="w-1/2 bg-[#181818] flex-grow text-gray-300 flex flex-col p-8">
      <!-- Top part: Login and Logout -->
      <div>
        <p class="text-2xl mb-4">Login / Logout</p>
        <input
          type="text"
          class="m-2 p-2 border-b border-gray-500 bg-transparent text-gray-300 focus:outline-none"
          placeholder="Email"
          v-model="email"
        />
        <!-- v-model for email -->
        <input
          type="password"
          class="m-2 p-2 border-b border-gray-500 bg-transparent text-gray-300 focus:outline-none"
          placeholder="Password"
          v-model="password"
        />
        <!-- v-model for password -->
        <button
          class="bg-[#1E40AF] text-white p-2 rounded hover:bg-[#1E3A8A] w-full mt-4"
          @click="fetchToken(email, password)"
        >
          Login
        </button>
        <!-- Login button -->
        <button
          class="bg-[#4B5563] text-white p-2 rounded hover:bg-[#374151] w-full mt-2"
          @click="logout"
        >
          Logout
        </button>
        <!-- Logout button -->
      </div>

      <!-- Lower part: Register -->
      <div class="register-block">
        <p
          class="text-2xl mt-24 mb-4 flex-nowrap cursor-pointer"
          @click="toggleRegisterDialog"
        >
          Click to register
        </p>
        <!-- Register button -->
        <dialog ref="registerDialog">
          <form class="flex flex-wrap">
            <input
              type="text"
              class="m-2 p-2 border-b border-gray-500 bg-transparent text-gray-300 focus:outline-none flex-1"
              placeholder="Name"
              v-model="name"
            />
            <!-- v-model for name -->
            <input
              type="text"
              class="m-2 p-2 border-b border-gray-500 bg-transparent text-gray-300 focus:outline-none flex-1"
              placeholder="Email"
              v-model="email"
            />
            <!-- v-model for email -->
            <input
              type="password"
              class="m-2 p-2 border-b border-gray-500 bg-transparent text-gray-300 focus:outline-none flex-1 w-full"
              placeholder="Password"
              v-model="password"
            />
            <!-- v-model for password -->
            <button
              class="bg-[#10B981] text-white p-2 rounded hover:bg-[#059669] w-full mt-4"
              @click="registerUser(name, email, password)"
            >
              Register
            </button>
            <!-- Register button -->
          </form>
          <button
            class="bg-red-600 text-white p-2 rounded hover:bg-red-700 w-full mt-2"
            @click.prevent="toggleRegisterDialog"
          >
            Close
          </button>
          <!-- Close button -->
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUsers } from "@/modules/auth/useUsers";

const { fetchToken, registerUser, logout, name, email, password, user } =
  useUsers();
const registerDialog = ref<HTMLDialogElement | null>(null);

const toggleRegisterDialog = () => {
  if (registerDialog.value) {
    if (registerDialog.value.open) {
      registerDialog.value.close();
    } else {
      registerDialog.value.show();
    }
  }
};
</script>

<style scoped>
.register-block {
  display: flex;
  position: relative;
}

dialog {
  background-color: var(--vt-c-black, #181818);
  border-left: 1px solid var(--vt-c-gray-500, #9ca3af);
  padding: 1rem;
  position: absolute;
  top: 8rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
dialog[open] {
  opacity: 1;
  pointer-events: inherit;
}
dialog::backdrop {
  background-color: rgba(0, 0, 255, 0.2);
}
</style>
