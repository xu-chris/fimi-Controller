<template>
  <q-page class="q-pa-md">

    <q-timeline color="secondary">
      <q-timeline-entry heading tag="h4">
        {{data.name}} <q-chip color="grey-9" text-color="white" :label="getDurationInMinutesAsLabel(getTotalDuration())" />
      </q-timeline-entry>

      <q-separator />

      <q-timeline-entry heading tag="p">
        {{data.description}}
      </q-timeline-entry>

      <q-timeline-entry heading tag="h6">
        Exercises in this training
      </q-timeline-entry>

      <q-timeline-entry v-for="n in data.exercises" :key="`sm-${n}`"
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

export default {
  name: 'Training',
  data () {
    return {
      checkIfTrainingIsActive: true,
      interval: null
    }
  },
  computed: {
    loading: {
      get () {
        return this.$store.state.data.loading
      }
    },
    data: {
      get () {
        return this.$store.state.data.currentTraining
      }
    }
  },
  created () {
    this.$store.dispatch('data/getCurrentTraining')
  },
  methods: {
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
      return (exercise.type === 'pause' ? 'pause' : null)
    },
    getColor: function (exercise) {
      return (exercise.type === 'pause' ? 'blue-grey-9' : null)
    }
  }
}
</script>
