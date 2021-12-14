<template>
    <div >
        <v-col cols="12" class="pb-0">
            <v-row class="pb-0" >
                    <v-file-input
                        color = "blue lighten-1"
                        class = "pl-2 pt-2 pr-2"
                        label = "Выберите файл"
                        prepend-icon = "mdi-paperclip"
                        outlined
                        dense
                        @change = "onFileChange"
                    >
                    </v-file-input>
            </v-row>
        </v-col>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },

    methods: {
        onFileChange(event) {
            if(event) {
                this.$emit('fileChange', {
                    supplierID: this.supplierID,
                    fileChangeEvent: event
                });
            }
        }
    }
}
</script>

<style scoped>

</style>
