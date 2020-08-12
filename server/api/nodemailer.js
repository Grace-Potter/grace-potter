const router = require('express').Router()
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')

module.exports = router

router.post('/:email/:orderId', async (req, res, next) => {
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

    const msg = {
      from: '"Grace Potter" <gracepotter2020@outlook.com>',
      to: req.params.email,
      subject: 'Your Order Has Been Received!',
      text: `Howdy!
      We have received your order, and all your items are on their way.
      For reference, here is your Order ID: ${req.params.orderId}.`,
      html: `
      <p>Howdy!</p>
      <p>We have received your order, and all your items are on their way.</p>
      <p>For reference, here is your Order ID: ${req.params.orderId}.</p>
      `
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
