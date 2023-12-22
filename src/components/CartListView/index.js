/* eslint-disable import/no-extraneous-dependencies */
import {v4} from 'uuid'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem cartItemDetails={eachCartItem} key={v4()} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
