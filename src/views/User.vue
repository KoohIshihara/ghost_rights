<template lang="pug">
  Auth(:on-failed-authentication="onFailedAuthentication")
    Header
    ModuleUser(v-if="uid")
    // div.wrap-my-page
      span(@click="logout") Sign Out

</template>

<style lang="scss">
.wrap-my-page {
  padding-top: 48px;
  width: 92%;
  max-width: 620px;
  margin: 0 auto;
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'

import Auth from '@/components/auth'
import Header from '@/components/common/Header'
import ModuleUser from '@/components/module/ModuleUser'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    ModuleUser
  },
  computed: {
    ...mapStateAuth(['uid', 'isAnonymous'])
  },
  data () {
    return {
      docId: '',
      existingMainImg: ''
    }
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
