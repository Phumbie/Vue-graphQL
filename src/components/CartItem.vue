<template>
  <div>
    <div class="body">
      <h5 class="cancel" @click="removeCart">X</h5>
      <div>
        <div class="body-content">
          <h5>{{ cartProduct.name }}</h5>
        </div>
        <div class="body-image">
          <img
            style="max-height: 5rem; max-width: 100%"
            :src="cartProduct.image"
            alt=""
          />
        </div>
      </div>
      <div class="bottom">
        <div class="count">
          <button @click="decrement">-</button>
          <p>{{ cartProduct.amount }}</p>
          <button @click="increment">+</button>
        </div>

        <div class="price">
          &#8358;{{ cartProduct.price * cartProduct.amount }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["cartProduct"],
    methods: {
      removeCart() {
        this.$store.dispatch("removeFromCart", this.cartProduct.id);
      },
      increment() {
        this.$store.dispatch("incrementCart", this.cartProduct.id);
      },
      decrement() {
        this.$store.dispatch("decrementCart", this.cartProduct.id);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .body {
    background-color: white;
    padding: 1rem;
    margin-top: 2rem;

    > div {
      display: flex;
    }

    & .body-image {
      margin-left: auto;
    }

    & .cancel {
      display: flex;
      justify-content: flex-end;
      margin: 0.5rem;
      cursor: pointer;
    }
  }

  .count {
    display: flex;
    border: 1px solid black;
    width: 5rem;
    padding: 0.5rem;
    text-align: center;

    button {
      width: 2rem;
      border: none;
      background: none;
      outline: none;
      cursor: pointer;
    }
  }

  .bottom {
    display: flex;
    align-items: center;

    & .price {
      text-align: center;
      width: 100%;
    }
  }
</style>
