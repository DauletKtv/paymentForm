<script setup>
import { usePaymentStore } from "../stores/payment";
const store = usePaymentStore();
</script>
<template>
  <div class="px-9 py-4 mx-auto backdrop-blur bg-white/30 rounded-3xl max-w-lg">
    <h1 class="text-white text-[28px]">Спасибо за покупку!</h1>
    <p class="text-[18px] text-white">
      Сумма: <span class="text-[black]">{{ store.payment }}$</span>
    </p>
    <p class="text-[18px] text-white">Чек будет выслан на вашу почту:</p>
    <p class="text-[18px] text-black">{{ store.email }}</p>
  </div>
</template>

<style scoped></style>
