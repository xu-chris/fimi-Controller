<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-center">You're in a workout for {{trainings[id].name}}</div>
    <q-footer bordered class="bg-grey-10 q-pa-sm text-center">
      <q-btn outline class="full-width" color="primary" label="Cancel workout" @click="confirm = true" />
  </q-footer>
  <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Do you really want to cancel your workout?</div>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn flat label="Continue" color="primary" v-close-popup />
          <q-btn flat label="Cancel Workout" color="red" v-close-popup @click="cancelWorkout()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      trainings: trainings,
      confirm: false
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    cancelWorkout: function () {
      this.$router.push({ name: 'After Training' })
    }
  }
}
</script>
