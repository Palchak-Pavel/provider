<template>
  <v-app>
    <div
      v-shortkey="['ctrl', '/']"
      class="d-flex flex-grow-1"
      @shortkey="onKeyup"
    >
      <!-- Navigation -->
      <v-navigation-drawer
        v-model="drawer"
        :dark="menuTheme === 'dark'"
        :light="menuTheme === 'light'"
        :right="$vuetify.rtl"
        app
        class="elevation-1 d-print-none"
        floating
      >
        <template v-slot:prepend>
          <div class="pa-2" align="center">
            <v-img :src="require('../assets/images/logo.png')"></v-img>
<!--            <div class="title font-weight-bold text-uppercase primary--text">{{ product.name }}</div>-->
<!--            <div class="overline grey--text">{{ product.version }}</div>-->
            <span class="hidden-xs-only copyrights">Copyright © 2021 Goodfil LTD</span>
          </div>
        </template>

        <!-- Navigation menu -->
        <main-menu :menu="navigation.menu"/>

      </v-navigation-drawer>

      <!-- Toolbar -->
      <v-app-bar
        app
        :color="isToolbarDetached ? 'surface' : undefined"
        :flat="isToolbarDetached"
        :light="toolbarTheme === 'light'"
        :dark="toolbarTheme === 'dark'"
        dense
      >
        <v-spacer></v-spacer>

        <toolbar-language/>

        <toolbar-user/>

      </v-app-bar>

      <v-main>
        <v-container class="fill-height" :fluid="!isContentBoxed">
          <v-layout>
            <nuxt/>
          </v-layout>
        </v-container>

        <v-footer app inset>
          <v-spacer></v-spacer>
          <div class="overline">
            <a class="text-decoration-none" target="_blank">GoodWill</a>
          </div>
        </v-footer>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

// navigation menu configurations
import config from '../configs'

import MainMenu from '../components/navigation/MainMenu'
import ToolbarUser from '../components/toolbar/ToolbarUser'
import ToolbarApps from '../components/toolbar/ToolbarApps'
import ToolbarLanguage from '../components/toolbar/ToolbarLanguage'
import ToolbarCurrency from '../components/toolbar/ToolbarCurrency'
import ToolbarNotifications from '../components/toolbar/ToolbarNotifications'

export default {
  components: {
    MainMenu,
    ToolbarUser,
    ToolbarApps,
    ToolbarLanguage,
    ToolbarCurrency,
    ToolbarNotifications
  },
  data() {
    return {
      drawer: null,
      showSearch: false,
      navigation: config.navigation
    }
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached'])
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus()
    }
  }
}
</script>

<style scoped>
.buy-button {
  box-shadow: 1px 1px 18px #ee44aa;
}
</style>
