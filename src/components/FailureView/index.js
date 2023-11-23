import {failImgUrl} from '../../utils/constants'
import './index.css'

function FailureView() {
  return (
    <div className="error-view-container">
      <img src={failImgUrl} alt="error-img" className="failure-img" />
      <h1 className="failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )
}

export default FailureView
