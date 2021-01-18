export function isBackButtonAvailable (state) {
  return state.backButtonAvailable
}

export function getClientAppState (state) {
  return state.clientAppState
}

export function getUserId (state) {
  if (state.userId == null) {
    this.dispatch('data/getUserId')
  }
  return state.userId
}
