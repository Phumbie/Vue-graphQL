<template>
  <div class="header">
    <div class="cart" @click="openCart">
      <img style="width: 20px; height: 20px" src="@/assets/shopping-cart.svg" alt="" />
      <sup>{{ $store.state.cart.length }}</sup>
    </div>
    <div class="header-content">
      <h1>All Products</h1>
      <p>A 360&#176; lookat Lumin</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openCart() {
      this.$store.dispatch("openSideBar", true);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  background-color: #f5f5f4;
  height: 20rem;
  display: flex;
  align-items: center;
  position: relative;

  & .cart {
    position: absolute;
    right: 5rem;
    top: 3rem;
  }

  & .header-content {
    width: 85%;
    margin: auto;

    p {
      margin-top: 1.5rem;
    }
  }
}

@media (max-width: 768px) {
  .header .cart {
    right: 2rem;
  }
}
</style>
