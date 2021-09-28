<template>
  <div>
    <h3>Заказы</h3>
    <div>
      <client-only>
        <v-btn class="mr-1 mb-1 blue lighten-1 white--text" @click="getOrders">Обновить таблицу</v-btn>
        <ag-grid-vue style="width: 87vw; height: 75vh;"
                     class="ag-theme-balham"
                     :columnDefs="columnDefs"
                     :rowData="order"
                     :pagination="true"
                     :defaultColDef="defaultColDef"
                     :rowSelection="rowSelectionType"
                     :enableCellTextSelection="true"
                     :header-height="50"
                     :row-height="39"
        >
        </ag-grid-vue>
      </client-only>
    </div>
  </div>

</template>

<script>
import 'ag-grid-enterprise'
// import { AgGridVue } from 'ag-grid-vue'
// import { AllCommunityModules } from '@ag-grid-community/all-modules'
// import { ModuleRegistry } from '@ag-grid-community/core'
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
// import { CsvExportModule } from '@ag-grid-community/csv-export'
// import { ExcelExportModule } from '@ag-grid-enterprise/excel-export'
// import { MasterDetailModule } from '@ag-grid-enterprise/master-detail'
// import { SetFilterModule } from '@ag-grid-enterprise/set-filter'
import axios from 'axios'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  //props: ['supplierID'],

  data() {
    return {
      order: [],
      rowData: null,
      rowSelectionType: 'single',

      // modules: AllCommunityModules,
      // ClientSideRowModelModule,
      // CsvExportModule,
      // ExcelExportModule,
      // MasterDetailModule,
      // ModuleRegistry,
      // AgGridVue,
      // SetFilterModule,

      columnDefs: [
        {
          headerName: 'Артикул ',
          field: 'productCode',
          filter: 'agSetColumnFilter'

        },
        {
          headerName: 'Заказано, шт ',
          field: 'orderQuantity',
          filter: 'agSetColumnFilter'
          // filterParams: { excelMode: 'windows' }
        },
        {
          headerName: 'Выполнено, шт ',
          field: 'completeQuantity',
          filter: true
        },
        {
          headerName: 'Цена',
          field: 'price',
          filter: true
        },
        {
          headerName: 'Дата создания ',
          field: 'creationDate',
          filter: 'agDateColumnFilter'
        },
        {
          headerName: 'Срок готовности ',
          field: 'readinessDate',
          filter: true
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
    ...mapState('orders', ['orders', 'supplierID'])
  },
  async mounted() {
    await this.getOrders()
  },

  methods: {
    async getOrders() {
      const { data } = await this.$orderID.getOrders(this.supplierID)
      this.order = data
    },
  }

}

</script>

<style>
</style>
