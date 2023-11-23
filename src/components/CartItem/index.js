/* eslint-disable camelcase */
import {useContext} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../utils/CartContext'
import './index.css'

const CartItem = props => {
  const {
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext)
  const {cartItemDetails} = props
  const {
    dish_id,
    dish_name,
    dish_Type,
    quantity,
    dish_price,
    dish_currency,
    dish_image,
  } = cartItemDetails
  return (
    <li className="cart-item">
      <img src={dish_image} alt={dish_name} className="cart-product-image" />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{dish_name}</p>
          <p className="cart-product-brand">
            {dish_Type === 1 ? 'Non-Veg' : 'Veg'}
          </p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            onClick={() => {
              decrementCartItemQuantity(dish_id)
            }}
          >
            -
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            onClick={() => {
              incrementCartItemQuantity(dish_id)
            }}
          >
            +
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">
            {dish_currency} {dish_price * quantity}/-
          </p>
          <button
            className="remove-button"
            type="button"
            onClick={() => {
              removeCartItem(dish_id)
            }}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button "
        type="button"
        onClick={() => {
          removeCartItem(dish_id)
        }}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
