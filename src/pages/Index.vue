<template>
  <q-page class="q-pa-md">
    <div>
      <h4>
        Choose a training
      </h4>
      <div class="row wrap">
        <div class="col-xs-12 col-s-6 col-md-4 q-pa-xs" v-for="n in trainings" :key="`sm-${n}`">
          <q-card class="trainings-card">
            <q-card-section>
              <div class="text-h6">{{n.name}}</div>
              <div class="text-subtitle2">{{getDurationInMinutesAsLabel(n.durationInSeconds)}}</div>
            </q-card-section>

            <q-separator />

            <q-card-actions vertical>
              <q-btn @click="openTraining(n)" flat>Launch training</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <q-inner-loading :showing="loading">
      <q-spinner-ios size="30px" color="white" />
    </q-inner-loading>
  </q-page>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

export default {
  name: 'Start',
  computed: {
    loading: {
      get () {
        return this.$store.state.data.loading
      }
    },
    trainings: {
      get () {
        return this.$store.state.data.trainings
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('data/getTrainings')
  },
  methods: {
    openTraining: function (training) {
      this.$store.dispatch('data/selectTraining', training.id)
    },
    getDurationInMinutesAsLabel: function (durationInSeconds) {
      var minutes = Math.floor(durationInSeconds / 60)
      var seconds = durationInSeconds % 60
      return (minutes !== 0 ? minutes + ' min' : '') + (seconds !== 0 ? ' ' + seconds + ' sec' : '')
    }
  }
}
</script>
