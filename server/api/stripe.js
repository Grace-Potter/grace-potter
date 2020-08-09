// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
const stripe = require('stripe')(STRIPE_SECRET_KEY)
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      paymentMethodTypes: ['card'],
      lineItems: [
        {
          priceData: {
            currency: 'usd',
            productData: {
              name: 'T-shirt'
            },
            unitAmount: 2000
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      successUrl:
        'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
      cancelUrl: 'https://example.com/cancel'
    })
  } catch (err) {
    next(err)
  }
})
