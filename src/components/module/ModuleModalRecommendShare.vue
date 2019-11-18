<template lang="pug">
  div.wrap-module-modal-recommend-share.f.fh
    div.wrap-window.py40
      div.wrap-message.mb20
        span 記事が公開されました。この記事をシェアして誰かにゴーストライトしてもらいましょう！
      div.wrap-share-buttons.f.fc.flex-column
        a(:href="`https://www.facebook.com/sharer/sharer.php?u=${link}`"
          target="brank").share-button.f.fc.flex-around.px10.py8.mb12
          div.f.fm
            img(src="/icon/icon-facebook.svg").icon.mr6
            span Share with Facebook
        a(:href="`http://twitter.com/share?url=${link}`"
          target="brank").share-button.f.fc.flex-around.px10.py8.mb12
          div.f.fm
            img(src="/icon/icon-twitter.svg").icon.mr6
            span Share with Twitter
        a(v-clipboard:copy="link" v-clipboard:success="onCopyLink").share-button.f.fc.flex-around.px10.py8.mb20
          span Copy Article Link
        span(@click="hideModal").ok OK
    div(@click="hideModal").overlay

</template>

<style lang="scss">
.wrap-module-modal-recommend-share {
  position: fixed;
  z-index: 101;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .wrap-window {
    background: #fff;
    position: relative;
    z-index: 101;
    border-radius: 3px;
    width: 90%;
    max-width: 480px;
    .wrap-message {
      margin: 0 auto;
      width: 90%;
      span {
        display: block;
        text-align: center;
      }
    }
    .wrap-share-buttons {
      .share-button {
        cursor: pointer;
        margin: 0 auto;
        width: 192px;
        border: 0.6px solid rgba(0, 0, 0, 0.6);
        border-radius: 3px;
        .icon {
          height: 18px;
        }
        span {
          color: #2a2a2a;
        }
      }
      .ok {
        display: block;
        text-align: center;
      }
    }
  }
  .overlay {
    position: absolute;
    cursor: pointer;
    display: block;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>

<script>
import db from '@/components/utils/firebase'

export default {
  components: {
  },
  props: {
  },
  data () {
    return {
      docId: '',
      link: ''
    }
  },
  props: {
    newDocId: {
      type: String,
      required: true
    }
  },
  created () {
    this.docId = !(this.$route.params.id) ? this.newDocId : this.$route.params.id
    this.link = `${location.origin}/article/${this.docId}`
  },
  methods: {
    onCopyLink () {
      alert('Your link has been copied.')
    },
    hideModal () {
      this.$emit('toggleShowRecommendationShareModal')
      this.$router.push(`/article/${this.docId}`)
    }
  }
}
</script>
