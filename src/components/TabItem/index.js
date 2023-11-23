import './index.css'

function TabItem(props) {
  const {tabsData, clickTabItem, isActive} = props
  const {tabId, displayText} = tabsData
  const onClickTabItem = () => {
    clickTabItem(tabId)
  }

  const activeTabClassName = isActive ? 'active-btn' : ''
  return (
    <li className="tab-item">
      <button
        type="button"
        className={`tab-btn ${activeTabClassName}`}
        onClick={onClickTabItem}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
