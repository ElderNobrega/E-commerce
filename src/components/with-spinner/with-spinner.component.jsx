import React from 'react'

import './with-spinner.styles.scss'

const withSpinner = wrappedComponent => ({ isLoading, ...otherProps}) => {
  return isLoading ? (
    <div className='spinner-overlay'>
      <div className='spinner-container'>
      </div>
    </div>
  )
  :
  <wrappedComponent {...otherProps}/>
}

export default withSpinner