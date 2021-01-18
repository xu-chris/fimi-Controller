import axios from 'axios'

const webSocketUrl = location.protocol + '//' + location.hostname + ':1234'

export async function getCurrentAppState (state) {
  var message = 'GET_APP_STATE'
  await axios.post(webSocketUrl, message)
    .then((response) => {
      this.commit('data/setClientAppState', response.data)
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

export async function getUserId (state) {
  var message = 'REGISTER_NEW_USER'
  await axios.post(webSocketUrl, message)
    .then((response) => {
      this.commit('data/setUserId', response.data)
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

export async function backButtonClicked (state) {
  var message = 'UNSELECT_TRAINING'
  this.commit('data/setLoading', true)
  sendCommand(message)
}

export async function getTrainings () {
  await axios.post(webSocketUrl, 'GET_TRAININGS')
    .then((response) => {
      this.commit('data/setTrainingsData', response.data)
      this.commit('data/setLoading', false)
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

export async function getCurrentTraining () {
  await axios.post(webSocketUrl, 'GET_TRAINING')
    .then((response) => {
      this.commit('data/setCurrentTraining', response.data)
      this.commit('data/setLoading', false)
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

export function selectTraining (state, training) {
  var message = 'SELECT_TRAINING\n' + training
  this.commit('data/setLoading', true)
  sendCommand(message)
}

export function cancelTraining (state, training) {
  var message = 'CANCEL_TRAINING\n' + training
  this.commit('data/setLoading', true)
  sendCommand(message)
}

async function sendCommand (message) {
  await axios.post(webSocketUrl, message)
    .then((response) => {
      this.commit('data/setLoading', false)
      if (!response.data) {
        console.warn('Sending data: ' + message + '. Repsonse: ' + response.data)
      }
    })
    .catch(() => {
      this.$q.notify({
        color: 'negative',
        position: 'top',
        message: 'Loading app state failed',
        icon: 'report_problem'
      })
    })
}
