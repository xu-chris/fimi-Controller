<template>
  <q-page class="q-pa-md">
    <div class="text-h3">{{trainings[id].name}}</div>
    <q-chip color="grey-9" text-color="white" icon="alarm" :label="trainings[id].duration" />
    <p>Classic exercises to increase your health.</p>
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
