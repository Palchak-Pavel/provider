import {Endpoints} from "~/js/endpoints";

export default class ShipmentsID {
  constructor(context) {
    this.axios = context.$axios;
    this.url = Endpoints.baseURL + "deliveries";
  }

  getShipments() {
    return this.axios.get(this.url)
  }
}
