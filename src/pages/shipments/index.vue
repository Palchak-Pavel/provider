<template>
  <client-only>
    <div>
      <Shipments/>
    </div>
  </client-only>
</template>

<script>
import Shipments from '@/components/products/Shipments.vue'
export default {
  components: {
    Shipments
  }
}

</script>
