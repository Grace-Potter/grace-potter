// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const router = require('express').Router()
const stripe = require('stripe')(
  'sk_test_51HEG04K8Jj6AqAF5FiEY3W0K2goOp4hP8snXTL75QPgmntI4llWLrzce0RQRydJ9hvlJ44dW0z5D7XFltybpE9Rs00YCODxb46'
)
module.exports = router

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLISHABLE_KEY

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
    res.json({sessionId: session.id})
  } catch (err) {
    next(err)
  }
})
