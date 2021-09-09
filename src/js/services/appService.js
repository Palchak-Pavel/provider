import {Endpoints} from "~/js/endpoints";

export default class AppService {
  constructor(context) {
    this.axios = context.$axios;
    this.url = Endpoints.baseURL + "orders";
  }


  getOrders(supplierID) {
    return this.axios.get(this.url + '/get_notcompleteorders/' + supplierID)
  }
}
