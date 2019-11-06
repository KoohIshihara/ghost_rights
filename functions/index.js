const admin = require('firebase-admin')
const firestore = require('firebase/firestore')
const functions = require('firebase-functions')
const FieldValue = admin.firestore.FieldValue

const mailSender = require('./mailSender')

const cors = require('cors')({ origin: true })

// Prod
admin.initializeApp({
  apiKey: 'AIzaSyAGO18oTdmC8OGKbXD0flqQatqScSUaJW0',
  authDomain: 'chatcenter-min-ui.firebaseapp.com',
  databaseURL: 'https://chatcenter-min-ui.firebaseio.com',
  projectId: 'chatcenter-min-ui',
  storageBucket: 'chatcenter-min-ui.appspot.com',
  messagingSenderId: '361825483980'
})

const db = admin.firestore()
db.settings({
  timestampsInSnapshots: true
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
