<template lang="pug">
  div(v-if="user" @click="onWriter").wrap-atom-writer.f.fm
    div.wrap-icon.f.fh.mr6
      img(:src="user.iconURL")
    span.name {{user.name}}

</template>

<style lang="scss">
.wrap-atom-writer {
  .wrap-icon {
    width: 26px;
    height: 26px;
    overflow: hidden;
    border: solid 0.6px rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    img {
      object-fit: cover;
    }
  }
  .name {
    font-size: 12px;
  }
}
</style>

<script>
import db from '@/components/utils/firebase'

export default {
  props: {
    uid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      user: null
    }
  },
  async created () {
    this.user = await db.collection('users').doc(this.uid)
      .get()
      .then((d) => {
        var user = d.data()
        user.uid = d.id
        return user
      })
  },
  methods: {
    onWriter (e) {
      e.stopPropagation()
      this.$router.push(`/user/${this.user.uid}`)
    }
  }
}
</script>
