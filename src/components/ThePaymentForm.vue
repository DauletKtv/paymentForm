<script setup>
import { usePaymentStore } from "../stores/payment";
import { ref } from "vue";
const store = usePaymentStore();
const nameHolder = ref(store.nameHolder);
function cardNameHolderChange(val) {
  store.cardNameHolderChange(val);
}

const loader = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(241, 242, 243, 0); display: block;" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#93dbe9" stroke-width="3" r="27" stroke-dasharray="127.23450247038662 44.411500823462205"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>`;
</script>

<template>
  <div class="p-9 mx-auto backdrop-blur bg-white/30 rounded-3xl">
    <p class="text-center text-white text-[19px] font-semibold">
      Заполните реквизиты карты
    </p>
    <form
      @submit.prevent="store.sendData()"
      class="px-10 py-5 max-w-[500px] flex flex-col gap-[10px] text-white [&_label_input]:text-black"
    >
      <!-- <div>
        {{ store }}
      </div> -->
      <label for="sum" class="max-w-[250px]">
        <p>Сумма</p>
        <div class="flex">
          <span
            class="w-[10%] flex justify-center items-center px-3 py-1 bg-[#b7b7b7] rounded-lg rounded-r text-black"
            >$</span
          >
          <input
            type="text"
            id="sum"
            readonly
            class="bg-[#d2cdcd] px-2 py-1 rounded-md w-[90%] rounded-l-none"
            :value="store.paymentSum"
          />
        </div>
      </label>
      <label for="numberCard" class="max-w-[250px]">
        <p>Номер карты</p>
        <input
          type="text"
          id="numberCard"
          class="bg-[#ebebeb] px-3 py-1 rounded-md w-[100%]"
          v-model.number="store.cardNumber"
          @input="store.cardNumberChange($event.target.value)"
          placeholder="1111 2222 3333 4444"
        />
      </label>
      <label for="nameHolder" class="max-w-[250px]">
        <p>Держатель</p>
        <input
          type="text"
          id="nameHolder"
          class="bg-[#ebebeb] px-3 py-1 rounded-md w-[100%]"
          @input="cardNameHolderChange($event.target.value)"
          v-model="nameHolder"
          placeholder="IVAN IVANOV"
        />
      </label>
      <div class="flex max-w-[250px] justify-between">
        <label for="date" class="w-[40%]">
          <p>Месяц/Год</p>
          <input
            type="text"
            id="date"
            class="bg-[#ebebeb] px-3 py-1 rounded-md w-[90%]"
            v-model="store.date"
            @input="store.cardDateChange($event.target.value)"
            placeholder="MM/YY"
            maxlength="5"
          />
        </label>
        <label for="cvc" class="w-[40%]">
          <p title="3 цифры на обороте вашей карты">CVC/CVV</p>
          <input
            autocomplete="off"
            type="password"
            id="cvc"
            class="bg-[#ebebeb] px-3 py-1 rounded-md w-[100%]"
            v-model="store.cvc"
            @input="store.cvcChange($event.target.value)"
            placeholder="CVC"
            maxlength="3"
          />
        </label>
      </div>
      <label for="email" class="max-w-[250px]">
        <p title="3 цифры на обороте вашей карты">Почта</p>
        <input
          type="email"
          id="email"
          class="bg-[#ebebeb] px-3 py-1 rounded-md w-[100%]"
          v-model="store.email"
          @input="store.emailChange($event.target.value)"
          placeholder="email@mail.ru"
          maxlength="30"
        />
      </label>
      <p
        class="w-[100%] flex text-center justify-center mt-2 text-[red] font-bold text-[18px]"
        v-if="!store.checkValidation"
      >
        {{ store.errorText }}
      </p>
      <button
        type="submit"
        class="w-[100%] flex items-center text-center justify-center mt-5 bg-gradient-to-r from-purple-600 to-blue-600 min-h-[35px] rounded-lg text-white hover:bg-gradient-to-tr hover:from-fuchsia-500 hover:to-cyan-500"
      >
        <p v-if="!store.loading">Оплатить</p>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          style="
            margin: auto;
            background: rgba(241, 242, 243, 0);
            display: block;
          "
          width="40px"
          height="40px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <circle
            cx="50"
            cy="50"
            fill="none"
            stroke="#93dbe9"
            stroke-width="3"
            r="27"
            stroke-dasharray="127.23450247038662 44.411500823462205"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
            ></animateTransform>
          </circle>
        </svg>
      </button>
    </form>
  </div>
</template>

<style scoped></style>
