<template lang="pug">
  Auth(:on-failed-authentication="onFailedAuthentication")
    Header
    div.wrap-tmp
    // ModuleUser

</template>

<style lang="scss">
.wrap-tmp {
  padding-top: 48px;
  width: 92%;
  max-width: 620px;
  min-height: 100vh;
  margin: 0 auto;
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'

import Auth from '@/components/auth'
import Header from '@/components/common/Header'
// import ModuleUser from '@/components/module/ModuleUser'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header
    // ModuleUser
  },
  computed: {
    ...mapStateAuth(['uid', 'isAnonymous'])
  },
  data () {
    return {
    }
  },
  methods: {
    onFailedAuthentication () {
      this.$router.push('/sign-in')
    }
  }
}
</script>
