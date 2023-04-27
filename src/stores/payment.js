import { ref, computed } from "vue";
import { defineStore } from "pinia";
import router from "../router";
export const usePaymentStore = defineStore("payment", () => {
  const payment = ref(24.5);
  const paymentSum = computed(() => payment.value);
  const cardNumber = ref("");
  const nameHolder = ref("");
  const date = ref("");
  const cvc = ref("");
  const email = ref("");
  const checkValidation = ref(true);
  const loading = ref(false);
  const accessCheck = ref(false);
  const errorText = ref("Заполните корректно поля!");

  function emailChange(val) {
    email.value = val;
  }
  function cvcChange(val) {
    cvc.value = val.replace(/\D/g, "").slice(0, 3);
  }
  function cardDateChange(val) {
    date.value = val.replace(/[^\d/]/g, "");
    if (date.value.indexOf("/") === -1 && date.value.length > 2) {
      date.value = val.slice(0, 2) + "/" + val.slice(2, 4);
    }
  }
  function cardNumberChange(val) {
    if (cardNumber.value.length == 16) {
      return;
    }
    cardNumber.value = val
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  }

  function cardNameHolderChange(val) {
    const filteredValue = val;
    nameHolder.value = filteredValue;
  }

  function sendData() {
    if (loading.value) {
      return;
    }
    let valid = true;
    const data = {
      payment: payment.value,
      card_number: cardNumber.value,
      name_holder: nameHolder.value,
      date: date.value,
      cvc: cvc.value,
      email: email.value,
    };
    Object.keys(data).forEach((element) => {
      if (data[element] == "") {
        valid = false;
        errorText.value = "Заполните корректно поля!";
      }
      if (data.card_number.length < 19) {
        valid = false;
        errorText.value = "Неверный номер карты !";
      } else {
        errorText.value = "Заполните корректно поля!";
      }
      if (data.date.split("/")[0] > 12) {
        valid = false;
        errorText.value = "Укажите корректную дату!";
      }
      if (data.date.split("/")[0] > 12 && data.card_number.length < 19) {
        errorText.value = "Заполните корректно поля!";
      }
    });
    loading.value = true;

    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (valid) {
          resolve();
        } else {
          reject();
        }
      }, 2000);
    });
    myPromise
      .then(() => {
        loading.value = false;
        console.log("Промис выполнен!");
        accessCheck.value = true;
        router.push("/about");
      })
      .catch(() => {
        checkValidation.value = false;
        loading.value = false;
        setTimeout(() => {
          checkValidation.value = true;
          errorText.value = "Заполните корректно поля!";
        }, 3000);
        console.log("Произошла ошибка!");
      });
  }

  return {
    payment,
    paymentSum,
    cardNumber,
    date,
    cvc,
    email,
    loading,
    cardNumberChange,
    cardNameHolderChange,
    cardDateChange,
    cvcChange,
    emailChange,
    sendData,
    checkValidation,
    nameHolder,
    accessCheck,
    errorText,
  };
});
