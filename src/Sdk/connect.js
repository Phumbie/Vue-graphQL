"use strict";

var utils = require("./utils");
const axios = require("axios");

const anonFunc = () => {};
const isRequired = (name) => {
  throw new Error(`${name} is required`);
};

/**
 * This function creates a connect object and returns it's properties
 * @param {*} key public key gotten from zilla dashboard - REQUIRED
 * @param {*} options optional params functions the could be invoked on success, on load and on close
 */
function connect() {
  if (!(this instanceof connect)) return new connect();
}

// scenario 1 for setting up an order
connect.prototype.openById = function ({
  publicKey,
  orderCode,
  onClose = anonFunc,
  onSuccess,
  onLoad = anonFunc,
  onEvent = anonFunc,
  ...rest
}) {
  if (typeof arguments[0] !== "object") {
    //DEPRECATION warning
    console.warn(
      `DEPRECATED: ZILLA CONNECT EXPECTED 1 ARGUMENT, BUT GOT ${arguments.length}`
    );
  }
  this.orderCode = orderCode || isRequired("ORDER_CODE");
  this.publicKey = publicKey || isRequired("PUBLIC KEY");
  this.config = { ...rest };
  connect.prototype.onLoad = onLoad;
  connect.prototype.onClose = onClose;
  connect.prototype.onSuccess = onSuccess || isRequired("onSuccess callback");
  connect.prototype.onEvent = onEvent;
  connect.prototype.utils = utils();
  connect.prototype.utils.addStyle();
  connect.prototype.utils.addLoader();
  axios
    .get(
      `${process.env.BASE_URL}/sdk/bnpl/purchase-order/${orderCode}/valid-for-payment`,
      {
        headers: {
          "public-key": connect.prototype.utils.encodePublicKey(this.publicKey),
        },
      }
    )
    .then(({ data }) => {
      //   console.log(data.data.validForPayment);
      let eventData = {
        type: "zilla.valid_order",
        data: { timestamp: Date.now() },
      };
      this.onEvent("ORDER_VALID", eventData.data);
      if (data.data.validForPayment) {
        connect.prototype.utils.init({
          paymentLink: data.data.paymentLink,
          onload: this.onLoad,
          onevent: this.onEvent,
        });
        connect.prototype.open();
      }
    })
    .catch(() => {
      let eventData = {
        type: "zilla.order_invalid",
        data: { data: "error validation orderCode", timestamp: Date.now() },
      };
      this.onEvent("ERROR", eventData.data);
      alert("error processing order");
      connect.prototype.close();
    });
};

// scenario 2 for setting up an order
connect.prototype.openNew = function ({
  publicKey,
  amount,
  clientOrderReference,
  title,
  productCategory,
  redirectUrl,
  onClose = anonFunc,
  onSuccess,
  onLoad = anonFunc,
  onEvent = anonFunc,
  ...rest
}) {
  if (typeof arguments[0] !== "object") {
    //DEPRECATION warning
    console.warn(
      `DEPRECATED: ZILLA CONNECT EXPECTED 1 ARGUMENT, BUT GOT ${arguments.length}`
    );
  }
  this.publicKey = publicKey || isRequired("PUBLIC KEY");
  this.amount = amount || isRequired("AMOUNT");
  this.title = title || isRequired("TITLE");
  this.clientOrderReference =
    clientOrderReference || isRequired("CLIENT_ORDER_REFERENCE");
  this.config = { ...rest };
  this.productCategory = productCategory;
  this.redirectUrl = redirectUrl;
  connect.prototype.onLoad = onLoad;
  connect.prototype.onClose = onClose;
  connect.prototype.onSuccess = onSuccess || isRequired("onSuccess callback");
  connect.prototype.onEvent = onEvent;
  connect.prototype.utils = utils();
  connect.prototype.utils.addStyle();
  connect.prototype.utils.addLoader();
  //   connect.prototype.utils.createLoader();

  axios
    .post(
      `https://bnpl-gateway-dev.zilla.africa/sdk/bnpl/purchase-order/create-with-pk`,
      {
        // publicKey: this.publicKey,
        amount: this.amount,
        title: this.title,
        clientOrderReference: this.clientOrderReference,
        productCategory: this.productCategory,
        redirectUrl: this.redirectUrl,
      },
      {
        headers: {
          "public-key": connect.prototype.utils.encodePublicKey(this.publicKey),
        },
      }
    )
    .then(({ data }) => {
      let eventData = {
        type: "zilla.valid_order",
        data: { timestamp: Date.now() },
      };
      this.onEvent("ORDER_VALID", eventData.data);
      connect.prototype.utils.init({
        paymentLink: data.data.paymentLink,
        onload: this.onLoad,
        onevent: this.onEvent,
      });
      connect.prototype.open();
    })
    .catch(() => {
      let eventData = {
        type: "zilla.order_invalid",
        data: { data: "error creating order", timestamp: Date.now() },
      };
      this.onEvent("ERROR", eventData.data);
      connect.prototype.close();
      alert("error processing order");
    });
};

/**this is the entry function to setup the connect widget */
// connect.prototype.setup = function (setup_configuration = {}) {
//   connect.prototype.utils.addStyle();

//   const qs = { ...this.config, ...setup_configuration };

//   connect.prototype.utils.init({
//     key: this.key,
//     qs: qs,
//     onload: this.onLoad,
//     onevent: this.onEvent,
//   });
// };

/**connect object property to open widget/modal */
connect.prototype.open = function () {
  //   connect.prototype.setup();
  connect.prototype.utils.openWidget();

  function handleEvents(event) {
    switch (event.data.type) {
      case "zilla.widget.closed":
        this.onEvent("CLOSE_WIDGET", event.data.data);
        window.removeEventListener("message", this.eventHandler, false);
        connect.prototype.utils.closeWidget();
        this.onClose();
        break;
      /* New onEvent callbacks */
      /* LOADED event is not triggered here, look in utils.js */
      case "zilla.completed_payment":
        connect.prototype.close();
        this.onSuccess(event.data.data);
        this.onEvent("SUCCESS", event.data.data);
        break;
      case "zilla.event":
        this.onEvent("EVENT", event.data.data);
        break;
      case "Zilla.error":
        this.onEvent("ERROR", event.data.data);
    }
  }

  connect.prototype.eventHandler = handleEvents.bind(this);
  window.addEventListener("message", this.eventHandler, false);
};

/**connect object property to hide modal and clean up to avoid leak */
connect.prototype.close = function () {
  window.removeEventListener("message", this.eventHandler, false);
  connect.prototype.utils.closeWidget();
  this.onClose();
};

// Do not attach connect to window when imported server side.
// This makes the module safe to import in an isomorphic code base.
if (typeof window !== "undefined") {
  window.Connect = connect;
}

module.exports = connect;
