<template lang="pug">
  Auth(:on-failed-authentication="onFailedAuthentication")
    Header
    div.wrap-top
      ModuleTop
    Footer

</template>

<style lang="scss">
.wrap-top {
  display: block;
  background: #fff;
  min-height: calc(100vh - 48px);
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'

import Auth from '@/components/auth'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import ModuleTop from '@/components/module/ModuleTop'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    Footer,
    ModuleTop
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
