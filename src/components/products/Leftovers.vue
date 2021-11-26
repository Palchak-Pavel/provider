<template>
  <v-col cols = "12">
    <v-card flat>
      <v-card-title>{{ $t('ecommerce.leftovers') }}</v-card-title>
      <v-card-text>
        <client-only>
          <v-btn class = "mr-1 mb-1 blue lighten-1 white--text" @click = "getLeftovers">{{ $t('common.refreshTable') }}</v-btn>
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

          <v-card flat>
            <ag-grid-vue style = "width: 80vw; height: 90vh;"
                         class = "ag-theme-balham"
                         :columnDefs = "columnDefs"
                         :rowData = "leftovers"
                         :defaultColDef = "defaultColDef"
                         :rowSelection = "rowSelectionType"
                         :enableCellTextSelection = "true"
                         :header-height = "50"
                         :row-height = "39"
                         :cellButton = "cellButton"
                         @cell-value-changed = "updateLeftovers"
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

export default {
  data() {
    return {
      dialog: false,
      files: [],
      rowData: null,
      rowSelectionType: 'single',
       cellButton: null,
      columnDefs: [
        {
          headerName: `${this.$t('catalog.productCode')}`,
          field: 'productCode',
          filter: 'agSetColumnFilter'

        },
        {
          headerName: `${this.$t('catalog.storeQuantity')}`,
          field: 'storeQuantity',
          filter: 'agNumberColumnFilter',
          editable: true,
          cellClass: 'cell-wrap-text',
           // valueGetter: function (params) {
           //   if (this.storeQuantity < 0){
           //      return console.log( 0)
           //   }
           // },
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
            cellRenderer: 'cellButton',
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
    ...mapGetters('orders', ['leftovers']),
  },
beforeMount() {

   this.cellButton = (params)=> {
      let cssClass;
      let message;
      if (params.node.rowPinned) {
         cssClass = 'example-full-width-pinned-row';
         message = 'Pinned full width row at index ' + params.rowIndex;
      } else {
         cssClass = 'example-full-width-row';
         message = 'Normal full width row at index' + params.rowIndex;
      }
      const eDiv = document.createElement('div');
      eDiv.innerHTML =
        `'<div class="' +
           cssClass +
           '"><button>Click</button> ' +
           message +
           '</div>'`;
      const eButton = eDiv.querySelector('button');
      eButton.addEventListener('click', function () {
         alert('button clicked');
      });
   }
},

   methods: {
    async getLeftovers() {
      await this.$store.dispatch('orders/fetchLeftovers');
    },


     //TODO: добавить валидацию: значение в ячейке не может быть меньще 0
    async updateLeftovers(value) {
      let payload = {
        supplierRestID: parseInt(value.data.supplierRestID),
        storeQuantity: value.data.storeQuantity
      };
      await this.$leftoversID.updateLeftovers(payload);
    },


     //TODO: не отправляются данные из парсера на сервер
    // ждать доработку
    async onFileChange(e) {
      if (e) {
        let parsedItems = await funcTarget(e, parseTwoColumns);
        let items = parsedItems.map(x => ({
          productCode: x.productCode,
          storeQuantity: x.productCount
        }));
        let payload = {
          supplierID: 3,
          supplierRestChanges: items,
          download: true
        };
        await this.$leftoversID.createLeftovers(payload);
        await this.getLeftovers();
      }
    },
  },
}
</script>

<style>
</style>
