import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../utils/CartContext'
import NameContext from '../../utils/NameContext'
import './index.css'

const Header = props => {
  const {cartList} = useContext(CartContext)
  const {restaurantName} = useContext(NameContext)
  //    const {resName} = props

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="he-con">
      <Link to="/" className="rntd">
        <h1 className="res-name">{restaurantName}</h1>
      </Link>
      <div className="he-con1">
        <p className="he-para">My Orders</p>
        <Link to="/cart">
          <AiOutlineShoppingCart className="cart-icon" />
        </Link>
        <p className="c-badge">{cartList.length} </p>
        <button className="lo-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
