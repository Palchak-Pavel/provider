<template>
  <client-only>
    <div>
      <Orders />
    </div>
  </client-only>
</template>

<script>
import Orders from '@/components/products/Orders.vue'
 import { mapState } from 'vuex'

export default {
  components: {
    Orders
  },
  computed:{
    ...mapState('orders', ['orders'])
  },

  async fetch() {
    await this.$store.dispatch('orders/fetchOrders');
  }
}

</script>
