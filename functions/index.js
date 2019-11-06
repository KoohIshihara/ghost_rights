const admin = require('firebase-admin')
const firestore = require('firebase/firestore')
const functions = require('firebase-functions')
const FieldValue = admin.firestore.FieldValue

const mailSender = require('./mailSender')
const createHTML = require('./createHTML')

const cors = require('cors')({ origin: true })

// Prod
admin.initializeApp({
  apiKey: 'AIzaSyA0cJ4YGvhiN_BX9dsV2Pm8nSSF-qY98Ww',
  authDomain: 'ghost-rights.firebaseapp.com',
  databaseURL: 'https://ghost-rights.firebaseio.com',
  projectId: 'ghost-rights',
  storageBucket: 'ghost-rights.appspot.com',
  messagingSenderId: '483501591562'
})

const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
})

exports.updatedPublishStatusOfContent = functions.firestore
  .document(`contents/{contentId}`)
  .onUpdate(async (change, context) => {
    const newContent = change.after.data()
    const previousContent = change.before.data()
    
    console.log('updated content', newContent)

    if (newContent.isPublished && !previousContent.isPublished) {
      var email = await db.collection('users').doc(newContent.articleOwnerId)
        .collection('secrets').doc('email')
        .get().then((d) => { return d.data().email })

      var subject = 'Somebody has written your article as your ghost.'
      var text = `Let's check your article. Your article has been updated by your ghost writer. \n\n https://ghostright.io/article/${newContent.articleId}`
      mailSender(email, subject, text)
    }
  })

// exports.createRoom = functions.firestore
//   .document(`teams/{teamId}/rooms/{roomId}`)
//   .onCreate(async (doc, context) => {
//     console.log('createRoom', doc.data())
//     var room = doc.data()
//     await db.collection('teams').doc(room.teamId).update({
//       roomNum: FieldValue.increment(1)
//     })
//     var team = await db.collection('teams')
//       .doc(room.teamId)
//       .get()
//       .then((d) => {
//         var team = d.data()
//         team.id = d.id
//         return team
//       })

//     var email = await db.collection('users').doc(team.author)
//       .collection('secrets').doc('email')
//       .get().then((d) => { return d.data().email })

//     var subject = '[Chatcenter.Ai] ボットにアクセスがありました。'
//     var text = `誰かがあなたのボットにアクセスしました。\n\n https://chatcenter-min-ui.firebaseapp.com/profile/${team.id}/${doc.id}`
//     mailSender(email, subject, text)
//   })
