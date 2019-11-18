<template lang="pug">
  div.wrap-article-settings
    HeaderModal
    ModuleArticleSettings(
      ref="moduleArticleSettings"
      :newDocId="newDocId"
      @toggleShowRecommendationShareModal="toggleShowRecommendationShareModal"
      @toggleShowSelectWriterModal="toggleShowSelectWriterModal")
    ModuleModalRecommendShare(
      v-if="showRecommendationShareModal"
      :newDocId="newDocId"
      @toggleShowRecommendationShareModal="toggleShowRecommendationShareModal")
    ModuleModalSelectWriter(
      v-if="showSelectWriterModal"
      @toggleShowSelectWriterModal="toggleShowSelectWriterModal"
      @changeWriter="changeWriter")

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
import ModuleModalSelectWriter from '@/components/module/ModuleModalSelectWriter'

export default {
  components: {
    HeaderModal,
    ModuleArticleSettings,
    ModuleModalRecommendShare,
    ModuleModalSelectWriter
  },
  data () {
    return {
      showRecommendationShareModal: false,
      showSelectWriterModal: false
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
    toggleShowRecommendationShareModal () {
      this.showRecommendationShareModal = !this.showRecommendationShareModal
    },
    toggleShowSelectWriterModal () {
      this.showSelectWriterModal = !this.showSelectWriterModal
    },
    changeWriter (uid) {
      this.$refs.moduleArticleSettings.changeWriter(uid)
    }
  }
}
</script>
