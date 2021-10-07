<template>
  <v-col cols="12">
    <v-card flat>
      <v-card-title>Заказы</v-card-title>
      <v-card-text>
        <client-only>
          <v-btn class="mr-1 mb-1 blue lighten-1 white--text" @click="getOrders">Обновить таблицу</v-btn>
          <v-card flat>
            <ag-grid-vue style="width: 80vw; height: 70vh;"
                         class="ag-theme-balham"
                         :columnDefs="columnDefs"
                         :rowData="orders"
                         :defaultColDef="defaultColDef"
                         :rowSelection="rowSelectionType"
                         :enableCellTextSelection="true"
                         :header-height="50"
                         :row-height="40"
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
import { mapGetters} from 'vuex'

export default {
  data() {
    return {
      rowData: null,
      rowSelectionType: 'single',
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
        minWidth: 130,
        flex: 1,
        sortable: true,
        filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] }
      }
    }
  },

  computed: {
    ...mapGetters('orders', ['orders'])
  },

  methods: {
    async getOrders() {
      await this.$store.dispatch('orders/fetchOrders');
    }
  }
}
</script>

<style>
</style>
