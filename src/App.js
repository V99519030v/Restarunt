import {useState, useMemo} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import CartContext from './utils/CartContext'
import NameContext from './utils/NameContext'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

function App() {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('')

  const updateRestaurantName = resName => {
    setRestaurantName(resName)
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = id => {
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.dish_id !== id,
    )

    setCartList(updatedCartList)
  }

  const incrementCartItemQuantity = id => {
    setCartList(
      cartList.map(eachCartItem => {
        if (id === eachCartItem.dish_id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    )
  }

  const decrementCartItemQuantity = id => {
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dish_id === id,
    )
    if (productObject.quantity > 1) {
      setCartList(
        cartList.map(eachCartItem => {
          if (id === eachCartItem.dish_id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      )
    } else {
      removeCartItem(id)
    }
  }

  const addCartItem = product => {
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dish_id === product.dish_id,
    )

    if (productObject) {
      setCartList(
        cartList.map(eachCartItem => {
          if (productObject.dish_id === eachCartItem.dish_id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      )
    } else {
      const updatedCartList = [...cartList, product]

      setCartList(updatedCartList)
    }
  }

  const providerValue = useMemo(
    () => ({
      cartList,
      addCartItem,
      removeCartItem,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      removeAllCartItems,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartList],
  )

  const nameProviderValue = useMemo(
    () => ({restaurantName, updateRestaurantName}),
    [restaurantName],
  )

  return (
    <CartContext.Provider value={providerValue}>
      <NameContext.Provider value={nameProviderValue}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </NameContext.Provider>
    </CartContext.Provider>
  )
}

export default App
