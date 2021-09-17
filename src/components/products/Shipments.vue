<template>
  <div>
    <h3>Отгрузки</h3>
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
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  props: ['supplierID'],

  data() {
    return {
      order: [],
      rowData: null,
      rowSelectionType: 'single',
      columnDefs: [
        {
          headerName: 'Артикул ',
          field: 'productCode',
          filter: 'agSetColumnFilter',

        },
        {
          headerName: 'Указание на отгрузку, шт',
          field: 'deliveryQuantity',
          filter: 'agSetColumnFilter',
        },
        {
          headerName: 'Выполнено, шт ',
          field: 'completeQuantity',
          filter: true,
        },
        {
          headerName: 'Дата создания ',
          field: 'creationDate',
          filter: 'agDateColumnFilter',
        },
        {
          headerName: 'Срок отгрузки',
          field: 'dueDate',
          filter: true,
        }
      ],
      // localeText: {
      //   applyFilter: 'OK',
      //   cancelFilter: 'Cancel',
      //   resetFilter: 'Clear Filter',
      // },
      defaultColDef: {
        flex: 1,
        sortable: true,
        filterParams: { applyMiniFilterWhileTyping: true, buttons: ['clear', 'apply'] }

      }
    }
  },

  async mounted() {
    const res = await fetch('http://192.168.0.155:8080/plan/deliveries/get_notcompletedeliveries/3')
    const order = await res.json()
    this.order = order
  },

  computed: {
    ...mapGetters('orders', ['orders'])
  },
}
</script>

<style>
.ag-header-cell-label {
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
