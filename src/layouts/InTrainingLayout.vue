<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
    <q-header elevated>
      <q-toolbar class="bg-black text-white no-shadow">
        <q-toolbar-title class="text-center">
          <img class="logo" src="~assets/logo-white.svg" height="40px" alt="fimi logo" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
      <transition name="slide-fade">
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
.logo
  margin-bottom: -10px

  path
    color: white
    fill: white

.slide-fade-enter-active
  transition: all .3s ease

.slide-fade-leave-active
  transition: all .3s ease

.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(10px)
  opacity: 0
</style>

<script>
import { Dark } from 'quasar'

Dark.set(true)

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>
