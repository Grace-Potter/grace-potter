const router = require('express').Router()
const nodemailer = require('nodemailer')

module.exports = router

router.post('/:email', async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'janet40@ethereal.email',
        pass: 'Hu3mUWAAwaxeSY2jbH'
      }
    })

    console.log(typeof req.body)
    const msg = {
      from: 'Grace Potter',
      to: req.params.email,
      subject: 'Your Order Has Been Received!',
      text: 'Howdy!',
      html: '<p>Howdy!</p>'
    }

    const info = await transporter.sendMail(msg)
    console.log(info)

    res.json('Email sent!')
  } catch (err) {
    next(err)
  }
})
