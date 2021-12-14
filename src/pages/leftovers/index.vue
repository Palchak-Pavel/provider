<template>
  <client-only>
    <div style="width: 100%">
      <Leftovers />
    </div>
  </client-only>
</template>

<script>
import Leftovers from '@/components/products/Leftovers.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Leftovers
  },
  computed:{
    ...mapState('orders', ['leftovers'])
  },

  async fetch() {
    await this.$store.dispatch('orders/fetchLeftovers');
  }
}

</script>
