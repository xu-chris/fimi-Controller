<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black text-white no-shadow">
        <transition name="slide-fade"  enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <q-btn style="position:absolute" flat @click="$router.go(-1)" round dense icon="chevron_left" class="q-mr-sm" v-if="$route.path != '/'" />
        </transition>
        <q-toolbar-title class="text-center logo-container">
          <img class="logo" src="~assets/logo-white.svg" height="40px" alt="fimi logo" />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <transition name="slide-fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
.logo
  margin-bottom: -10px
  transition: all .3s ease

  path
    color: white
    fill: white

.logo-container
  transition: all .3s ease

// .slide-fade-enter-active
//   transition: all .3s ease

// .slide-fade-leave-active
//   transition: all .3s ease

// .slide-fade-leave-to
//   transform: translateX(10px)
//   opacity: 0

// .slide-fade-enter
//   transform: translateX(-10px)
//   opacity: 0

// .slide-fade-enter-to
//   transform: translateX(0px)
//   opacity: 1

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
