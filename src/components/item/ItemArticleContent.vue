<template lang="pug">
  div.wrap-item-article-content.pb18
    div(ref="contentHtml").wrap-html

</template>

<style lang="scss">
.wrap-item-article-content {
  border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
  .wrap-html {
    h2 {
      font-size: 24px;
      font-weight: bold;
      margin-top: 14px;
      margin-bottom: 4px;
    }
    p {
      margin-bottom: 4px;
    }
    blockquote {
      padding-left: 12px;
      border-left: solid #2a2a2a;
      margin: 16px 0;
    }
    .medium-insert-embeds {
      margin: 12px 0;
    }
    .medium-insert-images {
      margin: 12px 0;
    }
  }
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
    content: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  mounted () {
    this.$refs.contentHtml.innerHTML = this.content.content
  },
  methods: {

  }
}
</script>
