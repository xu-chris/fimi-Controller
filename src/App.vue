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
    this.checkOrCreateUserId()
  },
  mounted () {
    if (localStorage.userId) {
      this.$store.commit('data/setUserId', localStorage.userId)
    }
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
    }
  },
  watch: {
    userId (newUserId) {
      localStorage.userId = this.userId
    }
  },
  methods: {
    getCurrentAppState: function () {
      this.$store.dispatch('data/getCurrentAppState')
      this.routeBasedOnState()
    },
    checkOrCreateUserId: function () {
      if (this.userId == null && localStorage.userId == null) {
        this.$store.dispatch('data/getUserId')
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
