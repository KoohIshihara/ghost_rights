<template lang="pug">
  div.wrap-edit-article
    HeaderEditor(
      v-if="content"
      :isSaving="isSaving"
      :content="content"
      @publishContent="publishContent")
    div.wrap-editor
      ModuleEditArticle(
        v-if="article && content && $route.params.articleId"
        :article="article"
        :content="content"
        @toggleIsSaving="toggleIsSaving")

</template>

<style lang="scss">
@import "../plugins/default.css";

.wrap-editor {
  width: 93%;
  max-width: 640px;
  margin: 0 auto;
  padding-top: 48px;
}
</style>

<script>
import db from '@/components/utils/firebase'

import ModuleEditArticle from '@/components/module/ModuleEditArticle'
import HeaderEditor from '@/components/common/HeaderEditor'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    HeaderEditor,
    ModuleEditArticle
  },
  data () {
    return {
      article: null,
      content: null,
      isSaving: false
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  async created () {
    this.article = await db.collection('articles')
      .doc(this.$route.params.articleId)
      .get()
      .then((d) => {
        var article = d.data()
        article.id = d.id
        return article
      })

    if (!this.$route.params.contentId) {
      var contentObj = {
        articleTitle: this.article.title,
        articleSubtitle: this.article.subtitle,
        articleId: this.$route.params.articleId,
        createdBy: this.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        ghost: this.uid,
        content: '',
        isPublished: false
      }
      var contentId = await db.collection('contents').add(contentObj).then((d) => { return d.id })
      this.content = contentObj
      this.content.id = contentId
      this.$router.replace(`/edit-article/${this.$route.params.articleId}/${contentId}`)
    } else {
      this.content = await db.collection('contents')
        .doc(this.$route.params.contentId)
        .get()
        .then((d) => {
          var content = d.data()
          content.id = d.id
          return content
        })
    }
  },
  methods: {
    toggleIsSaving () {
      this.isSaving = !this.isSaving
    },
    async publishContent () {
      await db.collection('contents')
        .doc(this.$route.params.contentId)
        .update({ isPublished: true })
      this.content.isPublished = true
      alert('Your content has been published.')
      this.$router.push(`/user/${this.uid}`)
    }
  }
}
</script>
