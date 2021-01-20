<template>
  <div id="q-app">
    <router-view />
    <q-dialog v-model="showRegisterNewUser" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Hi! What's your name?</div>
          <div>When providing a name, you will see a personal message on the screen when your device has been successfully connected.</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input filled v-model="name" label="Your name" class="full-width" />
        </q-card-section>

        <q-card-actions align="around">
          <q-btn flat label="Continue" color="primary" v-close-popup @click="createUser()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
  data () {
    return {
      showRegisterNewUser: false,
      name: ''
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
      this.$store.dispatch('data/getUserId', this.name)
    },
    logInUser: function () {
      if (localStorage.userData != null) {
        this.$store.dispatch('data/logInUser', localStorage.userData)
      } else {
        this.showRegisterNewUser = true
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
          this.$store.dispatch('data/getCurrentTraining')
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
