<template>
  <v-col cols = "12">
    <v-card flat>
      <v-card-title>{{ $t('ecommerce.shipments') }}</v-card-title>
      <v-card-text>
        <client-only>
          <v-btn class = "mr-1 mb-1 blue lighten-1 white--text" @click = "getShipments">{{ $t('common.refreshTable') }}</v-btn>

          <v-card flat style = "width: 81.5vw; height: 80vh">
            <ag-grid-vue style = "width: 100%; height: 90%;"
                         class = "ag-theme-balham"
                         :columnDefs = "columnDefs"
                         :rowData = "shipments"
                         :defaultColDef = "defaultColDef"
                         :rowSelection = "rowSelectionType"
                         :enableCellTextSelection = "true"
                         :header-height = "50"
                         :row-height = "39"
            >
            </ag-grid-vue>
          </v-card>
        </client-only>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import 'ag-grid-enterprise'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      rowData: null,
      rowSelectionType: 'single',
      columnDefs: [
        {
          headerName: `${this.$t('catalog.productCode')}`,
          field: 'productCode',
          filter: 'agSetColumnFilter'
        },
        {
          headerName: `${this.$t('ecommerce.deliveryQuantity')}`,
          field: 'deliveryQuantity',
          filter: 'agSetColumnFilter'
        },
        {
          headerName: `${this.$t('ecommerce.completeQuantity')}`,
          field: 'completeQuantity',
          filter: true
        },
        {
          headerName: `${this.$t('catalog.creationDate')}`,
          field: 'creationDate',
          filter: 'agDateColumnFilter',
          cellRenderer: (data) => {
            return data.value ? (new Date(data.value)).toLocaleDateString() : '';
          },
        },
        {
          headerName: `${this.$t('catalog.dueDate')}`,
          field: 'dueDate',
          filter: true,
          cellRenderer: (data) => {
            return data.value ? (new Date(data.value)).toLocaleDateString() : '';
          },
        }
      ],

      defaultColDef: {
        flex: 1,
        sortable: true,
        filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] }
      }
    }
  },

  computed: {
    ...mapGetters('orders', ['shipments']),
  },

  methods: {
    async getShipments() {
      await this.$store.dispatch('orders/fetchShipments');
    }
  }
}
</script>

<style>
</style>
