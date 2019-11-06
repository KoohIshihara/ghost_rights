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
      input(placeholder="Type subtitle here." ref="subtitleInput")
    div.wrap-comment-for-ghost-input.mb20
      h3 Comment for Ghost Writer:
      textarea(placeholder="Type comment here." ref="commentForGhostInput")
    div.wrap-writer.mb20
      h3 Writer:
      div.wrap-writer-info
        ItemWriterInfo(v-if="uid" :profileUid="uid")
    div.wrap-publish-button.f.fc
      span(@click="publish").publish-button.px12.py6 PUBLISH

</template>

<style lang="scss">
.wrap-module-article-settings {
  width: 93%;
  max-width: 420px;
  margin: 0 auto;
  .wrap-title-input {
    border-bottom: solid #2a2a2a 1px;
    input {
      width: 100%;
      outline: none;
    }
  }
  .wrap-sub-title-input {
    border-bottom: solid #2a2a2a 1px;
    input {
      width: 100%;
      outline: none;
    }
  }
  .wrap-comment-for-ghost-input {
    textarea {
      width: 100%;
      outline: none;
      resize: none;
      border-bottom: solid #2a2a2a 1px;
    }
  }
  .wrap-publish-button {
    .publish-button {
      color: #fff;
      background: #2a2a2a;
      border-radius: 3px;
    }
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
  props: {
    newDocId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  created () {
    if (this.existingMainImg === '') this.existingMainImg = 'https://firebasestorage.googleapis.com/v0/b/ghost-rights.appspot.com/o/util%2Fghost_rights_no_image.png?alt=media&token=2610829b-7d51-49a6-b225-13ba9bab6244'
    this.docId = !(this.$route.params.id) ? this.newDocId : this.$route.params.id
    // this.docId = !(this.$route.params.id) ? this.createNewDocId() : this.$route.params.id // this.id
  },
  methods: {
    async publish () {
      var title = this.$refs.titleInput.value
      var subtitle = this.$refs.subtitleInput.value
      var commentForGhost = this.$refs.commentForGhostInput.value
      var mainImg = this.$refs.mediaUploader.getImgUrl()

      if (title === '') {
        alert('Title is empty.')
        return
      }
      if (subtitle === '') {
        alert('Subtitle is empty.')
        return
      }
      if (commentForGhost === '') {
        // alert('Type comment for ghost writer is empty.')
        // return
        commentForGhost = 'No Comment'
      }

      var articleObj = {
        title: title,
        subtitle: subtitle,
        mainImg: mainImg,
        createdBy: this.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdAs: this.uid,
        commentForGhost: commentForGhost,
        isPublished: true,
        ghosts: []
      }

      await db.collection('articles').doc(this.docId).set(articleObj)
      this.$emit('toggleShowModal')

      console.log('Recomend Share')
    }
    // createNewDocId () {
    //   var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    //   var autoId = ''
    //   for (let i = 0; i < 20; i++) {
    //     autoId += chars.charAt(Math.floor(Math.random() * chars.length))
    //   }
    //   // var doc = await db.collection('articles').doc(autoId).get()
    //   // if (doc.exists) this.createNewDocId()
    //   return autoId
    // }
  }
}
</script>
