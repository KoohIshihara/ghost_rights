<template lang="pug">
  div.wrap-article-settings
    HeaderModal
    ModuleArticleSettings

</template>

<style lang="scss">
.wrap-article-settings {
  padding-top: 48px;
}
</style>

<script>
import HeaderModal from '@/components/common/HeaderModal'
import ModuleArticleSettings from '@/components/module/ModuleArticleSettings'

export default {
  components: {
    HeaderModal,
    ModuleArticleSettings
  }
}
</script>
