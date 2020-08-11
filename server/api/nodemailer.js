const router = require('express').Router()
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

module.exports = router

router.post('/:email', async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      secureConnection: false,
      port: 587,
      tls: {
        ciphers: 'SSLv3'
      },
      auth: {
        user: 'gracepotter2020@outlook.com',
        pass: 'babybear2020'
      }
    })

    console.log(typeof req.body)
    const msg = {
      from: '"Grace Potter" <gracepotter2020@outlook.com>',
      to: req.params.email,
      subject: 'Your Order Has Been Received!',
      text: 'Howdy!',
      html: '<p>Howdy!</p>'
    }

    transporter.sendMail(msg, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message Sent: ', info.response)
    })

    res.json('Email sent!')
  } catch (err) {
    next(err)
  }
})
