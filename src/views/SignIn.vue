<template lang="pug">
  Auth(@loggedIn="onLoggedIn" :on-failed-authentication="onFailedAuthentication")
    div.wrap-sign-ui.f.fh
      div.sign-ui
        div.f.fc.mb14
          span.welcome Welcome to Ghost Rights
        SignIn(:redirect="resultRedirect")
</template>

<style lang="scss" scoped>
.wrap-sign-ui {
  width: 100%;
  height: 100vh;
  .sign-ui {
    width: 90%;
    .welcome {
      font-weight: bold;
    }
  }
}
</style>

<script>
// import firebase from "firebase"
import db from '@/components/utils/firebase'
import { firebase } from '@/components/utils/firebase'

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
    resultRedirect: '/my-page'
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
        document.getElementsByClassName('firebaseui-title')[0].innerText = 'Sign Up with Email'
      }
    }, 100)
  },
  methods: {
    onFailedAuthentication () {

    },
    async onLoggedIn () {
      if (this.uid && !this.isAnonymous) {
        var userDoc = await db.collection('users').doc(this.uid).get()

        if (!userDoc.exists) {
          var user = await firebase.auth().currentUser

          var userObj = {
            uid: user.uid,
            name: user.displayName,
            // email: user.email,
            profile: 'No Profile',
            iconURL: user.photoURL,
            lastSignInTime: user.metadata.lastSignInTime,
            createdAt: user.metadata.creationTime
          }

          if (!userObj.iconURL) userObj.iconURL = 'https://firebasestorage.googleapis.com/v0/b/ghost-rights.appspot.com/o/util%2Fghost_rights_logo.png?alt=media&token=6ae98b77-6d5e-4980-83d9-4681b4b05cc8'

          await db.collection('users')
            .doc(user.uid)
            .set(userObj)
            .then(function () {
              // console.log('Document successfully written!')
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
            })

          await db.collection('writers')
            .doc(user.uid)
            .set(userObj)

          if (this.$route.params.projectId) {
            // var project = await this.loadProject(this.$route.params.projectId)
            // var scenarioArray = await this.loadScenarioByProjectId(this.$route.params.projectId)

            // await this.copyProject({
            //   uid: user.uid,
            //   userDisplayName: user.displayName,
            //   scenario: scenarioArray,
            //   project: project
            // })
          }
        }

        this.$router.push(`${this.resultRedirect}`)
      } // if (this.uid && !this.isAnonymous) {
    }
  }
}
</script>
