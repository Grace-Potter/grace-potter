/**
 * REDUCER
 */
const initialState = {
  cart: [
    {
      id: 1,
      name: 'ME OK Mug',
      price: 55.0,
      quantity: 5,
      description: 'A wheel thrown and hand painted mug by Marian Bull',
      imageUrl: 'images/MeOk.jpg'
    },
    {
      id: 2,
      name: 'MB x HB Phone Box II',
      price: 95.0,
      quantity: 1,
      description:
        'Sleeping place or coffin or resting place for your phone. Hand made by Marian Bull and painted by Halith Bates',
      imageUrl: 'images/phone-box.jpg'
    },
    {
      id: 3,
      name: 'Kohiki Mug',
      price: 55.0,
      quantity: 5,
      description: 'Kohiki (white slip) mug by Akira Satake',
      imageUrl: 'images/kohiki-mug.jpg'
    }
  ]
}

export default function(state = initialState, action) {
  return state
}
