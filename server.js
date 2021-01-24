console.log('Server Express')

const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  // port: 465,
  secure: false,
  // secure: true,
  auth: {
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
    console.log(message +' '+ email)
    if(!message) res.status(400)
    if(!email) res.status(400)
    res.send( '<h1>Server:</h1>'+email+'<br/>'+SUBJECT+'<br/>'+message )
    transporter.sendMail({
        from: "andisyy@gmail.com",
        to: email,
        subject: SUBJECT,
        text: message,
        // html: "<p>HTML version of the message</p>"
    },
    (err, info) => {
      if(err) {
        console.log('err', err)
        return res.status(500).send()
      }
      console.log('info', info)
      res.status(200).send(info)
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})







