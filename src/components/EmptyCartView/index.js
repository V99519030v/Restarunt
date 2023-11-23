import {Link} from 'react-router-dom'
import {emptyCartImgUrl} from '../../utils/constants'
import './index.css'

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img src={emptyCartImgUrl} alt="cart empty" className="cart-empty-img" />
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

    <Link to="/">
      <button type="button" className="shop-now-btn">
        Menu
      </button>
    </Link>
  </div>
)

export default EmptyCartView
