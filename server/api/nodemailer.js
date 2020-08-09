const router = require('express').Router()
const nodemailer = require('nodemailer')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let transporter = nodemailer.createTransport({
      //
    })

    const {email} = req.body
    const msg = {
      from: 'Grace Potter',
      to: `${email}`,
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
