import {Endpoints} from "~/js/endpoints";

export default class LeftoversID {
  constructor(context) {
    this.axios = context.$axios;
    this.url = Endpoints.baseURL + "rests";
  }

  getLeftovers() {
    return this.axios.get(this.url)
  }

  updateLeftovers(payload){
    return this.axios.put(this.url, payload);
  }

  createLeftovers(payload) {
    return this.axios.put(this.url, payload);
  }
}
