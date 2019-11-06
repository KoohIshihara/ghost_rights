const nodemailer = require('nodemailer')
const gmailEmail = 'ghostright.io.hack@gmail.com'
const gmailPassword = 'ramen55ramen55'
// const adminEmail = 'hello@appsocial.ly'

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

// 管理者用のメールテンプレート
const adminContents = data => {
  return `TruffleのLPからKeep in Touchの要望がありました。
  メールアドレス：
  ${data}
  `
}

module.exports = async function (email, subject, text) {
  // メール設定
  let adminMail = {
    from: gmailEmail,
    to: email,
    subject: subject,
    text: text
  }

  // メール送信
  mailTransport.sendMail(adminMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`)
    }
    return console.log('send success.')
  })
}
