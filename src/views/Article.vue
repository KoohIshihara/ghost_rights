<template lang="pug">
  Auth(:on-failed-authentication="onFailedAuthentication")
    Header
    div.wrap-article
      ModuleArticle
    Footer

</template>

<style lang="scss">
.wrap-article {
  padding-top: 48px;
  min-height: 100vh;
  background: #fff;
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'

import Auth from '@/components/auth'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import ModuleArticle from '@/components/module/ModuleArticle'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    Header,
    Footer,
    ModuleArticle
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
