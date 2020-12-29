<template>
  <q-page class="q-pa-md">
    <q-timeline color="secondary">
      <q-timeline-entry heading tag="h4">
        {{training.name}} <q-chip color="grey-9" text-color="white" :label="getDurationInMinutesAsLabel(getTotalDuration())" />
      </q-timeline-entry>

      <q-separator />

      <q-timeline-entry heading tag="h6">
        Exercises in this training
      </q-timeline-entry>

      <q-timeline-entry v-for="n in training.exercises" :key="`sm-${n}`"
        :title="n.name"
        :icon="getIcon(n)"
        :color="getColor(n)"
        :subtitle="getDurationInMinutesAsLabel(n.durationInSeconds)"
        :body="n.description"
      />
    </q-timeline>
    <q-footer bordered class="bg-grey-10 q-pa-sm text-center">
      <div class="text-h6">Continue on the screen <q-icon name="airplay" /></div>
      <div class="text-caption">You don't need your smartphone during training</div>
    </q-footer>

    <q-inner-loading :showing="loading">
      <q-spinner-ios size="30px" color="white" />
    </q-inner-loading>
  </q-page>
</template>

<script>

const training = {
  name: 'Move your body',
  durationInSeconds: 60,
  exercises: [
    {
      id: 0,
      name: 'Squat arm raise',
      durationInSeconds: 60,
      type: 'exercise',
      state: 'done',
      description: 'Raise your arms until they are lifted horizontally. Squat in the same time.'
    },
    {
      id: 1,
      name: 'Pause',
      type: 'pause',
      state: 'current',
      durationInSeconds: 10
    },
    {
      id: 2,
      name: 'Squat arm raise',
      type: 'exercise',
      state: 'upcoming',
      durationInSeconds: 130,
      description: 'Raise your arms until they are lifted horizontally. Squat in the same time.'
    }
  ]
}

export default {
  name: 'PageIndex',
  data () {
    return {
      id: 0,
      training: [],
      loading: true
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    getTrainingInfo: function () {
      var message = 'GET_TRAINING\n' + this.id
      this.$axios.post(location.protocol + '//' + location.hostname + ':1234', message)
        .then((response) => {
          this.trainings = response.data
          this.loading = false
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    },
    getDurationInMinutesAsLabel: function (durationInSeconds) {
      var minutes = Math.floor(durationInSeconds / 60)
      var seconds = durationInSeconds % 60
      return (minutes !== 0 ? minutes + ' min' : '') + (seconds !== 0 ? ' ' + seconds + ' sec' : '')
    },
    getTotalDuration: function () {
      var result = 0
      training.exercises.forEach(element => {
        result += element.durationInSeconds
      })
      return result
    },
    getIcon: function (exercise) {
      return (exercise.type === 'pause' ? 'pause' : null)
    },
    getColor: function (exercise) {
      return (exercise.type === 'pause' ? 'blue-grey-9' : null)
    }
  }
}
</script>
