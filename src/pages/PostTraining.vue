<template>
  <q-page class="q-pa-md">
    <q-list>
      <q-item>
        <div class="text-h4">Training results for {{trainings[id].name}} <q-chip color="grey-9" text-color="white" :label="trainings[id].duration" /></div>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Here's where you have improved</q-item-label>

      <q-item>

        <q-item-section avatar>
          <q-icon name="arrow_upward" color="green" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Better alignment of head and body</q-item-label>
          <q-item-label caption lines="2">Your head and body are more aligned.</q-item-label>
        </q-item-section>

      </q-item>

      <q-separator spaced inset="item" />

      <q-item>

        <q-item-section avatar>
          <q-icon name="arrow_upward" color="green" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Knees are not overstretched</q-item-label>
          <q-item-label caption lines="2">Squatting just up to 90 degrees prevents bending the tendons too much. Good job!</q-item-label>
        </q-item-section>

      </q-item>

      <q-separator spaced />
      <q-item-label header>Things you should watch next time</q-item-label>

      <q-item>

        <q-item-section avatar>
          <q-icon name="error_outline" color="yellow" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Keep your neck neutral</q-item-label>
          <q-item-label caption lines="2">While training, don't look forward but move your head along your spline. This prevents injuries on your neck muscle.</q-item-label>
        </q-item-section>

      </q-item>

      <q-separator spaced inset="item" />

      <q-item>

        <q-item-section avatar>
          <q-icon name="error_outline" color="yellow" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Keep your upper and lower arms aligned</q-item-label>
          <q-item-label caption lines="2">Keeping your arms straight assures the expected training outcome.</q-item-label>
        </q-item-section>

      </q-item>

      <q-separator spaced inset="item" />
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
  </q-page>
</template>

<script>

const trainings = [
  {
    id: 0,
    name: 'Move your body',
    duration: '6 minutes'
  },
  {
    id: 1,
    name: 'HIIT',
    duration: '60 minutes'
  }
]

export default {
  name: 'PostTraining',
  data () {
    return {
      id: 0,
      trainings: trainings
    }
  },
  methods: {
    returnToStart: function () {
      this.$store.dispatch('data/backButtonClicked')
    }
  }
}
</script>
