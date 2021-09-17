<template>
      <div>
        <h3>Заказы</h3>
        <div class="ma-2">
          <client-only>
          <ag-grid-vue style="width: 85vw; height: 80vh;"
                       class="ag-theme-balham"
                       :columnDefs="columnDefs"
                       :rowData="order"
                       :pagination="true"
                       :paginationPageSize="15"
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
import 'ag-grid-enterprise';
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
  props: ['supplierID'],

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
          filter: 'agSetColumnFilter',

        },
        {
          headerName: 'Заказано, шт ',
          field: 'orderQuantity',
          filter: 'agSetColumnFilter',
          // filterParams: { excelMode: 'windows' }
        },
        {
          headerName: 'Выполнено, шт ',
          field: 'completeQuantity',
          filter: true,
        },
        { headerName: 'Цена',
          field: 'price',
          filter: true,
        },
        {
          headerName: 'Дата создания ',
          field: 'creationDate',
          filter: 'agDateColumnFilter',
        },
        {
          headerName: 'Срок готовности ',
          field: 'readinessDate',
          filter: true,
        }
      ],
      // sideBar: null,
      // localeText: {
      //   applyFilter: 'OK',
      //   cancelFilter: 'Cancel',
      //   resetFilter: 'Clear Filter',
      // },
      defaultColDef: {
        flex: 1,
        sortable: true,
        filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] }
        // floatingFilter: true
      }
    }
  },

  async mounted() {
    const res = await fetch('http://192.168.0.155:8080/plan/orders/get_notcompleteorders/3')
    const order = await res.json()
    this.order = order
    // console.log(this.order)
    // await this.getOrders()

  },

  computed: {
    // allOrders() {
    //   return this.$store.getters.allOrders
    // }
    // ...mapGetters('orders', ['orders'])
    ...mapState('orders', ['orders'])
  },
  // mounted() {
  //   // this.$store.dispatch('fetchOrders')
  //   // await this.fetchOrders()
  //   console.log(this.order)
  // },

  methods: {
    // async getOrders() {
    //     const { data } = await this.$serviceID.getOrders(this.supplierID)
    //     this.order = data
    // }

  }

}
</script>

<style>
.ag-header-cell-label {
  /*justify-content: center;*/
  font-weight: bold;
  font-size: 14px;
}
.ag-cell-wrapper{
  font-size: 13px;
}
.ag-standard-button{
  border-radius: 4px;
  padding: 0 16px;
  min-width: 50px;
  height: 25px;
  vertical-align: middle;
  color: rgb(255, 255, 255);
  background-color: rgb(33, 150, 243);
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  font-size: 14px;
  font-weight: 400;
  line-height: 30px;
  transition: box-shadow 0.2s;
}
.ag-standard-button:hover,
.ag-standard-button:focus {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
</style>
