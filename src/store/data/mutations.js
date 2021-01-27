/*
export function someMutation (state) {
}
*/

export function setBackButtonAvailable (state, value) {
  state.backButtonAvailable = value
}

export function setClientAppState (state, clientAppState) {
  state.clientAppState = clientAppState
}

export function setLoading (state, value) {
  console.log('Set loading to ' + value)
  state.loading = value
}

export function setTrainingsData (state, data) {
  console.log('Set trainings to: ')
  console.log(data)
  state.trainings = data.trainings
}

export function setCurrentTraining (state, data) {
  console.log('Set current training to:')
  console.log(data)
  state.currentTraining = data
}

export function setTrainingResults (state, data) {
  console.log('Store training results:')
  console.log(data)
  state.trainingResults = data
}

export function setUserData (state, data) {
  console.log('Storing user data to')
  console.log(data)
  state.userData = data
}

export function setUserId (state, data) {
  console.log('Setting user ID to ' + data)
  state.userId = data
}
