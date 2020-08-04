'use strict'

const {green, red} = require('chalk')
const db = require('../server/db')
const {User, Product} = require('../server/db/models')

products = [
  {
    name: 'ME OK Mug',
    price: 55.0,
    quantity: 5,
    description: 'A wheel thrown and hand painted mug by Marian Bull',
    imageUrl: 'images/MeOk.jpg'
  },
  {
    name: 'MB x HB Phone Box II',
    price: 95.0,
    quantity: 1,
    description:
      'Sleeping place or coffin or resting place for your phone. Hand made by Marian Bull and painted by Halith Bates',
    imageUrl: 'images/phone-box.jpg'
  },
  {
    name: 'Kohiki Mug',
    price: 55.0,
    quantity: 5,
    description: 'Kohiki (white slip) mug by Akira Satake',
    imageUrl: 'images/kohiki-mug.jpg'
  },
  {
    name: 'Kohiki Vase',
    price: 485.0,
    quantity: 3,
    description: 'Kohiki (white slip) vase/sculpture by Akira Satake',
    imageUrl: 'images/kohiki-vase.jpg'
  },
  {
    name: 'Large Moon Jar',
    price: 204.47,
    quantity: 1,
    description: 'Moon jar by Steve Booton',
    imageUrl: 'images/SB-moon-jar.jpg'
  },
  {
    name: 'Yunomi Tea Bowl',
    price: 68.16,
    quantity: 8,
    description: 'Yunomi by Steve Booton',
    imageUrl: 'images/SB-yunomi.jpg'
  },
  {
    name: 'Dot Mug',
    price: 45.0,
    quantity: 15,
    description: 'Stoneware textured mug. Hand built by Katie Burk',
    imageUrl: 'images/KFB_dotmug_collection.png'
  },
  {
    name: 'Large Vase',
    price: 160.0,
    quantity: 3,
    description: 'Hand built by Katie Burk',
    imageUrl: 'images/KFB_vase_3.jpg'
  },
  {
    name: 'Vase',
    price: 400.0,
    quantity: 1,
    description: 'Stoneware vase by Nadeige Choplet',
    imageUrl: 'images/choplet-vase.png'
  },
  {
    name: 'Spoon Holder',
    price: 72.0,
    quantity: 7,
    description: 'Spoon holder by Nicole Sarby',
    imageUrl: 'images/spoon-holder.jpeg'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 0; i < 6; i++) {
    const user = await User.create({
      email: `${loremIpsum({count: 1, units: 'word'})}@fsa.com`,
      password: password,
      firstName: loremIpsum({count: 1, units: 'word'}),
      lastName: loremIpsum({count: 1, units: 'word'})
    })
    users.push(user)
  }

  console.log(`seeded ${users.length} users`)

  products = products.map(async item => {
    const instance = Product.create(item)
    return instance
  })

  console.log(`seeded ${products.length} products`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
