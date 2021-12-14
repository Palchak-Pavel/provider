<template>
  <client-only>
    <div style="width: 100%">
      <Shipments />
    </div>
  </client-only>
</template>

<script>
import Shipments from '@/components/products/Shipments.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Shipments
  },
  computed: {
    ...mapState('orders', ['shipments'])
  },

  async fetch() {
    await this.$store.dispatch('orders/fetchShipments')
  }
}

</script>
