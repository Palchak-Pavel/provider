
export const state = () => ({
  orders: [],
  supplierID: 3,
})

export const getters = {
  orders(state) {
    return state.orders
  }
}

export const mutations = {
  SET_ORDERS(state, payload) {
    state.orders = payload
  },
}

export const actions = {
  async fetchOrders({commit, state}) {
    const {data} = await this.$orderID.getOrders(state.supplierID);
    commit('SET_ORDERS', data)
  }
}
