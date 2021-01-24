const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()

console.log('Server Express')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  // port: 465,
  secure: false,
  // secure: true,
  auth: {
    // type: 'OAuth2',
    user: "andisyy@gmail.com",
    pass: process.env.SMTP_PASSWORD
  }
});

const app = express()
const port = 3200

app.use('/', express.static('public'))

const SUBJECT = 'mail from Andrzej'

app.get('/message', (req, res) => {
    console.log(req.query)
    const {message, email} = req.query 
    console.log('message & email ', message, email)
    if(!message) res.status(400)
    if(!email) res.status(400)
    res.send( '<h2>Info form Server OVH:</h2>to: '+email+'<br/>subject: '+SUBJECT+'<br/>message: '+message )
    transporter.sendMail({
        from: "andisyy@gmail.com",
        to: email,
        subject: SUBJECT,
        text: message,
        // html: "<p>HTML version of the message</p>"
    },
    (err, info) => {
      if(err) {
        console.log('callback', err, info)
        return res.status(500).send()
      }
      console.log('info', info)
      res.status(200).send(info)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



