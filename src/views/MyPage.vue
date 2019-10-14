<template lang="pug">
  div.wrap-my-page
    span(@click="logout") Sign Out

</template>

<style lang="scss">
.wrap-my-page {
}
</style>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth, mapActions: mapActionsAuth } = createNamespacedHelpers('auth')

export default {
  components: {

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
    }
  }
}
</script>
