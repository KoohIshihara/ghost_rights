<template lang="pug">
  div(@click="$router.push(`/edit-article/${content.articleId}/${content.id}`)").wrap-item-user-content-card.f.fm.flex-between.pl8.py4
    div.wrap-title
      span.article-title.line-clamp-1 {{content.articleTitle}}
      span.article-subtitle.line-clamp-1 {{content.articleSubtitle}}
    div.wrap-status
      span(v-if="content.isPublished").status-label Published
      span(v-if="!content.isPublished").status-label Draft
</template>

<style lang="scss">
.wrap-item-user-content-card {
  border-left: solid 2px rgba(0, 0, 0, 0.2);
  .article-title {
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #2a2a2a;
  }
  .article-subtitle {
    display: block;
    font-size: 12px;
    font-weight: bold;
    color: #999;
  }
  .status-label {
    font-size: 12px;
    color: #999;
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
  async created () {

  },
  methods: {

  }
}
</script>
