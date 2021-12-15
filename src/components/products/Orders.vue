<template>
  <v-card width="100%" height="85vh" id="container">
    <v-card-title>{{ $t('dashboard.orders') }}</v-card-title>
    <v-card-text height="100%">
      <div class="toolbar">

          <template>
            <v-btn small
                   color="primary"
                   dark
                   @click="updateOrder"
            >
              {{ $t('common.refreshTable') }}
            </v-btn>
          </template>

          <template>
            <v-btn small
                   color="primary"
                   dark
                   @click="exportGrid">
              Экспорт в Excel
            </v-btn>
          </template>
      </div>

      <v-card flat>
        <bryntum-grid v-bind="gridConfig" ref="grid"/>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>

import zipcelx from 'zipcelx';
import {CurrencyTypes} from "../../js/enums";
import {numberFormat, usdFormat, rubFormat} from "../../js/numberFormats";

export default {

  data() {
    return {
      gridConfig: {
        appendTo: 'container',
        excelExporterFeature: {
          filename: 'Текущий заказ на производство ' + new Date().toLocaleDateString(),
          // pass the export library to exporter feature
          zipcelx
        },
        features: {
          filterBar: {
            compactMode: true,
          },
          group: {
            field: 'supplier',
          },
          groupSummary: {
            collapseToHeader: false
          },
          stripe: true,
          quickFind: true
        },

        ripple: {
          delegate: '.b-grid-header'
        },
        columns: [
          {
            text: `${this.$t('catalog.productCode')}`,
            field: 'productCode',
            width: 150,
            editor: false
          },
          {
            text: `${this.$t('ecommerce.orderQuantity')}`,
            field: 'orderQuantity',
            type: 'number',
            width: 130,
            renderer: (renderData) => {
              return numberFormat.format(renderData.value);
            }
          },
          {
            text: `${this.$t('ecommerce.completeQuantity')}`,
            field: 'completeQuantity',
            type: 'number',
            flex: 1,
            renderer: (renderData) => {
              return numberFormat.format(renderData.value);
            }
          },

          {
            text: `${this.$t('ecommerce.price')}`,
            field: 'price',
            width: 120,
            type: 'number',
            renderer: (renderData) => {
              const record = renderData.record;
              return record.currencyTypeID == CurrencyTypes.USD ? usdFormat.format(renderData.value) : rubFormat.format(renderData.value)
            }
          },

          {
            text: `${this.$t('catalog.creationDate')}`,
            field: 'creationDate',
            width: 140,
            type: 'date',
            format: 'DD.MM.YYYY'
          },
          {
            text: `${this.$t('catalog.readinessDate')}`,
            field: 'readinessDate',
            flex: 1,
            type: 'date',
            format: 'DD.MM.YYYY'
          },
          {
            text: '',
            width: 150,
            type: 'widget',
            cellCls: 'completeQuantity',
            widgets: [{
              type: 'button',
              text: 'Выполнено',
              flex: 1,
              cls: 'b-blue b-raised',
              renderer({record, widgets}) {
                // Hide checkboxes in certain rows
                widgets[0].hidden = record.orderQuantity === record.completeQuantity;
              },
              onAction: async ({source: btn}) => {
                btn.cellInfo.record.completeQuantity = btn.cellInfo.record.orderQuantity;
                const response = await this.$axios.put("plan/orders", btn.cellInfo.record);
              }
            }]
          }
        ],
        data: [],
        listeners: {
          finishCellEdit: this.updateOrder
        }
      }
    }
  },

  async beforeMount() {
    await this.getOrders();
  },

  methods: {
    exportGrid() {
      const {
        instance: {
          features: {excelExporter}
        }
      } = this.$refs.grid;
      excelExporter.export();
    },

    async getOrders() {
      const {data} = await this.$axios.get("plan/orders");
      data.forEach(x => {
        x.creationDate = new Date(x.creationDate);
        x.readinessDate = isNaN(Date.parse(x.readinessDate)) ? null : new Date(x.readinessDate)
      });
      this.gridConfig.data = data;
    },

    // TODO: Не работает кнопка обновления таблицы
    async updateOrder(event) {
      // event.editorContext = undefined;
      let payload = event.editorContext.record.data;
      const response = await this.$axios.put("plan/orders", payload);
console.log(this.event)
    },

  },
}
</script>

<style scoped>
#container {
  height: 77vh;
}
</style>

