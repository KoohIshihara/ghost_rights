<template lang="pug">
  div.wrap-module-my-page
    div.mb12
      ItemWriterInfo(:profileUid="$route.params.uid")
    div.wrap-tab-bar.f.fm
      span(
        v-for="item in tabs"
        :class="{'active': item.show}"
        @click="onTab(item.id)").tab-button.mr14.pb8 {{item.label}}
    div(v-if="tabs[0].show").wrap-user-content-cards.pt12
      div(v-if="contents" v-for="item in contents").mb8
        ItemUserContentCard(:content="item")
    div(v-if="tabs[1].show").wrap-user-article-cards.f.flex-between.flex-wrap.pt12
      ItemArticleCard(v-if="articles" v-for="item in articles" :article="item")

</template>

<style lang="scss">
.wrap-module-my-page {
  width: 93%;
  max-width: 420px;
  margin: 0 auto;
  padding-top: 48px;
  .wrap-tab-bar {
    border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
    .tab-button {
      display: inline-block;
      color: #999;
      &.active {
        color: #2a2a2a;
        border-bottom: solid 0.6px;
      }
    }
  }
}
</style>

<script>
import db from '@/components/utils/firebase'
import ItemWriterInfo from '@/components/item/ItemWriterInfo'
import ItemUserContentCard from '@/components/item/ItemUserContentCard'
import ItemArticleCard from '@/components/item/ItemArticleCard'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    ItemWriterInfo,
    ItemUserContentCard,
    ItemArticleCard
  },
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      docId: '',
      existingMainImg: '',
      contents: null,
      articles: null,
      tabs: [
        { label: 'Ghost Contents', id: 'ghost_id', show: true },
        { label: 'Articles', id: 'articles', show: false }
      ]
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  async created () {
    if (this.$route.params.uid !== this.uid) this.tabs = [{ label: 'Articles', id: 'articles', show: false }]

    this.contents = await db.collection('contents')
      .where('createdBy', '==', this.uid)
      .orderBy('updatedAt', 'desc')
      .get()
      .then((q) => {
        return q.docs.map((d) => {
          var content = d.data()
          content.id = d.id
          return content
        })
      })

    this.articles = await db.collection('articles')
      .where('createdAs', '==', this.uid)
      .orderBy('updatedAt', 'desc')
      .get()
      .then((q) => {
        return q.docs.map((d) => {
          var article = d.data()
          article.id = d.id
          return article
        })
      })
  },
  methods: {
    onTab (id) {
      this.tabs = this.tabs.map((e) => {
        var tab = e
        tab.show = (tab.id === id)
        return tab
      })
    }
  }
}
</script>
