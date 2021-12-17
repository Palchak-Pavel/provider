<template>
  <v-card width="100%" height="85vh" id="container">
    <v-card-title>{{ $t('ecommerce.shipments') }}</v-card-title>
    <v-card-text>
      <client-only>
        <v-row class="pt-0 pb-0">
          <v-col xs="6" class="pt-0 pb-0">
            <template>
              <v-btn small
                     color="primary"
                     dark
                     @click="updateDeliveries">{{
                  $t('common.refreshTable')
                }}
              </v-btn>
            </template>

              <template >
                <v-btn small
                       color="primary"
                       dark
                       @click="exportGrid"
                >
                  Экспорт в Excel
                </v-btn>
              </template>

            <bryntum-grid v-if="gridConfig" v-bind="gridConfig" ref="grid"/>

          </v-col>
        </v-row>
      </client-only>
    </v-card-text>
  </v-card>
</template>

<script>
import zipcelx from "zipcelx";
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      deliveriesUploadDialog: false,
      suppliers: [],
      productsNotFound: [],
      gridConfig: {
        appendTo: 'container',
        excelExporterFeature: {
          filename: 'Прайс-лист',
          // pass the export library to exporter feature
          zipcelx
        },
        features: {
          filterBar: {
            compactMode: true,
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
            flex: 1,
            editor: false,
          },

          {
            text: `${this.$t('ecommerce.deliveryQuantity')}`,
            field: 'deliveryQuantity',
            flex: 1,
            type: 'number'
          },
          {
            text: `${this.$t('ecommerce.completeQuantity')}`,
            field: 'completeQuantity',
            flex: 1,
            type: 'number'
          },
          {
            text: `${this.$t('catalog.creationDate')}`,
            field: 'creationDate',
            flex: 1,
            type: 'date',
            format: 'DD.MM.YYYY'
          },

          {
            text: `${this.$t('catalog.dueDate')}`,
            field: 'dueDate',
            flex: 1,
            editor: false
          },
        ],
        data: [],
        // listeners: {
        //     finishCellEdit: this.updatePriceList
        // }
      },
    }
  },

  async beforeMount() {
    await this.getData();
  },

  methods: {

    async getData() {
      const {data} = await this.$axios.get('plan/deliveries');
      data.forEach(x => {
        x.creationDate = new Date(x.creationDate)
      });
      this.gridConfig.data = data;
    },

    // TODO: При нажатии на кнопку обновления страницы выдаёт ошибку (Cannot read properties of undefined (reading 'record'))
    async updateDeliveries(event) {
      let payload = event.editorContext.record.data;
      const response = await this.$axios.put('/plan/deliveries', payload);
    },

    exportGrid() {
      const {
        instance: {
          features: {excelExporter}
        }
      } = this.$refs.grid;
      excelExporter.export();
    },
  }
}
</script>

<style scoped>

#container {
  height: 77vh;
}

</style>
