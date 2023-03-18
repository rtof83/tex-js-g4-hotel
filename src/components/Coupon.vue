<template>
  <div class="coupon">
    <label for="coupon">Possui cupom de desconto?</label>
    <br />
    <input v-model="coupon" type="text" placeholder="Insira seu cupom" />
    <button @click="checkCoupon">Validar</button>
    <button v-if="coupon" @click="cancelCoupon">Cancelar</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "Coupon",

  data() {
    return {
      coupon: "",
      message: "",
    };
  },

  computed: {
    couponStorage() {
      return JSON.parse(localStorage.getItem("coupon"));
    },

    reservation() {
      return this.$store.state.reservation;
    },
  },

  methods: {
    checkCoupon() {
      console.log(this.couponStorage.coupon);
      if (!this.couponStorage) return (this.message = "insira um cupom válido");

      if (this.coupon !== this.couponStorage.coupon)
        return (this.message = "cupom inválido");

      if (!this.reservation.discount) {
        this.message = "cupom aplicado (10%)";
        this.reservation.discount = this.reservation.total * 0.1;
      } else {
        this.message = "desconto já aplicado";
      }
    },

    cancelCoupon() {
      this.coupon = "";
      this.message = "";
      this.reservation.discount = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon {
  & label {
    font-family: "Della Respira", serif;
    font-size: 1.3rem;
  }

  & input {
    margin-left: 0.5rem;
    font-weight: bold;

    &::placeholder {
      padding-left: 0.5rem;
      font-style: italic;
      font-weight: bold;
    }
  }

  & button {
    margin-left: 0.5rem;
    padding: 0.1rem 1rem;
    border-radius: 0.3rem;
    border: none;
    font-weight: 700;
    cursor: pointer;
    background-color: #000;
    color: #fff;
    opacity: 1;
    transition: 0.3s;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>
