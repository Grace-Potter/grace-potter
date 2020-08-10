'use strict'

const {green, red} = require('chalk')
const loremIpsum = require('lorem-ipsum').loremIpsum
const db = require('../server/db')
const {User, Product, Order, Category} = require('../server/db/models')

let categories = [
  {
    category: 'Vase'
  },
  {
    category: 'Mug'
  },
  {
    category: 'Bowl'
  },
  {
    category: 'Other'
  }
]

let products = [
  {
    name: 'ME OK Mug',
    price: 5500,
    quantity: 5,
    description: 'A wheel thrown and hand painted mug by Marian Bull',
    imageUrl: '/images/MeOk.jpg',
    categoryId: 2
  },
  {
    name: 'MB x HB Phone Box II',
    price: 9500,
    quantity: 1,
    description:
      'Sleeping place or coffin or resting place for your phone. Hand made by Marian Bull and painted by Halith Bates',
    imageUrl: '/images/phone-box.jpg',
    categoryId: 4
  },
  {
    name: 'Kohiki Mug',
    price: 5500,
    quantity: 5,
    description: 'Kohiki (white slip) mug by Akira Satake',
    imageUrl: '/images/kohiki-mug.jpg',
    categoryId: 2
  },
  {
    name: 'Kohiki Vase',
    price: 48500,
    quantity: 3,
    description: 'Kohiki (white slip) vase/sculpture by Akira Satake',
    imageUrl: '/images/kohiki-vase.jpg',
    categoryId: 1
  },
  {
    name: 'Large Moon Jar',
    price: 20447,
    quantity: 1,
    description: 'Moon jar by Steve Booton',
    imageUrl: '/images/SB-moon-jar.jpg',
    categoryId: 4
  },
  {
    name: 'Yunomi Tea Bowl',
    price: 6816,
    quantity: 8,
    description: 'Yunomi by Steve Booton',
    imageUrl: '/images/SB-yunomi.jpg',
    categoryId: 3
  },
  {
    name: 'Dot Mug',
    price: 4500,
    quantity: 15,
    description: 'Stoneware textured mug. Hand built by Katie Burk',
    imageUrl: '/images/KFB_dotmug_collection.png',
    categoryId: 2
  },
  {
    name: 'Large Vase',
    price: 16000,
    quantity: 3,
    description: 'Hand built by Katie Burk',
    imageUrl: '/images/KFB_vase_3.png',
    categoryId: 1
  },
  {
    name: 'Vase',
    price: 40000,
    quantity: 1,
    description: 'Stoneware vase by Nadeige Choplet',
    imageUrl: '/images/choplet-vase.png',
    categoryId: 1
  },
  {
    name: 'Spoon Holder',
    price: 7200,
    quantity: 7,
    description: 'Spoon holder by Nicole Sarby',
    imageUrl: '/images/spoon-holder.jpeg',
    categoryId: 4
  }
]

const users = []

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  for (let i = 0; i < categories.length; i++) {
    const instance = await Category.create(categories[i])
    categories[i] = instance
  }

  console.log(`seeded ${categories.length} categories`)

  for (let i = 0; i < 6; i++) {
    const user = await User.create({
      email: `${loremIpsum({count: 1, units: 'word'})}@fsa.com`,
      password: 'password',
      firstName: loremIpsum({count: 1, units: 'word'}),
      lastName: loremIpsum({count: 1, units: 'word'})
    })
    users.push(user)
  }

  const admin = await User.create({
    email: 'admin@email.com',
    password: 'babybear2020',
    isAdmin: true
  })
  users.push(admin)

  console.log(`seeded ${users.length} users`)

  for (let i = 0; i < products.length; i++) {
    const instance = await Product.create(products[i])
    products[i] = instance
  }

  console.log(`seeded ${products.length} products`)

  // make one pending order for the first user
  const order = await Order.create({})
  await users[0].addOrder(order)
  await Promise.all([
    order.addProduct(products[0]),
    order.addProduct(products[1]),
    order.addProduct(products[2]),
    order.addProduct(products[3])
  ])

  console.log(green(`seeded successfully`))
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
