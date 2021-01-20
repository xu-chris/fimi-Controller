<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>

export default {
  name: 'App',
  created () {
    this.interval = setInterval(() => this.getCurrentAppState(), 1000)
    this.logInUser()
  },
  mounted () {
  },
  computed: {
    state: {
      get () {
        return this.$store.state.data.clientAppState
      }
    },
    currentRouteName () {
      return this.$route.name
    },
    userId: {
      get () {
        return this.$store.state.data.userId
      },
      set (value) {
        this.$store.commit('data/setUserId', value)
      }
    },
    userData: {
      get () {
        return this.$store.state.data.userData
      },
      set (value) {
        this.$store.commit('data/setUserData', value)
      }
    }
  },
  watch: {
    userId (newUserId) {
      localStorage.userId = this.userId
      this.getUserData()
    },
    userData (newUserData) {
      localStorage.userData = JSON.stringify(this.userData)
    }
  },
  methods: {
    getCurrentAppState: function () {
      this.$store.dispatch('data/getCurrentAppState')
      this.routeBasedOnState()
    },
    createUser: function () {
      this.$store.dispatch('data/getUserId')
    },
    logInUser: function () {
      if (localStorage.userData != null) {
        this.$store.dispatch('data/logInUser', localStorage.userData)
      } else {
        this.createUser()
      }
    },
    getUserData: function () {
      if (this.userId != null) {
        this.$store.dispatch('data/getUserData', this.userId)
      } else {
        this.logInUser()
      }
    },
    routeBasedOnState: function () {
      var pageName = ''
      switch (this.state) {
        case 'START':
          pageName = 'Start'
          this.$store.commit('data/setBackButtonAvailable', false)
          break
        case 'SELECTED_TRAINING':
          pageName = 'Training'
          this.$store.commit('data/setBackButtonAvailable', true)
          break
        case 'IN_TRAINING':
          pageName = 'InTraining'
          this.$store.commit('data/setBackButtonAvailable', false)
          break
        case 'POST_TRAINING':
          pageName = 'PostTraining'
          this.$store.commit('data/setBackButtonAvailable', false)
          break
        default:
          break
      }

      if (this.currentRouteName !== pageName) {
        this.$router.push({ name: pageName })
        this.$store.commit('data/setLoading', false)
      }
    }
  }
}
</script>
