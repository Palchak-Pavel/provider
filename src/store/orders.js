import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { commit } from 'lodash/seq'

// Vue.use(Vuex)

export const state = () => ({
  orders: []
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
  async fetchOrders({commit}, payload) {
    const {data} = await this.$appService.getOrders(payload);
    commit('SET_ORDERS', data)
  }
}
