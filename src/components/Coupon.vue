<template>
  <div class="coupon">
    <label for="coupon">Possui cupom de desconto?</label>
    <br />
    <input v-model="coupon" type="text" placeholder="Insira seu cupom" />
    <button v-if="coupon" @click="checkCoupon">Validar</button>
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
    coupons() {
      return this.$store.state.couponsModule.coupons;
    },

    reservation() {
      return this.$store.state.reservation;
    },

    applyCoupon() {
      return this.$store.state.applyCoupon;
    }
  },

  methods: {
    async checkCoupon() {
      await this.$store.dispatch("couponsModule/checkCoupon", this.coupon);

      if (this.coupons === 404 || this.coupons === 400) {
        this.applyCoupon.couponId = '';
        this.applyCoupon.discount = 0;
        this.reservation.discount = 0;
        this.message = "insira um cupom válido";
        return;
      };
      
      // } else if (this.coupons.discount) {
        this.reservation.discount = this.coupons.discount / 100;
        this.applyCoupon.id = this.coupons.id;
        this.applyCoupon.discount = this.coupons.discount;

        this.message = `cupom aplicado! (${this.coupons.discount}%)`;
      // };
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
