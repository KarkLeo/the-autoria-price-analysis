import React from 'react'
import './Loader.css'

export const Loader = ({ loading = false, counter = 0 }) => {
  return (
    <>
      {loading && (
        <div className='loader'>
          <div className='loader__spinner' />
          <div className='loader__label'>
            <span className='loader__title'>Заванажено автівок:</span>
            <span
              className={`loader__counter ${
                counter > 9999 ? 'loader__counter--small' : ''
              }`}
            >
              {counter}
            </span>
          </div>
        </div>
      )}
    </>
  )
}
