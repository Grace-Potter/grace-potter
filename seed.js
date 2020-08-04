const {db, Product, User} = require('./server/db')

products = [
  {
    name: 'ME OK Mug',
    price: 55.0,
    quantity: 5,
    description: 'A wheel thrown and hand painted mug by Marian Bull',
    imageUrl: 'public/MeOk.jpg'
  },
  {
    name: 'MB x HB Phone Box II',
    price: 95.0,
    quantity: 1,
    description:
      'Sleeping place or coffin or resting place for your phone. Hand made by Marian Bull and painted by Halith Bates',
    imageUrl: 'public/phone-box.jpg'
  },
  {
    name: 'Kohiki Mug',
    price: 55.0,
    quantity: 5,
    description: 'Kohiki (white slip) mug by Akira Satake',
    imageUrl: 'public/kohiki-mug.jpg'
  }
]
