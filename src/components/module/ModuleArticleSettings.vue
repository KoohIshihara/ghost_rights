<template lang="pug">
  div.wrap-module-article-settings.py20
    div.wrap-image-uploader.mb20
      h3.mb4 Main Image:
      ItemMediaUploader(
        :imgId="docId"
        :existingImg="existingMainImg"
        ref="mediaUploader")
    div.wrap-title-input.mb12
      h3 Title:
      input(placeholder="Type title here." ref="titleInput")
    div.wrap-sub-title-input.mb20
      h3 Sub Title:
      input(placeholder="Type sub title here." ref="subTitleInput")
    div.wrap-writer.mb20
      h3 Writer:
      div.wrap-writer-info
        ItemWriterInfo(v-if="uid" :uid="uid")
    div.wrap-publish-button.f.fc
      span(@click="publish").button PUBLISH

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
import db from '@/components/utils/firebase'

import ItemMediaUploader from '@/components/item/ItemMediaUploader'
import ItemWriterInfo from '@/components/item/ItemWriterInfo'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    ItemMediaUploader,
    ItemWriterInfo
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      docId: '',
      existingMainImg: ''
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  created () {
    if (this.existingMainImg === '') this.existingMainImg = 'https://firebasestorage.googleapis.com/v0/b/ghost-rights.appspot.com/o/util%2Fghost_rights_logo-white-bg.png?alt=media&token=0a2c9dd7-a82f-49bb-94fe-889189b5d076'
    this.docId = !(this.$route.params.id) ? this.createNewDocId() : this.$route.params.id // this.id
  },
  methods: {
    async publish () {
      var title = this.$refs.titleInput.value
      var subTitle = this.$refs.subTitleInput.value
      var mainImg = this.$refs.mediaUploader.getImgUrl()

      if (title === '') {
        alert('Type Title')
        return
      }
      if (subTitle === '') {
        alert('Type Subtitle')
        return
      }

      var articleObj = {
        title: title,
        subTitle: subTitle,
        mainImg: mainImg,
        createdBy: this.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        writerId: this.uid,
        ghosts: []
      }

      await db.collection('articles').doc(this.docId).set(articleObj)

      console.log('Recomend Share')
      // シェアしよう！って促すモーダルをつくろうとしているところ
    },
    createNewDocId () {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      var autoId = ''
      for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      // var doc = await db.collection('articles').doc(autoId).get()
      // if (doc.exists) this.createNewDocId()
      return autoId
    }
  }
}
</script>
