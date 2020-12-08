<template>
  <q-page class="q-pa-md">
    <div class="row wrap">
      <div class="col-xs-12 col-s-6 col-md-4 q-pa-xs" v-for="n in trainings" :key="`sm-${n}`">
        <q-card class="trainings-card">
          <q-card-section>
            <div class="text-h6">{{n.name}}</div>
            <div class="text-subtitle2">{{n.duration}}</div>
          </q-card-section>

          <q-separator />

          <q-card-actions vertical>
            <q-btn @click="openTraining(n)" flat>Launch training</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

const trainings = [
  {
    id: 0,
    name: 'Squat-arm-raise',
    duration: '2 minutes'
  },
  {
    id: 1,
    name: 'HIIT',
    duration: '60 minutes'
  }
]

export default {
  name: 'PageIndex',
  data () {
    return {
      trainings: trainings
    }
  },
  beforeMount () {
    this.getTrainings()
  },
  methods: {
    openTraining: function (training) {
      var message = 'SELECT_TRAINING\n' + training.id
      this.$axios.post(location.protocol + '//' + location.hostname + ':1234', message)
        .then((response) => {
          this.trainings = response.data
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
      this.$router.push({ name: 'Training', params: { id: this.n.id } })
    },
    getTrainings: function () {
      this.$axios.post(location.protocol + '//' + location.hostname + ':1234', 'GET_TRAININGS')
        .then((response) => {
          this.trainings = response.data
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>
