<template>
  <v-col cols = "12">
    <v-card flat>
      <v-card-title>Остатки</v-card-title>
      <v-card-text>
        <client-only>
          <v-btn class = "mr-1 mb-1 blue lighten-1 white--text" @click = "getLeftovers">Обновить таблицу</v-btn>
          <v-btn
              class = "mr-1 mb-1 blue lighten-1 white--text"
              color = "primary"
              dark
              @click = "dialog = true"
          >
            Загрузить файл
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
                    color = "primary"
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
                         :rowData = "order"
                         :defaultColDef = "defaultColDef"
                         :rowSelection = "rowSelectionType"
                         :enableCellTextSelection = "true"
                         :header-height = "50"
                         :row-height = "39"
                         :gridReady = "onGridReady"
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
import { mapGetters, mapActions, mapState } from 'vuex'
import { funcTarget, parseTwoColumns } from '~/js/parser'

export default {
  // props: ['supplierID'],

  data() {
    return {
      dialog: false,
      files: [],
      order: [],
      selectedCustomerID: null,
      orderLines: [],
      rowData: null,
      rowSelectionType: 'single',
      columnDefs: [
        {
          headerName: 'Артикул ',
          field: 'productCode',
          filter: 'agSetColumnFilter'

        },
        {
          headerName: 'Количество на складе, шт',
          field: 'storeQuantity',
          filter: 'agNumberColumnFilter',
          editable: true,
          cellClass: 'cell-wrap-text',
          valueParser: function (params) {
            return Number(params.newValue);
          },
        },
        {
          headerName: 'Цена ',
          field: 'price',
          filter: true
        }
      ],

      defaultColDef: {
        gridApi: null,
        columnApi: null,
        flex: 1,
        sortable: true,
        filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] }
      }
    }
  },
  computed: {
    ...mapState('orders', ['orders', 'supplierID']),

    allowCreate() {
      return this.selectedCustomerID && this.orderLines.length > 0 && !this.orderNum
    }
  },
  async mounted() {
    await this.getLeftovers()
  },

  methods: {
    async getLeftovers() {
      const { data } = await this.$leftoversID.getLeftovers(this.supplierID)
      this.order = data
    },

    onGridReady(params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },

    async updateLeftovers(value) {
      let payload = {
        supplierRestID: parseInt(value.data.supplierRestID),
        storeQuantity: value.data.storeQuantity
      };
      await this.$leftoversID.updateLeftovers(payload);
    },

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
