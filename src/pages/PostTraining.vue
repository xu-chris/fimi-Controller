<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item>
        <div class="text-h4">Training results for {{data.trainingName}} <q-chip color="grey-9" text-color="white" :label="getDurationInMinutesAsLabel(data.totalDurationInSeconds)" /></div>
      </q-item>
      <q-separator spaced />
      <q-item-label header>Here's where you have improved</q-item-label>

      <div v-for="n in data.improvements" :key="`sm-${n.name}`">
      <q-item>

        <q-item-section avatar>
          <q-icon name="arrow_upward" color="green" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{n.name}}</q-item-label>
          <q-item-label caption lines="2">{{n.explanation}}</q-item-label>
        </q-item-section>

      </q-item>

      <q-separator v-if="n != data.improvements.slice(-1)[0]" spaced inset="item" />

      </div>

      <q-separator spaced />
      <q-item-label header>Things you should watch next time</q-item-label>

      <div v-for="n in data.ruleViolations" :key="`sm-${n.name}`">
        <q-item>

          <q-item-section avatar>
            <q-icon name="error_outline" color="yellow" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{n.name}}</q-item-label>
            <q-item-label caption lines="2">{{n.explanation}}</q-item-label>
          </q-item-section>

        </q-item>

        <q-separator v-if="n != data.ruleViolations.slice(-1)[0]" spaced inset="item" />

      </div>
    </q-list>

    <q-footer bordered class="bg-grey-10 q-pa-sm text-center">
      <div class="row q-gutter-sm">
      <div class="col">
        <q-btn class="full-width" color="primary" outline label="Schedule next" disabled />
      </div>
      <div class="col">
        <q-btn class="full-width" color="primary" label="Back to trainings" @click="returnToStart()" />
      </div>
    </div>
    </q-footer>

    <q-inner-loading :showing="loading">
      <q-spinner-ios size="30px" color="white" />
    </q-inner-loading>
  </q-page>
</template>

<script>

export default {
  name: 'PostTraining',
  computed: {
    loading: {
      get () {
        return this.$store.state.data.loading
      }
    },
    data: {
      get () {
        return this.$store.state.data.trainingResults
      }
    },
    userId: {
      get () {
        return this.$store.state.data.userId
      }
    }
  },
  watch: {
    userId (newUserId) {
      this.getTrainingResults()
    }
  },
  beforeMount () {
    this.$store.commit('data/setLoading', true)
  },
  mounted () {
    this.getTrainingResults()
  },
  methods: {
    returnToStart: function () {
      this.$store.dispatch('data/backButtonClicked')
    },
    getTrainingResults: function () {
      if (this.userId == null) {
        return
      }
      this.$store.dispatch('data/getTrainingResults')
    },
    getDurationInMinutesAsLabel: function (durationInSeconds) {
      var minutes = Math.floor(durationInSeconds / 60)
      var seconds = durationInSeconds % 60
      return (minutes !== 0 ? minutes + ' min' : '') + (seconds !== 0 ? ' ' + seconds + ' sec' : '')
    }
  }
}
</script>
