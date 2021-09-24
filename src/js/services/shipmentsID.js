import {Endpoints} from "~/js/endpoints";

export default class ShipmentsID {
  constructor(context) {
    this.axios = context.$axios;
    this.url = Endpoints.baseURL + "deliveries";
  }

  getShipments(supplierID) {
    return this.axios.get(this.url + '/get_notcompletedeliveries/' + supplierID)
  }
}
