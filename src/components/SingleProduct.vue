<template>
  <div>
    <div class="product">
      <div class="image">
        <div class="loader" v-if="!showLoad">Loading...</div>
        <img
          v-show="showLoad"
          style="max-height: 100%; max-width: 70%"
          :src="productData.image"
          alt="productData.name"
          load="lazy"
          @load="showLoad = true"
        />
      </div>
      <div>
        <p class="product-description">{{ productData.name }}</p>
      </div>

      <p>From: &#8358;{{ productData.price }}</p>
      <button class="product-button" @click="addToCart">
        Add to Cart
      </button>
    </div>
  </div>
</template>
<script>
  export default {
    props: ["productData"],
    // mounted() {
    //   console.log(this.productData);
    // },
    data() {
      return {
        showLoad: false,
      };
    },

    methods: {
      addToCart() {
        this.$store.dispatch("openSideBar", true);
        // console.log("life", this.productData.amount);
        this.$store.dispatch("addToCart", this.productData);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .product {
    text-align: center;
    padding: 3rem 2rem;

    & .image {
      height: 18rem;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    & .product-description {
      font-size: 1.2rem;
    }

    p {
      margin-top: 1rem;
    }

    & .product-button {
      background-color: transparent;
      color: #6956c7;
      border-radius: 5px;
      padding: 1rem 0;
      width: 10rem;
      margin-top: 1.5rem;
      border: 1.3px solid #a699df;
      cursor: pointer;
      font-weight: semibold;
    }
    > div {
      height: 3rem;
    }
  }

  @media (max-width: 768px) {
    .product {
      padding: 1rem 0.5rem;
      // height: 20rem;
      & .image {
        height: 170px;
        display: flex;
        align-items: flex-end;
        justify-content: center;

        img {
          object-fit: contain;
        }
      }

      & .product-description {
        font-size: 0.8rem;
      }

      p {
        margin-top: 1rem;
      }

      & .product-button {
        width: 100%;
        padding: 0.7rem 0;
      }

      > div {
        height: 3rem;
      }
    }
  }
  .loader {
    font-size: 10px;
    margin: 50px auto;
    text-indent: -9999em;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: #151414;
    background: -moz-linear-gradient(
      left,
      #151414 10%,
      rgba(21, 20, 20, 0) 42%
    );
    background: -webkit-linear-gradient(
      left,
      #151414 10%,
      rgba(21, 20, 20, 0) 42%
    );
    background: -o-linear-gradient(left, #151414 10%, rgba(21, 20, 20, 0) 42%);
    background: -ms-linear-gradient(left, #151414 10%, rgba(21, 20, 20, 0) 42%);
    background: linear-gradient(to right, #151414 10%, rgba(21, 20, 20, 0) 42%);
    position: relative;
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .loader:before {
    width: 50%;
    height: 50%;
    background: #151414;
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  .loader:after {
    background: #fcf7f7;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: "";
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
