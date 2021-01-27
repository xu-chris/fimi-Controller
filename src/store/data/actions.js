import axios from 'axios'

const webSocketUrl = location.protocol + '//' + location.hostname + ':80'

export async function getCurrentAppState (state) {
  console.log('Requesting current app state')
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
  console.log('Registering new user')
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
  console.log('Logging in:')
  console.log(value)
  await axios.post(webSocketUrl, message)
    .then((response) => {
      if (response.statusText === 'OK') {
        console.log('Logged in successfully. User Id: ' + response.data)
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
  console.log('Back button has been clicked. Unselecting training...')
  var message = 'UNSELECT_TRAINING'
  this.commit('data/setLoading', true)
  sendCommand(message)
}

export async function getTrainings (state) {
  console.log('Requesting trainings')
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
  console.log('Requesting user data for user with Id ' + userId)
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
  console.log('Getting current training data')
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
  console.log('Get training results for user with user id ' + userId)
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
  console.log('Selecting training: ' + training)
  var message = 'SELECT_TRAINING\n' + training
  this.commit('data/setLoading', true)
  sendCommand(message)
}

export function cancelTraining (state, training) {
  console.log('Canceling training...')
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
