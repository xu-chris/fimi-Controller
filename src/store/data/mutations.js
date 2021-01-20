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
  state.loading = value
}

export function setTrainingsData (state, data) {
  state.trainings = data.trainings
}

export function setCurrentTraining (state, data) {
  state.currentTraining = data
}

export function setTrainingResults (state, data) {
  state.trainingResults = data
}

export function setUserData (state, data) {
  state.userData = data
}

export function setUserId (state, data) {
  console.log('Setting user ID to ' + data)
  state.userId = data
}
