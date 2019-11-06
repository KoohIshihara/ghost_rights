<template lang="pug">
  div(v-if="articles").wrap-module-top
    div.wrap-cards.f.flex-between.flex-wrap.py20
      ItemArticleCard(v-if="articles" v-for="article in articles" :article="article")
</template>

<style lang="scss">
.wrap-module-top {
  width: 93%;
  max-width: 620px;
  margin: 0 auto;
  padding-top: 48px;
}
</style>

<script>
import db from '@/components/utils/firebase'
import ItemArticleCard from '@/components/item/ItemArticleCard'

export default {
  components: {
    ItemArticleCard
  },
  props: {
  },
  data () {
    return {
      articles: null
    }
  },
  watch: {
    articles: function () {
      this.$nextTick(() => {
        var positionY = sessionStorage.getItem('positionY')
        scrollTo(0, positionY)
        setTimeout(function () {
          scrollTo(0, positionY)
        }, 500)
      })
    }
  },
  async created () {
    this.articles = await db.collection('articles')
      .where('isPublished', '==', true)
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

  }
}
</script>
