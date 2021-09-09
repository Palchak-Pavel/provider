<template>
  <v-col class="flex-grow-0" dense>
    <v-row cols="12">
      <div>
        <h3>Заказы</h3>
        <v-data-table
          :items="order"
          :headers="headers"
          hide-default-footer
        >

        </v-data-table>
        <div class="ma-2">
          <ag-grid-vue style="width: 85vw; height: 75vh;"
                       class="ag-theme-balham"
                       :columnDefs="columnDefs"
                       :rowData="orders"
                       :modules="modules"
          >
          </ag-grid-vue>
        </div>
      </div>
    </v-row>
  </v-col>
</template>

<script>
// import { AgGridVue } from 'ag-grid-vue'
import { AllCommunityModules } from '@ag-grid-community/all-modules'
import { ModuleRegistry } from '@ag-grid-community/core'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { CsvExportModule } from '@ag-grid-community/csv-export'
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export'
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail'
import axios from 'axios'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      order: [],
      columnDefs: null,
      rowData: null,
      modules: AllCommunityModules,
      ClientSideRowModelModule,
      CsvExportModule,
      ExcelExportModule,
      MasterDetailModule,
      ModuleRegistry,
      headers: [
        {
          text: 'Артикул',
          value: 'productCode'
        },
        {
          text: 'Заказано',
          value: 'orderQuantity'
        },
        {
          text: 'Выполнено',
          value: 'completeQuantity'
        }
      ]
    }
  },
  // mounted() {
  //   axios.get(url + '/plan').then(response => {
  //     this.results = response.data.rowData
  //   })
  // },
  beforeMount() {
    this.columnDefs = [
      { headerName: 'Артикул ', field: 'productCode', sortable: true, filter: true, flex: 1 },
      { headerName: 'Заказано, шт ', field: 'orderQuantity', sortable: true, filter: true, flex: 1 },
      { headerName: 'Выполнено, шт ', field: 'completeQuantity', sortable: true, filter: true, flex: 1 },
      { headerName: 'Цена', field: 'price', sortable: true, filter: true, flex: 1 },
      { headerName: 'Дата создания ', field: 'creationDate', sortable: true, filter: true, flex: 1 },
      { headerName: 'Срок готовности ', field: 'readinessDate', sortable: true, filter: true, flex: 1 }
    ]

    // this.orders = [
    //   { productCode: 'Toyota', orderQuantity: 'Celica', price: 35000 },
    //   { productCode: 'Ford', orderQuantity: 'Mondeo', price: 32000 },
    //   { productCode: 'Porsche', orderQuantity: 'Boxter', price: 72000 }
    // ]
  },

  // async mounted() {
  //   const res = await fetch('http://192.168.0.155:8080/plan/orders/get_notcompleteorders/3')
  //   const posts = await res.json()
  //   this.posts = posts
  //   console.log(this.posts)
  // },

  computed: {
    // allOrders() {
    //   return this.$store.getters.allOrders
    // }
    ...mapGetters('orders', ['orders'])
    // ...mapGetters('orders', ['allOrders'])
  },
  mounted() {
    // this.$store.dispatch('fetchOrders')
    // await this.fetchOrders()
    console.log(this.order)
  },

  methods: {
    async getOrders(e) {
      const { data } = await this.$appService.getOrders(e)
      this.order = data
    }
    // async inOrders(){
    //    await this.$appService.get(this.localePath('/orders'+ {supplier_id: 3}))
    // }

  }
  // created() {
  //   this.$router.replace('/orders')
  // }

}
</script>

<style>
.ag-header-cell-label {
  justify-content: center;
}
</style>
