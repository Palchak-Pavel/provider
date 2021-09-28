<template>
  <div>
    <h3>Остатки</h3>
    <div>
      <client-only>
        <v-btn class="mr-1 mb-1 blue lighten-1 white--text" @click="getLeftovers">Обновить таблицу</v-btn>
        <ag-grid-vue style="width: 85vw; height: 75vh;"
                     class="ag-theme-balham"
                     :columnDefs="columnDefs"
                     :rowData="order"
                     :defaultColDef="defaultColDef"
                     :rowSelection="rowSelectionType"
                     :enableCellTextSelection="true"
                     :header-height="50"
                     :row-height="39"
                     :gridReady="onGridReady"
                     :onCellEditingStopped="updateLeftovers"
        >
        </ag-grid-vue>
      </client-only>
    </div>
  </div>
</template>

<script>
import 'ag-grid-enterprise';
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  // props: ['supplierID'],

  data() {
    return {
      order: [],
      rowData: null,
      rowSelectionType: 'single',
      columnDefs: [
        {
          headerName: 'Артикул ',
          field: 'productCode',
          filter: 'agSetColumnFilter',

        },
        {
          headerName: 'Количество на складе, шт',
          field: 'storeQuantity',
          filter: 'agSetColumnFilter',
          editable: true,
          cellClass: "cell-wrap-text",
          cellValueChanged: ""
        },
        {
          headerName: 'Цена ',
          field: 'price',
          filter: true,
        }
      ],
      // localeText: {
      //   applyFilter: 'OK',
      //   cancelFilter: 'Cancel',
      //   resetFilter: 'Clear Filter',
      // },
      defaultColDef: {
        gridApi: null,
        columnApi: null,
        flex: 1,
        sortable: true,
        filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] },
      }
    }
  },
  computed: {
    ...mapState('orders', ['orders', 'supplierID']),
  },
  async mounted() {
    await this.getLeftovers();
  },


  methods: {
    async getLeftovers() {
      const { data } = await this.$leftoversID.getLeftovers(this.supplierID)
      this.order = data
    },

    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },

    async updateLeftovers(value) {
      await this.$leftoversID.updateLeftovers(value)
      let index = this.order.findIndex(x => x.storeQuantity === value.storeQuantity);
      if (index !== -1)
        this.order[index] = value;
    }
  }

  // async mounted() {
  //   const res = await fetch('http://192.168.0.155:8080/plan/supplierrests/3')
  //   const order = await res.json()
  //   this.order = order
  // },
  //
}
</script>

<style>

</style>
