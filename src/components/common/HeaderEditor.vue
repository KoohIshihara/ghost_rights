<template lang="pug">
  Auth
    div.wrap-header-modal
      div.header-content.f.fh
        div.left.f.fm
          div.wrap-logo.f.fh
            v-icon(@click="$router.go(-1)" color="#2a2a2a") arrow_back_ios
            span(v-if="!isSaving") Saved
            span(v-if="isSaving") Saving...
        div.right.f.fm
          span(v-if="!content.isPublished" @click="$emit('publishContent')").button-publish.px8.py5 Publish
          span(v-if="content.isPublished").published Published

</template>

<style lang="scss">
.wrap-header-modal {
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  background: #f8f8f8;
  border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
  .header-content {
    position: relative;
    width: 92%;
    max-width: 620px;
    height: 100%;
    margin: 0 auto;
    .header-label {
      color: #2a2a2a;
      text-align: center;
    }
    .left {
      position: absolute;
      left: 0;
      height: 100%;
    }
    .right {
      position: absolute;
      right: 0;
      height: 100%;
      .button-publish {
        font-size: 12px;
        font-weight: 500;
        color: #fff;
        background: #2a2a2a;
        border-radius: 3px;
        letter-spacing: 0.6px;
        cursor: pointer;
      }
    }
  }
}
</style>

<script>
import Auth from '@/components/auth'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  props: {
    content: {
      type: Object,
      required: true
    },
    isSaving: {
      type: Boolean,
      required: true
    }
  }
}
</script>
