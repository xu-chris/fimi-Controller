import axios from 'axios'

const webSocketUrl = location.protocol + '//' + location.hostname + ':1234'

export async function getCurrentAppState (state) {
  var message = 'GET_APP_STATE'
  await axios.post(webSocketUrl, message)
    .then((response) => {
      if (response.statusText === 'OK') {
        this.commit('data/setClientAppState', response.data)
      } else {
        console.error('Response status is not OK: ' + response)
      }
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

export async function getUserId (state, name) {
  var message = 'REGISTER_NEW_USER\n' + name
  await axios.post(webSocketUrl, message)
    .then((response) => {
      if (response.statusText === 'OK') {
        this.commit('data/setUserId', response.data)
      } else {
        console.error('Response status is not OK: ' + response)
      }
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

export async function logInUser (state, value) {
  var message = 'LOGIN_USER\n' + value
  console.log('Logging in: ' + value)
  await axios.post(webSocketUrl, message)
    .then((response) => {
      if (response.statusText === 'OK') {
        this.commit('data/setUserId', response.data)
      } else {
        console.error('Response status is not OK: ' + response)
      }
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

export async function getTrainings (state) {
  await axios.post(webSocketUrl, 'GET_TRAININGS')
    .then((response) => {
      if (response.statusText === 'OK') {
        this.commit('data/setTrainingsData', response.data)
      } else {
        console.error('Response status is not OK: ' + response)
      }
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

export async function getUserData (state, userId) {
  var message = 'GET_USER\n' + userId
  await axios.post(webSocketUrl, message)
    .then((response) => {
      if (response.statusText === 'OK') {
        this.commit('data/setUserData', response.data)
      } else {
        console.error('Response status is not OK: ' + response)
      }
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

export async function getCurrentTraining (state) {
  await axios.post(webSocketUrl, 'GET_TRAINING')
    .then((response) => {
      if (response.statusText === 'OK') {
        this.commit('data/setCurrentTraining', response.data)
      } else {
        console.error('Response status is not OK: ' + response)
      }
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

export async function getTrainingResults (state, userId) {
  console.log('Using user id ' + userId)
  var message = 'GET_RESULTS\n' + userId
  await axios.post(webSocketUrl, message)
    .then((response) => {
      console.log(response.data)
      if (response.statusText === 'OK') {
        this.commit('data/setTrainingResults', response.data)
      } else {
        console.error('Response status is not OK: ' + response)
      }
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
      } else {
        console.error('Response status is not OK: ' + response)
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
