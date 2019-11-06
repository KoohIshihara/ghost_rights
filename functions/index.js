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
    
    if (newContent.isPublished && !previousContent.isPublished) {
      var email = await db.collection('users').doc(newContent.articleOwnerId)
        .collection('secrets').doc('email')
        .get().then((d) => { return d.data().email })

      console.log(`send mail to ${email}`)

      var subject = 'Somebody has written your article as your ghost.'
      var text = `Let's check your article. Your article has been updated by your ghost writer. \n\n https://ghostright.io/article/${newContent.articleId}`
      mailSender(email, subject, text)
    }
  })


// OGP Redirect
exports.articleRedirect = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const articleId = req.path.split('/')[2]

    var article = await db.collection("articles")
      .doc(articleId)
      .get()
      .then((d) => { return d.data() })

    const html = createHTML(article.title, article.subtitle, article.mainImg, articleId)
    res.set('Cache-Control', 'public, max-age=600, s-maxage=600')
    res.status(200).end(html)
  }) // cors
})