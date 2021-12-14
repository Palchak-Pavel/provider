<template>
  <v-card width="100%" height="85vh" id="container">
    <v-card-title>{{ $t('ecommerce.leftovers') }}</v-card-title>
    <v-card-text >

      <div class="toolbar">
        <template>
          <v-btn small
                 color="primary"
                 dark @click="updateRest"
          >{{ $t('common.refreshTable') }}
          </v-btn>
        </template>

        <template>
          <v-btn small
                 color="primary"
                 dark
                 @click="dialog = true"
          >
            {{ $t('common.uploadFile') }}
          </v-btn>
        </template>
      </div>

      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-file-input
            v-model="files"
            color="blue lighten-1"
            class="pl-2 pt-2 pr-2"
            label="Выберите файл"
            prepend-icon="mdi-paperclip"
            outlined
            :show-size="1000"
            @change="onFileChange"
          >
          </v-file-input>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="ml-1 mb-1 blue lighten-1 white--text"
              @click="dialog = false"
            >
              Закрыть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card flat>
        <bryntum-grid v-if="gridConfig" v-bind="gridConfig" ref="grid"/>

      </v-card>

    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import zipcelx from "zipcelx";
import {CurrencyTypes} from "../../js/enums";
import {funcTarget, parseThreeColumns, parseTwoColumns} from "../../js/parser";

export default {
  data() {
    return {
      dialog: false,
      files: [],
      supplier: null,
      suppliers: [],
      rests: [],
      restsUploadDialog: false,
      gridConfig: {
        appendTo: 'container',
        excelExporterFeature: {
          filename: 'Остатки',
          // pass the export library to exporter feature
          zipcelx
        },
        features: {
          filterBar: {
            compactMode: true,
          },
          stripe: true,
          quickFind: true,
          summary: true
        },

        ripple: {
          delegate: '.b-grid-header'
        },
        columns: [
          {
            text: `${this.$t('catalog.productCode')}`,
            field: 'productCode',
            editor: false,
            flex: 1,
            sum: 'count',
            summaryRenderer: ({sum}) => {
              return 'Итого: ' + sum + ' тов.'
            }
          },
          {
            text: `${this.$t('catalog.storeQuantity')}`,
            field: 'storeQuantity',
            flex: 1,
            sum: 'sum',
            renderer: renderData => {
              return new Intl.NumberFormat('ru-Ru', {maximumSignificantDigits: 3}).format(renderData.value);
            },
            summaryRenderer: ({sum}) => {
              return new Intl.NumberFormat('ru-Ru', {maximumSignificantDigits: 3}).format(sum)
            }
          },
          {
            text: `${this.$t('ecommerce.price')}`,
            field: 'price',
            editor: false,
            flex: 1,
            renderer: renderData => {
              return new Intl.NumberFormat('ru-Ru', {
                style: 'currency',
                currency: this.currency
              }).format(renderData.value);
            }
          },
          {
            text: `${this.$t('ecommerce.sum')}`,
            editor: false,
            flex: 1,
            sum: (result, current, index) => {
              if (index === 0) result = current.storeQuantity * current.price;
              else result += current.storeQuantity * current.price;
              return result;
            },
            summaryRenderer: ({sum}) => {
              return new Intl.NumberFormat('ru-Ru', {style: 'currency', currency: this.currency}).format(sum);
            },
            renderer: renderData => {
              let value = renderData.record.storeQuantity * renderData.record.price;
              return new Intl.NumberFormat('ru-Ru', {style: 'currency', currency: this.currency}).format(value);
            }
          },

        ],
        listeners: {
          finishCellEdit: this.updateRest
        },
        data: []
      }
    }
  },
  computed: {
    ...mapGetters('orders', ['leftovers']),

    currency() {
      if (!this.supplier) return 'USD';
      return this.supplier.currencyTypeID === CurrencyTypes.USD ? 'USD' : 'RUB';
    }
  },

  async beforeMount() {
    await this.getRests();
  },


  methods: {

    async getRests() {
      let params = new URLSearchParams();
      //params.append("supplierID", this.supplier.supplierID);
      const {data} = await this.$axios.get('/plan/rests',);
      this.gridConfig.data = data;
    },


    async updateRest(event) {
      let payload = event.editorContext.record.data;
      const response = await this.$axios.put('/plan/rests', payload);
    },

    async onFileChange(event) {
      if (event) {
        let result = await funcTarget(event, parseTwoColumns);
        let rests = result.map(x => ({
          productCode: x.productCode,
          storeQuantity: x.productCount
        }));
        let payload = {
          supplierID: 0,
          rests: rests
        };
        const response = await this.$axios.post('/plan/rests', payload);
        console.log(response);
        if (response.status === 204) {
          this.restsUploadDialog = false;
          await this.getRests();
        }
      }
    }
  },
}
</script>

<style scoped>
#container {
  height: 75vh;
}
</style>
