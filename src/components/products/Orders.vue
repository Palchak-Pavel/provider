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

                <!-- События должны ссылаться на методы/функции, а не на поля из data. Так делать не надо. -->
<!--               <v-btn @click = "localeTextFunc" color = "primary">-->
<!--                  RU-->
<!--               </v-btn>-->

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
                               :localeText = "agGridLocale"
                               :suppressClickEdit="true"
                               :frameworkComponents="frameworkComponents"
                               @cell-value-changed = "updateOrders"
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
import OrderID from '../../js/services/orderID'
import BtnCellRenderer from "../../js/btn-cell-renderer.js";

export default {
   data() {
      return {
         orders: [],
         dialog: false,
         files: [],
         rowData: null,
         rowSelectionType: 'single',
         cellRenderer: null,
         cellButton: null,
         frameworkComponents: null,
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
               field: 'completeQuantity', // <--------------- Редактируемые ячейки
               filter: true,
               editable: true,
               cellClass: 'cell-wrap-text',
               valueParser: function (params) {
                  return Number(params.newValue);
               },
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
               field: 'readinessDate', // <-------------------  Редактируемые ячейки
               filter: true,
               editable: true,
               cellClass: 'cell-wrap-text',
               cellRenderer: (data) => {
                  return data.value ? (new Date(data.value)).toLocaleDateString() : ''
               }
            },
            {
               field: "Выполнено",
               cellRenderer: "btnCellRenderer",// <------------ Кнопка "Выполнено"
               cellRendererParams: {
                  clicked: function() {
                     alert( 'was clicked');
                  }
               },
               minWidth: 150
            }
         ],

         defaultColDef: {
            minWidth: 130,
            flex: 1,
            sortable: true,
            filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] }
         },

      }
   },

   computed: {
      // ...mapGetters('orders', ['orders']),

      // TODO: сделать computed для locale и передать его в localeText
      // Правильным решением будет убрать это свойство в store, чтобы не высчитывать на каждой странице
      agGridLocale() {
         return this.$vuetify.lang.current === 'ru' ? AG_GRID_LOCALE_RU : AG_GRID_LOCALE_EN;
      },


   },

   async beforeMount() {
      const { data } = await this.$orderID.getOrders();
      this.orders = data

      this.frameworkComponents = {
         btnCellRenderer: BtnCellRenderer
      };
      // this.cellButton = ()=> {
      //    const eDiv = document.createElement('div');
      //    eDiv.innerHTML =
      //      `'<div class="' +
      //      cssClass +
      //      '"><button>Click</button> ' +
      //      message +
      //      '</div>'`;
      //    const eButton = eDiv.querySelector('button');
      //    eButton.addEventListener('click', function () {
      //       alert('button clicked');
      //    });
      // }
   },

   methods: {
      async getOrders() {
         await this.$store.dispatch('orders/fetchOrders')
      },

      // TODO: добавить метод обновления заказа.
      async updateOrders(value) {
         try {
            await this.$orderID.updateOrders(value);

         } catch (error) {
            console.log(error);
         }
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
   },
}

</script>

<style>
</style>
