import React, {Component} from 'react'
import {connect} from 'react-redux'

/* 
    name: 'ME OK Mug',
    price: 55.0,
    quantity: 5,
    description: 'A wheel thrown and hand painted mug by Marian Bull',
    imageUrl: 'images/MeOk.jpg'
*/
class singleProductView extends Component {
  constructor() {
    super()
  }
  render() {
    console.log('this.props.state', this.props.state)
    return (
      <div>
        <h2>Single Product Name</h2>
      </div>
    )
  }
}

const mapStateToProps = reducerState => ({
  state: reducerState.singleProduct.testState
})

export default connect(mapStateToProps)(singleProductView)
