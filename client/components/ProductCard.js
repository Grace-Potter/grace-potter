import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteproduct} from '../store/allProducts'
import {Card, CardImg, CardText, CardBody, CardTitle, Button} from 'reactstrap'
import AddSuccess from './toast'

// const ProductCard = props => {
//   const {name, imageUrl, id, fromPortal, removeProduct} = props
//   return (
//     <div className="card">
//       <img src={imageUrl} />
//       <Link to={`/products/${id}`}>{name}</Link>
//       <div>
//         {fromPortal && (
//           <Link to={`/admin-portal/manageproducts/${id}`}>
//             <button type="button">edit</button>
//           </Link>
//         )}
//         {fromPortal && (
//           <button type="button" onClick={() => removeProduct(id)}>
//             delete
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }

const ProductCard = props => {
  const {name, imageUrl, price, id, fromPortal, removeProduct} = props
  return (
    // <div className="card">
    <Link to={`/products/${id}`}>
      {/* <div> */}
      <Card className="text-center shadow p-3 mb-5 bg-white rounded">
        <CardImg top src={imageUrl} alt="Card image cap" />
        <CardBody>
          <CardTitle className="bold">{name}</CardTitle>
          <CardText className="bold">{`$${price / 100}`}</CardText>
          {fromPortal && (
            <Link to={`/admin-portal/manageproducts/${id}`}>
              <Button color="primary">edit</Button>
            </Link>
          )}
          {fromPortal && (
            <Button
              color="danger"
              onClick={() => {
                removeProduct(id)
                AddSuccess()
              }}
            >
              delete
            </Button>
          )}
        </CardBody>
      </Card>
      {/* </div> */}
    </Link>
  )
}

const mapDispatch = dispatch => ({
  removeProduct: id => dispatch(deleteproduct(id))
})

export default connect(null, mapDispatch)(ProductCard)
