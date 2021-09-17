<!--<template>-->
<!--  <div class="d-flex flex-grow-1 flex-column">-->
<!--    <client-only>-->
<!--      <v-row class="flex-grow-0" dense>-->
<!--        <v-col cols="12">-->
<!--       <div>-->
<!--         <h3>Заказы</h3>-->

<!--         <ag-grid-vue style="width: 500px; height: 500px;"-->
<!--                      class="ag-theme-balham"-->
<!--                      :columnDefs="columnDefs"-->
<!--                      :rowData="rowData"-->
<!--                      :modules="modules">-->
<!--         </ag-grid-vue>-->
<!--       </div>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </client-only>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { AgGridVue } from "ag-grid-vue";-->
<!--import {AllCommunityModules} from '@ag-grid-community/all-modules';-->
<!--import { ModuleRegistry } from '@ag-grid-community/core';-->
<!--import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";-->
<!--import { CsvExportModule } from "@ag-grid-community/csv-export";-->
<!--import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";-->
<!--import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";-->
<!--export default {-->
<!--  name: 'App',-->
<!--  data() {-->
<!--    return {-->
<!--      columnDefs: null,-->
<!--      rowData: null,-->
<!--      modules: AllCommunityModules,-->
<!--      ClientSideRowModelModule,-->
<!--      CsvExportModule,-->
<!--      ExcelExportModule,-->
<!--      MasterDetailModule,-->
<!--      ModuleRegistry-->
<!--    }-->
<!--  },-->
<!--  components: {-->
<!--    AgGridVue-->
<!--  },-->
<!--  beforeMount() {-->
<!--    this.columnDefs = [-->
<!--      {headerName: "Make",  field: 'make', sortable: true, filter: true },-->
<!--      {headerName: "Model",  field: 'model', sortable: true, filter: true },-->
<!--      {headerName: "Price",  field: 'price', sortable: true, filter: true }-->
<!--    ];-->

<!--    this.rowData = [-->
<!--      { make: 'Toyota', model: 'Celica', price: 35000 },-->
<!--      { make: 'Ford', model: 'Mondeo', price: 32000 },-->
<!--      { make: 'Porsche', model: 'Boxter', price: 72000 }-->
<!--    ];-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
