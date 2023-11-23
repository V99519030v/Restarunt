/* eslint-disable prettier/prettier */
import {useState, useEffect, useContext} from 'react'
import NameContext from '../../utils/NameContext'
import {apiStatusConstants} from '../../utils/constants'
import Header from '../Header'
import TabItem from '../TabItem'
import ItemCard from '../ItemCard'
import LoaderA from '../LoadingView'
import FailureView from '../FailureView'
import './index.css'

function Home() {
  const [activeTabId, setActiveTabId] = useState(null)
  const {updateRestaurantName} = useContext(NameContext)
  const [apiResponse, setApiResponse] = useState({
    apiStatus: apiStatusConstants.initial,
    apiData: [],
  })

  //    const [res, setRes] = useState('')

  const getMenuDetails = async () => {
    setApiResponse(prev => ({
      ...prev,
      apiStatus: apiStatusConstants.inProgress,
    }))
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    if (response.ok) {
      const data = await response.json()
      setApiResponse(prev => ({
        ...prev,
        apiStatus: apiStatusConstants.success,
        apiData: data,
      }))
      updateRestaurantName(data[0]?.restaurant_name)
      //    setRes(data[0]?.restaurant_name)
      setActiveTabId(data[0]?.table_menu_list[0]?.menu_category_id)
    } else {
      setApiResponse(prev => ({...prev, apiStatus: apiStatusConstants.failure}))
    }
  }

  useEffect(() => {
    getMenuDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getTabsList = () => {
    if (apiResponse.apiData) {
      const tabs = apiResponse.apiData[0]?.table_menu_list.map(each => ({
        tabId: each.menu_category_id,
        displayText: each.menu_category,
      }))
      return tabs
    }
    return null
  }

  const clickTabItem = id => {
    setActiveTabId(id)
  }

  const renderTabsList = () => {
    const tabsList = getTabsList()
    return (
      <div className="tabs-con">
        <ul className="tabs-list">
          {tabsList?.map(each => (
            <TabItem
              key={each.tabId}
              tabsData={each}
              clickTabItem={clickTabItem}
              isActive={activeTabId === each.tabId}
            />
          ))}
        </ul>
      </div>
    )
  }

  const getFilteredMenuItems = () => {
    const filteredItems = apiResponse.apiData[0]?.table_menu_list.filter(
      each => each.menu_category_id === activeTabId,
    )
    return filteredItems[0]
  }

  const renderFilteredMenu = () => {
    const filteredMenuItems = getFilteredMenuItems()
    return (
      <ul className="menu-cont">
        {filteredMenuItems?.category_dishes.map(each => (
          <ItemCard key={each.dish_id} itemData={each} />
        ))}
      </ul>
    )
  }

  const renderSuccessView = () => (
    <div>
      <Header />
      {renderTabsList()}
      {renderFilteredMenu()}
    </div>
  )

  const renderHomePage = () => {
    switch (apiResponse.apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return <FailureView />
      case apiStatusConstants.inProgress:
        return <LoaderA />
      default:
        return null
    }
  }

  return <div>{renderHomePage()}</div>
}

export default Home
