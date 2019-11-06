<template lang="pug">
  div.wrap-item-tmp

</template>

<style lang="scss">
.wrap-item-tmp {
}
</style>

<script>
import db from '@/components/utils/firebase'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
  },
  props: {
    // data: {
    //   type: Object,
    //   default: ''
    // }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  async created () {

  },
  methods: {

  }
}
</script>
