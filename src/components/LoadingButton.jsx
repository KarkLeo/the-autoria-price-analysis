import React from 'react'
import './LoadingButton.css'

export const LoadingButton = ({ onClick, disabled }) => {
  return (
    <div className='loading-button'>
      <button
        className='loading-button__control'
        onClick={onClick}
        disabled={disabled}
      >
        Завантажити аналітику
      </button>
    </div>
  )
}
