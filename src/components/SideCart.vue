<template>
  <div>
    <div class="cart">
      <div></div>
      <div class="cart-section">
        <div class="top-cart">
          <div @click="closeSide">
            <p><</p>
          </div>
          <h5>Your Cart</h5>
        </div>

        <div class="currency">
          <!-- <select v-model="currentCurrency" id="cars" name="carlist" form="carform">
            <option :value="current" v-for="(current, index) in currency" :key="index">{{ current }} </option>
          </select> -->
        </div>

        <div class="cart-items">
          <CartItem
            v-for="cart in cartData"
            :key="cart.id"
            :cartProduct="cart"
          />
        </div>
        <div class="total">
          <div>
            <hr />
            <div class="calculation">
              <h4>Total:</h4>
              <h5>&#8358;{{ totalCart }}</h5>
            </div>
            <div class="checkout-container">
              <button class="checkout-button" @click="checkoutWithZilla">
                Checkout with Zilla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
  import CartItem from "./CartItem";
  import gql from "graphql-tag";
  import Connect from "@/Sdk/connect";
  // import ZillaConnect from "@usezilla/zilla-connect";
  export default {
    components: {
      CartItem,
    },
    apollo: {
      currency: gql`
        query {
          currency
        }
      `,
    },
    data() {
      return {
        currentCurrency: "",
      };
    },
    watch: {
      currentCurrency(val) {
        this.$store.commit("SET_CURRENCY", val);
        // console.log(val);
      },
    },

    mounted() {
      document.body.style.overflow = "hidden";
    },
    beforeDestroy() {
      document.body.style.overflow = "initial";
    },
    computed: {
      cartData() {
        return this.$store.state.cart;
        // console.log(this.$store.state.cart);
      },
      totalCart() {
        return this.$store.getters.totalCart;
      },
    },
    methods: {
      ...mapActions(["showAlert", "emptyCart"]),
      closeSide() {
        this.$store.dispatch("openSideBar", false);
      },
      checkoutWithZilla() {
        const zillaConnect = new Connect();
        let config = {
          onLoad: () => console.log("Widget loaded successfully"),
          onSuccess: (data) => this.handleZillaSuccess(data),
          // onEvent: (eventName, data) => {
          //   console.log(eventName);
          //   console.log(data);
          // },
          clientOrderReference: new Date(),
          title: "Zilla Bio-cosmetics",
          amount: this.totalCart,
          publicKey:
            "PK_SANDBOX_5b78bbb6c45299f27d8210164df036368424f46f147fb263cb7b3f0d07911e8f",
        };
        zillaConnect.openNew(config);
      },
      handleZillaSuccess(data) {
        console.log(data);
        this.closeSide();
        this.emptyCart();
        this.showAlert({
          display: true,
          description: "Payment successful, thank you for shopping with us",
          type: "success",
        });
      },
    },
  };
</script>
<style lang="scss" scoped>
  .cart {
    position: fixed;
    top: 0;
    height: 100%;
    background-color: rgba(205, 209, 206, 0.8);
    width: 100%;
    display: flex;

    & .cart-section {
      width: 30%;
      margin-left: auto;
      background-color: #f2f2ef;
      padding: 2rem 1rem;
      position: relative;
      animation: slideinLeft 0.5s ease-out;
      // overflow: auto;

      h5 {
        text-align: center;
      }

      & .currency > select {
        background-color: white;
        padding: 0.8rem;
        margin-bottom: 1rem;
      }
    }
  }

  .cart-items {
    //   overflow-y: auto;
    height: calc(100% - 11rem);
    overflow: auto;

    //   margin-top: 1rem;
  }

  .total {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0rem;
    width: 90%;
    background-color: white;
    padding: 1rem;
    /* height: 3rem; */
    -webkit-box-shadow: 0px -8px 11px 0px rgba(220, 220, 220, 1);
    -moz-box-shadow: 0px -8px 11px 0px rgba(220, 220, 220, 1);
    box-shadow: 0px -8px 11px 0px rgba(220, 220, 220, 1);
    > div {
      width: 100%;
    }
    & .checkout-container {
      display: flex;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }
    & .checkout-button {
      padding: 1.2rem 1.5rem;
      border: none;
      border-radius: 8px;
      background: #c70039;
      color: white;
      cursor: pointer;
      width: 100%;
    }
    & .calculation {
      display: flex;
      justify-content: space-between;
    }
    hr {
      margin: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    .cart .cart-section {
      width: 100%;
      // overflow-y: auto;
      // min-height: 100vh;
    }

    //   .total {
    //     position: initial;
    //   }
  }

  .top-cart {
    display: flex;
    margin: 1rem;

    > div {
      border-radius: 50%;
      border: 1px solid black;
      width: 1.5rem;
      height: 1.5rem;
      text-align: center;
      cursor: pointer;
      display: grid;
      place-items: center;
    }

    h5 {
      width: 100%;
    }
  }

  @keyframes slideinLeft {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
