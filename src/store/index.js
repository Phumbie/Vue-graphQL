import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const dataState = createPersistedState({
  paths: ["cart", "currency"],
});

export default new Vuex.Store({
  state: {
    toggleSideBar: false,
    cart: [],
    loader: false,
    currency: "AUD",
    alert: {
      type: "",
      description: "",
      display: false,
    },
  },
  plugins: [dataState],
  mutations: {
    OPEN_SIDE_BAR(state, payload) {
      state.toggleSideBar = payload;
    },
    ADD_TO_CART(state, payload) {
      let amount = 1;
      if (state.cart.length === 0) {
        // payload.amount = amount;
        Vue.set(payload, "amount", 1);
        return state.cart.push(payload);
      } else {
        if (state.cart.some((cart) => cart.id === payload.id)) {
          let index = state.cart.findIndex((x) => x.id === payload.id);
          state.cart[index].amount += amount;
        } else {
          Vue.set(payload, "amount", 1);
          state.cart.push(payload);
        }
      }
    },
    REMOVE_CART(state, payload) {
      let newCart = state.cart.filter((item) => payload !== item.id);
      state.cart = newCart;
    },
    INCREMENT_CART(state, payload) {
      let index = state.cart.findIndex((x) => x.id === payload);
      state.cart[index].amount++;
    },
    DECREMENT_CART(state, payload) {
      let index = state.cart.findIndex((x) => x.id === payload);

      state.cart[index].amount--;
    },
    SET_CURRENCY(state, payload) {
      state.currency = payload;
    },
    UPDATE_CART_CURRENCY(state, payload) {
      payload.forEach((item) => {
        if (state.cart.some((pay) => pay.id === item.id)) {
          let index = state.cart.findIndex((x) => x.id === item.id);
          state.cart[index].price = item.price;
        }
      });
    },
    TOGGLE_LOADER(state, payload) {
      state.loader = payload;
    },
    SHOW_ALERT: (state, payload) => {
      state.alert = payload;
    },
    EMPTY_CART: (state) => {
      state.cart = [];
    },
  },
  actions: {
    openSideBar: ({ commit }, payload) => {
      commit("OPEN_SIDE_BAR", payload);
    },

    addToCart: ({ commit }, payload) => {
      commit("ADD_TO_CART", payload);
    },
    removeFromCart: ({ commit }, payload) => {
      commit("REMOVE_CART", payload);
    },
    incrementCart: ({ commit }, payload) => {
      commit("INCREMENT_CART", payload);
    },
    decrementCart: ({ commit, state }, payload) => {
      let index = state.cart.findIndex((x) => x.id === payload);
      if (state.cart[index].amount === 1) {
        commit("REMOVE_CART", payload);
      } else {
        commit("DECREMENT_CART", payload);
      }
    },
    updateCartCurrency: ({ commit }, payload) => {
      commit("UPDATE_CART_CURRENCY", payload);
    },

    showAlert: ({ commit }, payload) => {
      commit("SHOW_ALERT", payload);
    },
    emptyCart: ({ commit }, payload) => {
      commit("EMPTY_CART");
    },
  },
  getters: {
    totalCart: (state) => {
      let total = 0;
      state.cart.forEach((data) => {
        let sum = data.amount * data.price;
        total = total + sum;
      });
      return total;
    },
  },
  modules: {},
});
