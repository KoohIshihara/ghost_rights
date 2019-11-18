<template lang="pug">
  Auth(@loggedIn="onLoggedIn")
    div.wrap-header
      div.header-content.f.fh
        div.left.f.fm
          div.wrap-logo.f.fh
            span(@click="$router.push('/top')").logo Ghost Right
            // img(src="/img/logo.svg")
        // span.header-label Label
        div.right.f.fm
          div(v-if="isLoggedIn").f
            span(@click="$router.push('/article-settings/new')").create-article.px8.pt5.pb4.mr10 Create Article
            div(@click="$router.push(`/user/${uid}`)").wrap-icon.f.fh
              img(:src="user.iconURL")
          div(v-if="!isLoggedIn")
            span(@click="$router.push('/sign-in')").sign-in.mr10 Sign In
            span(@click="$router.push('/sign-up')").sign-up.px8.py5 Sign Up

</template>

<style lang="scss">
.wrap-header {
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
    width: 93%;
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
      .wrap-logo {
        // width: 28px;
        .logo {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
    .right {
      position: absolute;
      right: 0;
      height: 100%;
      .create-article {
        font-size: 12px;
        font-weight: 500;
        color: #fff;
        background: #2a2a2a;
        border-radius: 3px;
        letter-spacing: 0.6px;
      }
      .wrap-icon {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        overflow: hidden;
        border: solid 0.6px rgba(0, 0, 0, 0.4);
        img {
          object-fit: cover;
        }
      }
      .sign-in {
        font-size: 12px;
        font-weight: 500;
        color: #2a2a2a;
        letter-spacing: 0.6px;
      }
      .sign-up {
        font-size: 12px;
        font-weight: 500;
        color: #fff;
        background: #2a2a2a;
        border-radius: 3px;
        letter-spacing: 0.6px;
      }
    }
  }
}
</style>

<script>
import Auth from '@/components/auth'
import db from '@/components/utils/firebase'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth
  },
  data () {
    return {
      user: Object
    }
  },
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid', 'isAnonymous'])
  },
  methods: {
    async onLoggedIn () {
      if (!this.isAnonymous) {
        this.user = await db.collection('users').doc(this.uid).get()
          .then((q) => {
            var user = q.data()
            user.uid = q.id
            return user
          })
      }
    }
  }
}
</script>
