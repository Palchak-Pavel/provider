import {Endpoints} from "~/js/endpoints";

export default class OrderID {
  constructor(context) {
    this.axios = context.$axios;
    this.url = Endpoints.baseURL + "orders";
  }

  getOrders() {
    return this.axios.get(this.url)
  }
}
