import React from 'react'
import {connect} from 'react-redux'

const singleItemView = props => {
  console.log('props.state', props.state)
  return <div>hello single Item</div>
}

const mapStateToProps = reducerState => ({
  state: reducerState.singleItem.testState
})

export default connect(mapStateToProps)(singleItemView)
