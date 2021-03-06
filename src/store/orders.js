
export const state = () => ({
  orders: [],
  shipments: [],
  leftovers: [],
  supplierID: 3,
})

export const getters = {
  orders(state) {
    return state.orders
  },
  shipments(state) {
    return state.shipments
  },
  leftovers(state) {
    return state.leftovers
  },
}

export const mutations = {
  SET_ORDERS(state, payload) {
    state.orders = payload
  },

  SET_SHIPMENTS(state, payload) {
    state.shipments = payload
  },

  SET_LEFTOVERS(state, payload) {
    state.leftovers = payload
  },
}

export const actions = {
  async fetchOrders({commit}) {
    const {data} = await this.$orderID.getOrders();
    commit('SET_ORDERS', data)
  },

  async fetchShipments({commit}) {
    const {data} = await this.$shipmentsID.getShipments();
    commit('SET_SHIPMENTS', data)
  },

  async fetchLeftovers({commit}) {
    const {data} = await this.$leftoversID.getLeftovers();
    commit('SET_LEFTOVERS', data)
  },
}
