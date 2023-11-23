import {useContext} from 'react'
import CartContext from '../../utils/CartContext'
import './index.css'

const CartSummary = () => {
  const {cartList} = useContext(CartContext)
  let total = 0
  cartList.forEach(eachCartItem => {
    total += eachCartItem.dish_price * eachCartItem.quantity
  })

  return (
    <>
      <div className="cart-summary-container">
        <h1 className="order-total-value">
          <span className="order-total-label">Order Total:</span>
          {cartList[0]?.dish_currency} {total}
          /-
        </h1>
        <p className="total-items">{cartList.length} Items in cart</p>
        <button type="button" className="checkout-button d-sm-none">
          Checkout
        </button>
      </div>
      <button type="button" className="d-lg-none checkout-button">
        Checkout
      </button>
    </>
  )
}

export default CartSummary
