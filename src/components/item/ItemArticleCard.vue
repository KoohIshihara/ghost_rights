<template lang="pug">
  div(@click="$router.push(`/article/${article.id}`)").wrap-item-article-card.pb12.mb20
    div.wrap-img.f.fh.mb12
      img(:src="article.mainImg")
    div.wrap-title.px4.mb12
      span.article-title.line-clamp-2.mb4 {{article.title}}
      span.article-subtitle.line-clamp-2 {{article.subtitle}}
    div.wrap-writer
      AtomWriter(:uid="article.createdAs")

</template>

<style lang="scss">
.wrap-item-article-card {
  width: 49%;
  cursor: pointer;
  .wrap-img {
    height: 160px;
    overflow: hidden;
    //  min-height: 160px;
    // border: solid 0.6px rgba(150, 150, 150, 0.2);
    img {
      object-fit: cover;
    }
  }
  .wrap-title {
    .article-title {
      font-size: 18px;
      color: #2a2a2a;
      font-weight: bold;
    }
    .article-subtitle {
      display: block;
      font-size: 14px;
      color: #999;
    }
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
}
</style>

<script>
import db from '@/components/utils/firebase'

import { createNamespacedHelpers } from 'vuex'

import AtomWriter from '@/components/atom/AtomWriter'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    AtomWriter
  },
  props: {
    article: {
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
