<template lang="pug">
  div.wrap-article-settings
    HeaderModal
    ModuleArticleSettings(:newDocId="newDocId" @toggleShowModal="toggleShowModal")
    ModuleModalRecommendShare(v-if="showModal" :newDocId="newDocId" @toggleShowModal="toggleShowModal")

</template>

<style lang="scss">
.wrap-article-settings {
  padding-top: 48px;
}
</style>

<script>
import HeaderModal from '@/components/common/HeaderModal'
import ModuleArticleSettings from '@/components/module/ModuleArticleSettings'
import ModuleModalRecommendShare from '@/components/module/ModuleModalRecommendShare'

export default {
  components: {
    HeaderModal,
    ModuleArticleSettings,
    ModuleModalRecommendShare
  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    newDocId: () => {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var autoId = ''
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return autoId
    }
  },
  methods: {
    toggleShowModal () {
      this.showModal = !this.showModal
    }
  }
}
</script>
