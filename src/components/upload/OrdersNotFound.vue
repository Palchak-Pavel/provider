<template>
    <v-card height="30vh" id="orders_not_found" class="elevation-0">
        <v-card-title>{{title}}</v-card-title>
        <v-card-text>
            <bryntum-grid v-if="gridConfig" v-bind="gridConfig"/>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['orders', 'title'],
    data() {
        return {
            gridConfig: {
                ripple : {
                    delegate : '.b-grid-header'
                },
                appendTo: 'orders_not_found',
                columns: [
                    {
                        text: `${this.$t('catalog.productCode')}`,
                        field: 'productCode',
                        flex : 1,
                        editor : false
                    },
                    {
                        text: `${this.$t('ecommerce.orderQuantity')}`,
                        field: 'orderQuantity',
                        flex : 1,
                        editor : false
                    },
                    {
                        text: `${this.$t('catalog.creationDate')}`,
                        field: 'creationDate',
                        flex : 1,
                        editor : false
                    }
                ],
                data: this.orders
            }
        }
    }
}
</script>

<style scoped>

</style>
