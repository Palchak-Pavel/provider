<template>
   <v-col cols = "12">
      <v-card flat>
         <v-card-title>{{ $t('dashboard.orders') }}</v-card-title>
         <v-card-text>
            <client-only>
               <v-btn class = "mr-1 mb-1 blue lighten-1 white--text" @click = "getOrders">{{
                     $t('common.refreshTable')
                                                                                          }}
               </v-btn>

               <v-btn
                 class = "mr-1 mb-1 blue lighten-1 white--text"
                 dark
                 @click = "dialog = true"
               >
                  {{ $t('common.uploadFile') }}
               </v-btn>

               <v-dialog
                 v-model = "dialog"
                 max-width = "500px"
               >
                  <v-card>
                     <v-file-input
                       v-model = "files"
                       color = "blue lighten-1"
                       class = "pl-2 pt-2 pr-2"
                       label = "Выберите файл"
                       prepend-icon = "mdi-paperclip"
                       outlined
                       :show-size = "1000"
                       @change = "onFileChange"
                     >
                     </v-file-input>

                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          class = "ml-1 mb-1 blue lighten-1 white--text"
                          @click = "dialog = false"
                        >
                           Закрыть
                        </v-btn>
                     </v-card-actions>
                  </v-card>
               </v-dialog>

               <v-btn @click = "localeTextFunc" color = "primary">
                  RU
               </v-btn>

               <v-card flat>
                  <ag-grid-vue style = "width: 80vw; height: 70vh;"
                               class = "ag-theme-balham"
                               :columnDefs = "columnDefs"
                               :rowData = "orders"
                               :defaultColDef = "defaultColDef"
                               :rowSelection = "rowSelectionType"
                               :enableCellTextSelection = "true"
                               :header-height = "50"
                               :row-height = "40"
                               :localeTextFunc = "localeTextFunc"
                               :sideBar = "sideBar"
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
import { funcTarget, parseTwoColumns } from '~/js/parser'
import { AG_GRID_LOCALE_RU } from '../../js/translations/ruAgGrid'
import {AG_GRID_LOCALE_EN} from '../../js/translations/default-locale-aggrid'

export default {
   data() {
      return {
         dialog: false,
         files: [],
         sideBar: null,
         localeTextFunc: null,
         localeText: null,
         rowData: null,
         rowSelectionType: 'single',
         moment: null,
         cellRenderer: null,
         columnDefs: [
            {
               headerName: `${this.$t('catalog.productCode')}`,
               field: 'productCode',
               filter: 'agSetColumnFilter'

            },
            {
               headerName: `${this.$t('ecommerce.orderQuantity')}`,
               field: 'orderQuantity',
               filter: 'agSetColumnFilter'
            },
            {
               headerName: `${this.$t('ecommerce.completeQuantity')}`,
               field: 'completeQuantity',
               filter: true
            },
            {
               headerName: `${this.$t('ecommerce.price')}`,
               field: 'price',
               filter: true
            },
            {
               headerName: `${this.$t('catalog.creationDate')}`,
               field: 'creationDate',
               filter: 'agDateColumnFilter',
               cellRenderer: (data) => {
                  return data.value ? (new Date(data.value)).toLocaleDateString() : ''
               }
            },
            {
               headerName: `${this.$t('catalog.readinessDate')}`,
               field: 'readinessDate',
               filter: true,
               cellRenderer: (data) => {
                  return data.value ? (new Date(data.value)).toLocaleDateString() : ''
               }
            }
         ],

         defaultColDef: {
            minWidth: 130,
            flex: 1,
            sortable: true,
            filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] }
         }
      }
   },

   beforeMount() {
      // this.localeText = AG_GRID_LOCALE_RU
      this.localeTextFunc= (key, defaultValue) => AG_GRID_LOCALE_RU[key] || AG_GRID_LOCALE_EN
// this.sideBar =true;

      // this.localeTextFunc = (key, defaultValue) => {
      //   // const data = AG_GRID_LOCALE_RU;
      //   // return data === key ? defaultValue : data;
      //
      //   // const gridKey = 'AG_GRID_LOCALE_RU' + key;
      //   //
      //   // // look the value up using an application wide service
      //   // return applicationLocaleService(gridKey);
      //   // return defaultValue ? AG_GRID_LOCALE_RU : '';
      // };
   },
   computed: {
      ...mapGetters('orders', ['orders'])
   },

   methods: {
      async getOrders() {
         await this.$store.dispatch('orders/fetchOrders')
      },

      async onFileChange(e) {
         if (e) {
            let parsedItems = await funcTarget(e, parseTwoColumns)
            let items = parsedItems.map(x => ({
               productCode: x.productCode,
               storeQuantity: x.productCount
            }))
            let payload = {
               supplierID: 3,
               supplierRestChanges: items,
               download: true
            }
            await this.$leftoversID.createLeftovers(payload)
            await this.getLeftovers()
         }
      }
   }
}
</script>

<style>
</style>
