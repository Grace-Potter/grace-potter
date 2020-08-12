import React from 'react'
import {Toast, ToastBody, ToastHeader} from 'reactstrap'

const AddSuccess = () => {
  return (
    <div className="p-3 my-2 rounded bg-docs-transparent-grid">
      <Toast>
        <ToastHeader>Grace Potter</ToastHeader>
        <ToastBody>Added to cart!</ToastBody>
      </Toast>
    </div>
  )
}

export default AddSuccess
