<template lang="pug">
  div.wrap-item-writer-info
    div(v-if="user.uid === this.uid").f.fm.py16
      div(:class="{'enable-to-edit': enableEdit}").wrap-icon.f.fh
        AtomIconUploader(
          v-if="docId && existingMainImg"
          :imgId="docId"
          :existingImg="existingMainImg"
          :enableEdit="enableEdit"
          ref="mediaUploader")
      div.wrap-profile.pl12
        div.wrap-name.f.fm.flex-between
          input(
            ref="nameInput"
            v-model="nameText"
            :class="{'enable-to-edit': enableEdit}").name.mr12.mb4
          div(v-if="uid === profileUid")
            span(@click="onEdit" v-if="!enableEdit").edit-button.px7.py3 Edit
            span(@click="onSave" v-if="enableEdit").save-button.px7.py3 Save
        div.wrap-profile
          textarea(
            ref="profileText"
            v-model="profileText"
            :style="profileStyle"
            :class="{'enable-to-edit': enableEdit}").profile
          span(ref="hiddenProfileText").profile-hidden {{profileText}}
    div(v-else).wrap-another-user-profile.f.fm.py20
      div.wrap-icon.f.fh
        img(:src="user.iconURL")
      div.wrap-profile.pl12
        span.name {{user.name}}
        span.profile {{user.profile}}
    div(v-if="this.$route.name === 'user' || this.$route.name === 'article'").wrap-create-article-as-this-writer.f.fc.mb20
      span(@click="$router.push(`/article-settings/new/${user.uid}`)").px8.py4 {{`Create Article as ${user.name}`}}

</template>

<style lang="scss">
.wrap-item-writer-info {
  .wrap-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .wrap-profile {
    width: calc(100% - 80px);
    span {
      display: block;
    }
    .wrap-name {
      width: 100%;
      .name {
        font-size: 16px;
        pointer-events: none;
        outline: none;
        &.enable-to-edit {
          color: #1a73e8;
          pointer-events: auto !important;
        }
      }
      .edit-button {
        border: solid 0.6px #2a2a2a;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
      }
      .save-button {
        border: solid 0.6px #2a2a2a;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
        background: #2a2a2a;
        color: #fff;
      }
    }
    .wrap-profile {
      position: relative;
      width: 100%;
      .profile {
        width: 100%;
        font-size: 12px;
        color: #999;
        resize: none;
        pointer-events: none;
        &.enable-to-edit {
          color: #1a73e8;
          pointer-events: auto !important;
        }
      }
      .profile-hidden {
        visibility: hidden;
        position: absolute;
        left: 0;
        top: 0;
        min-height: 18px;
        font-size: 12px;
        display: inline-block;
        pointer-events: none;
        font-family: BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica,
          Arial, sans-serif;
      }
    }
  }
  .wrap-another-user-profile {
    .wrap-icon {
      overflow: hidden;
    }
    .wrap-profile {
      display: block;
      .name {
        font-size: 16px;
      }
      .profile {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .wrap-create-article-as-this-writer {
    span {
      display: inline-block;
      background: #2a2a2a;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>

<script>
import db from '@/components/utils/firebase'
import AtomIconUploader from '@/components/atom/AtomIconUploader'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    AtomIconUploader
  },
  props: {
    profileUid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      user: {},
      docId: '',
      existingMainImg: '',
      nameText: '',
      profileText: '',
      profileStyle: '',
      enableEdit: false
    }
  },
  computed: {
    ...mapStateAuth(['uid'])
  },
  watch: {
    profileText (value) {
      this.adjestProfileTextareaSize()
    }
  },
  async created () {
    this.user = await db.collection('users').doc(this.profileUid).get()
      .then((d) => {
        var user = d.data()
        user.uid = d.id
        return user
      })

    this.docId = this.user.uid
    this.existingMainImg = this.user.iconURL

    this.nameText = this.user.name
    this.profileText = this.user.profile
  },
  mounted () {
    this.$nextTick(this.adjestProfileTextareaSize)
    // setTimeout(this.adjestProfileTextareaSize, 800)
  },
  methods: {
    adjestProfileTextareaSize () {
      if (this.$refs.hiddenProfileText) {
        var h = this.$refs.hiddenProfileText.offsetHeight
        this.profileStyle = `height: ${h}px;`
      }
    },
    onEdit () {
      this.enableEdit = true
      this.$refs.nameInput.focus()
    },
    async onSave () {
      await db.collection('users').doc(this.uid)
        .update({
          name: this.nameText,
          profile: this.profileText,
          iconURL: this.$refs.mediaUploader.getImgUrl()
        })
      this.enableEdit = false
    },
    // This func is called by parent component
    async reloadWriter (uid) {
      this.user = await db.collection('users').doc(uid).get()
        .then((d) => {
          var user = d.data()
          user.uid = d.id
          return user
        })

      this.docId = this.user.uid
      this.existingMainImg = this.user.iconURL

      this.nameText = this.user.name
      this.profileText = this.user.profile
    }
  }
}
</script>
