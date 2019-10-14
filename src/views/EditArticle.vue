<template lang="pug">
  div.wrap-edit-article
    Header(title="Edit Article")
    ModuleEditArticle

</template>

<style lang="scss">
@import "../plugins/default.css";

.wrap-editor {
  width: 90%;
  max-width: 640px;
  margin: 0 auto;
}
</style>

<script>
import ModuleEditArticle from '@/components/module/ModuleEditArticle'
import Header from '@/components/module/Header'

export default {
  components: {
    Header,
    ModuleEditArticle
  },
  data () {
    return {
      content: '',
      options: {
      }
    }
  }
}
</script>
