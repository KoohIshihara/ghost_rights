<template lang="pug">
  Auth(:on-failed-authentication="onFailedAuthentication")
    Header
    div.wrap-my-page
      span(@click="logout") Sign Out

</template>

<style lang="scss">
.wrap-my-page {
  padding-top: 48px;
  width: 92%;
  max-width: 420px;
  margin: 0 auto;
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'

import Auth from '@/components/auth'
import Header from '@/components/common/Header'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header
  },
  computed: {
    ...mapStateAuth(['uid', 'isAnonymous'])
  },
  created () {
    window.logout = this.logout
  },
  methods: {
    ...mapActionsAuth(['signOut']),
    logout () {
      this.signOut()
      setTimeout(() => {
        this.$router.push('/sign-in')
      }, 400)
    },
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    }
  }
}
</script>
