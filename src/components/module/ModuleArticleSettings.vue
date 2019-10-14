<template lang="pug">
  div.wrap-module-article-settings.py20
    div.wrap-image-uploader.mb20
      h3.mb4 Main Image:
      ItemMediaUploader(imgId="test" :existingImg="existingMainImg")
    div.wrap-title-input.mb12
      h3 Title:
      input(placeholder="Type title here.")
    div.wrap-sub-title-input.mb20
      h3 Sub Title:
      input(placeholder="Type sub title here.")
    div.wrap-writer.mb20
      h3 Writer:
      div.wrap-writer-info
        ItemWriterInfo
    div.wrap-publish-button.f.fc
      span.button PUBLISH

</template>

<style lang="scss">
.wrap-module-article-settings {
  width: 90%;
  max-width: 420px;
  margin: 0 auto;
  .wrap-title-input {
    border-bottom: solid #2a2a2a 1px;
  }
  .wrap-sub-title-input {
    border-bottom: solid #2a2a2a 1px;
  }
}
</style>

<script>
import ItemMediaUploader from '@/components/item/ItemMediaUploader'
import ItemWriterInfo from '@/components/item/ItemWriterInfo'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    ItemMediaUploader,
    ItemWriterInfo
  },
  data () {
    return {
      existingMainImg: ''
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  created () {
    if (this.existingMainImg === '') this.existingMainImg = 'https://liard.io/img/default.png'
  }
}
</script>
