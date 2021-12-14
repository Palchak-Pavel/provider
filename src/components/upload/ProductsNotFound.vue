<template>
    <v-card height="30vh" id="products_not_found" class="elevation-0">
        <v-card-title>{{title}}</v-card-title>
        <v-card-text>
            <bryntum-grid v-if="gridConfig" v-bind="gridConfig"/>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['products', 'title'],
    data() {
        return {
            gridConfig: {
                ripple : {
                    delegate : '.b-grid-header'
                },
                appendTo: 'products_not_found',
                columns: [
                    {
                        text: `${this.$t('catalog.productCode')}`,
                        field: 'productCode',
                        flex : 1,
                        editor : false
                    }
                ],
                data: this.products.map(productCode => ({productCode}))
            }
        }
    }
}
</script>

<style scoped>

</style>
