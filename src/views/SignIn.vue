<template lang="pug">
  Auth(@loggedIn="onLoggedIn" :on-failed-authentication="onFailedAuthentication")
    div.wrap-sign-ui.f.fh
      div.sign-ui
        div.mb24
          div.wrap-logo.f.fh.mb12
            img(src="/img/logo.svg")
          span.welcome Welcome to Ghost Right
        SignIn
        // SignIn(:redirect="resultRedirect")
</template>

<style lang="scss" scoped>
.wrap-sign-ui {
  width: 100%;
  height: 100vh;
  .sign-ui {
    width: 90%;
    .wrap-logo {
      img {
        width: 100px;
      }
    }
    .welcome {
      font-weight: bold;
      display: block;
      text-align: center;
    }
  }
}
</style>

<script>
// import firebase from "firebase"
import db, { firebase } from '@/components/utils/firebase'

import { createNamespacedHelpers } from 'vuex'

import Auth from '@/components/auth'
import SignIn from '@/components/sign-in/firebase-sign-in-ui'
const { mapState: mapStateAuth } = createNamespacedHelpers('auth')

export default {
  components: {
    Auth,
    SignIn
  },
  props: {
    redirect: {
      type: String,
      default: 'top'
    },
    id: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    // resultRedirect: '/my-page'
  }),
  computed: {
    ...mapStateAuth(['isLoggedIn', 'uid', 'isAnonymous'])
  },
  created () {
    // if (this.id === '' && this.home !== 'home') this.resultRedirect = `/${this.redirect}`
    // if (this.id !== '' && this.home !== 'home') this.resultRedirect = `/${this.redirect}/${this.id}`
  },
  mounted () {
    setTimeout(() => {
      if (location.pathname.split('/')[1] === 'sign-up') {
        if (document.getElementsByClassName('firebaseui-title')[0]) {
          document.getElementsByClassName('firebaseui-title')[0].innerText = 'Sign Up with Email'
        }
      }
    }, 1000)
  },
  methods: {
    onFailedAuthentication () {
    },
    async onLoggedIn () {
      if (this.uid && !this.isAnonymous) {
        var user = await firebase.auth().currentUser
        var userDoc = await db.collection('users').doc(this.uid).get()
        if (!userDoc.exists) {
          var userObj = {
            uid: user.uid,
            createdBy: user.uid,
            name: user.displayName,
            // email: user.email,
            profile: 'No Profile',
            iconURL: user.photoURL,
            lastSignInTime: user.metadata.lastSignInTime,
            createdAt: user.metadata.creationTime,
            authorized: true
          }
          if (!userObj.iconURL) userObj.iconURL = 'https://firebasestorage.googleapis.com/v0/b/ghost-rights.appspot.com/o/util%2Fghost_rights_logo.png?alt=media&token=6ae98b77-6d5e-4980-83d9-4681b4b05cc8'
          if (userObj.iconURL.indexOf('graph.facebook.com') !== -1) userObj.iconURL = `${userObj.iconURL}?width=320&amp;height=320`

          await db.collection('users')
            .doc(user.uid)
            .set(userObj)
            .then(function () {
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
            })

          await db.collection('users')
            .doc(user.uid)
            .collection('secrets')
            .doc('email')
            .set({
              author: user.uid,
              email: user.email
            })

          // await db.collection('writers')
          //   .doc(user.uid)
          //   .set(userObj)
        }
        if (this.$route.params.articleId) {
          this.$router.push(`/edit-article/${this.$route.params.articleId}`)
        } else {
          this.$router.push(`/user/${user.uid}`)
        }
      } // if (this.uid && !this.isAnonymous) {
    }
  }
}
</script>
