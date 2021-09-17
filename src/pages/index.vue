<template>
  <client-only>
    <div>
      <Orders/>
    </div>
  </client-only>
</template>

<script>
import Orders from '@/components/products/Orders.vue'
// import { mapState } from 'vuex'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  components: {
    Orders
  },
  computed:{
    ...mapGetters('orders', ['orders'])
  }

  // computed: {
  //   // allOrders() {
  //   //   return this.$store.getters.allOrders
  //   // }
  //   ...mapGetters('orders', ['allOrders'])
  // },
  // methods: {
  //   ...mapActions('orders', ['fetchOrders'])
  // },
  // async mounted() {
  //   // this.$store.dispatch('fetchOrders')
  //   await this.fetchOrders()
  //   console.log(this.allOrders)
  // },
}

</script>
