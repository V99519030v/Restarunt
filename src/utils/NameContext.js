import {createContext} from 'react'

const NameContext = createContext({
  restaurantName: '',
  updateRestaurantName: () => {},
})

export default NameContext
