<template>
  <v-col cols = "12">
    <v-card flat>
      <v-card-title>Отгрузки</v-card-title>
      <v-card-text>
        <client-only>
          <v-btn class = "mr-1 mb-1 blue lighten-1 white--text" @click = "getShipments">Обновить таблицу</v-btn>

          <v-card flat style = "width: 81.5vw; height: 80vh">
            <ag-grid-vue style = "width: 100%; height: 90%;"
                         class = "ag-theme-balham"
                         :columnDefs = "columnDefs"
                         :rowData = "order"
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
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  props: ['supplierID'],

  data() {
    return {
      order: [],
      rowData: null,
      rowSelectionType: 'single',
      columnDefs: [
        {
          headerName: 'Артикул ',
          field: 'productCode',
          filter: 'agSetColumnFilter'

        },
        {
          headerName: 'Указание на отгрузку, шт',
          field: 'deliveryQuantity',
          filter: 'agSetColumnFilter'
        },
        {
          headerName: 'Выполнено, шт ',
          field: 'completeQuantity',
          filter: true
        },
        {
          headerName: 'Дата создания ',
          field: 'creationDate',
          filter: 'agDateColumnFilter'
        },
        {
          headerName: 'Срок отгрузки',
          field: 'dueDate',
          filter: true
        }
      ],
      // localeText: {
      //   applyFilter: 'OK',
      //   cancelFilter: 'Cancel',
      //   resetFilter: 'Clear Filter',
      // },
      defaultColDef: {
        flex: 1,
        sortable: true,
        filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] }

      }
    }
  },
  computed: {
    ...mapState('orders', ['orders', 'supplierID'])
  },
  async mounted() {
    await this.getShipments()
  },

  methods: {
    async getShipments() {
      const { data } = await this.$shipmentsID.getShipments(this.supplierID)
      this.order = data
    }
  }

  // async mounted() {
  //   const res = await fetch('http://192.168.0.155:8080/plan/deliveries/get_notcompletedeliveries/3')
  //   const order = await res.json()
  //   this.order = order
  // },
  //
  // computed: {
  //   ...mapGetters('orders', ['orders'])
  // },
}
</script>

<style>
</style>
