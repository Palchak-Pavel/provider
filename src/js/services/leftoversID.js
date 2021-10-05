import {Endpoints} from "~/js/endpoints";

export default class LeftoversID {
  constructor(context) {
    this.axios = context.$axios;
    this.url = Endpoints.baseURL;
  }

  getLeftovers(supplierID) {
    return this.axios.get(this.url + 'supplierrests/' + supplierID)
  }

  updateLeftovers(payload){
    return this.axios.put(this.url + 'supplierrests/', payload);
  }
  // updateLeftovers(payload){
  //   return this.axios.put(this.url,payload);
  // }

  createLeftovers(payload) {
    return this.axios.put(this.url + '/supplierrests/change_supplierrest', payload);
  }
}
