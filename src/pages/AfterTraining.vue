<template>
  <q-page class="q-pa-md">
    <div class="text-h3">Your results for working out {{trainings[id].name}}</div>
    <q-chip color="grey-9" text-color="white" icon="alarm" :label="trainings[id].duration" />
    <q-footer bordered class="bg-grey-10 q-pa-sm text-center">
      <q-btn class="full-width" size="lg" color="primary" label="Back to trainings" to="/" />
  </q-footer>
  </q-page>
</template>

<script>

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
      id: 0,
      trainings: trainings
    }
  },
  created () {
    this.id = this.$route.params.id
  }
}
</script>
