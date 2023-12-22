import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

// import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'
import CartContext from '../../Context/CartContext'

const Header = props => {
  const onLogoutButtonClick = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <nav className="navbar">
            <Link to="/" className="nav-link-item">
              <h1>UNI Resto Cafe</h1>
            </Link>
            <div className="cart-container">
              <p className="para">My Orders</p>
              <button
                type="button"
                className="logout-button"
                onClick={onLogoutButtonClick}
              >
                Logout
              </button>
              <Link to="/cart" className="nav-link-item">
                <button type="button" className="cart-icon-button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                    alt="nav cart"
                    className="cart"
                  />
                </button>
              </Link>
              <p className="count">{cartList.length}</p>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
