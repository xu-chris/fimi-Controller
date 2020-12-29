<template>
  <q-page class="q-pa-md">
    <q-timeline color="secondary">
      <q-timeline-entry heading tag="h5">
        You're in a training: {{training.name}}
      </q-timeline-entry>

      <q-separator />

      <q-timeline-entry heading tag="h6">
        Exercises
      </q-timeline-entry>

      <q-timeline-entry v-for="n in training.exercises" :key="`sm-${n.id}`"
        :title="n.name"
        :icon="getIcon(n)"
        :color="getColor(n)"
        :subtitle="getDurationInMinutesAsLabel(n.durationInSeconds)"
        :body="n.description"
      />
    </q-timeline>
    <q-footer bordered class="bg-grey-10 q-pa-sm text-center">
      <q-btn outline class="full-width" color="primary" label="Cancel training" @click="showCancelConfirm = true" />
  </q-footer>
  <q-dialog v-model="showCancelConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Do you really want to cancel your training?</div>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn flat label="Continue" color="primary" v-close-popup />
          <q-btn flat label="Cancel Training" color="red" v-close-popup @click="cancelWorkout()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

const training = {
  name: 'Move your body',
  durationInSeconds: 60,
  currentExercise: 1,
  exercises: [
    {
      id: 0,
      name: 'Squat arm raise',
      durationInSeconds: 60,
      type: 'exercise',
      description: 'Raise your arms until they are lifted horizontally. Squat in the same time.'
    },
    {
      id: 1,
      name: 'Pause',
      type: 'pause',
      durationInSeconds: 10
    },
    {
      id: 2,
      name: 'Squat arm raise',
      type: 'exercise',
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
      training: training,
      showCancelConfirm: false
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    cancelWorkout: function () {
      this.$router.push({ name: 'After Training' })
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
      var icon = (exercise.type === 'pause' ? 'pause' : null)
      icon = (training.currentExercise > exercise.id ? 'done' : icon)
      return icon
    },
    getColor: function (exercise) {
      var color = 'blue-grey-9'
      if (training.currentExercise === exercise.id) {
        color = 'secondary'
      } else if (training.currentExercise > exercise.id) {
        color = 'blue-grey-10'
      }
      return color
    }
  }
}
</script>
