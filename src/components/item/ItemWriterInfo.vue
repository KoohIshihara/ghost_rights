<template lang="pug">
  div.wrap-item-writer-info.f.fm.py10
    div.wrap-icon.f.fh.mr12
      img(:src="user.iconURL")
    div.wrap-profile
      div.wrap-name.f.fm.flex-between
        //span.name.mr12 {{user.name}}
        input(:value="user.name").name.mr12
        span.edit-button.px6.py5 Edit profile
      textarea(:value="user.profile").profile
      //span.profile {{user.profile}}

</template>

<style lang="scss">
.wrap-item-writer-info {
  .wrap-icon {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    img {
      object-fit: cover;
    }
  }
  .wrap-profile {
    span {
      display: block;
    }
    .wrap-name {
      width: 100%;
      .name {
        font-size: 16px;
      }
      .edit-button {
        border: solid 0.6px #2a2a2a;
        border-radius: 3px;
        cursor: pointer;
        font-size: 12px;
      }
    }
    .profile {
      font-size: 14px;
      color: #999;
      resize: none;
    }
  }
}
</style>

<script>
import db from '@/components/utils/firebase'

export default {
  props: {
    uid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      user: {}
    }
  },
  async created () {
    this.user = await db.collection('users').doc(this.uid).get()
      .then((q) => {
        var user = q.data()
        user.uid = q.id
        return user
      })
  }
}
</script>
