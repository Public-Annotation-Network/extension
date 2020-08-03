import React from 'react'

const PrimaryButton = ({ label = 'ok', onClick, disabled = false }) => {
    return (
      <button className="primary-button" disabled={disabled} onClick={onClick}>
        {label}
      </button>
    )
  }
  
  const TerciaryButton = ({ label = 'ok', onClick, disabled = false }) => {
    return (
      <button className="terciary-button" disabled={disabled} onClick={onClick}>
        {label}
      </button>
    )
  }

  export {PrimaryButton, TerciaryButton}