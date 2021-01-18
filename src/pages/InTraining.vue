<template>
  <q-page class="q-pa-md">
    <q-timeline color="secondary">
      <q-timeline-entry heading tag="h5">
        You're in a training: {{data.name}}
      </q-timeline-entry>

      <q-separator />

      <q-timeline-entry heading tag="h6">
        Exercises
      </q-timeline-entry>

      <q-timeline-entry v-for="n in data.exercises" :key="`sm-${n.id}`"
        :title="n.name"
        :icon="getIcon(n)"
        :color="getColor(n)"
        :subtitle="getDurationInMinutesAsLabel(n.durationInSeconds)"
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
          <q-btn flat label="Cancel Training" color="red" @click="cancelWorkout()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

export default {
  name: 'InTraining',
  data () {
    return {
      showCancelConfirm: false
    }
  },
  computed: {
    data: {
      get () {
        return this.$store.dispatch('data/getCurrentTraining')
      }
    }
  },
  created () {
    this.interval = setInterval(this.getCurrentTraining(), 1000)
  },
  beforeMount () {
    this.getCurrentTraining()
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.interval)
  },
  methods: {
    getCurrentTraining: function () {
      this.$store.dispatch('data/getCurrentTraining')
    },
    cancelWorkout: function () {
      this.$store.dispatch('data/cancelTraining', this.id)
    },
    getDurationInMinutesAsLabel: function (durationInSeconds) {
      var minutes = Math.floor(durationInSeconds / 60)
      var seconds = durationInSeconds % 60
      return (minutes !== 0 ? minutes + ' min' : '') + (seconds !== 0 ? ' ' + seconds + ' sec' : '')
    },
    getTotalDuration: function () {
      var result = 0
      this.data.exercises.forEach(element => {
        result += element.durationInSeconds
      })
      return result
    },
    getIcon: function (exercise) {
      var icon = (exercise.name === 'Pause' ? 'pause' : null)
      icon = (this.data.currentExercise > exercise.id ? 'done' : icon)
      return icon
    },
    getColor: function (exercise) {
      var color = 'blue-grey-9'
      if (this.data.currentExercise === exercise.id) {
        color = 'secondary'
      } else if (this.data.currentExercise > exercise.id) {
        color = 'blue-grey-10'
      }
      return color
    }
  }
}
</script>
