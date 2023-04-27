<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div
    class="h-[100vh] w-[100%] flex justify-center items-center bg-[url('/ffflux.svg')] bg-cover"
  >
    <RouterView />
  </div>
</template>

<style scoped></style>
