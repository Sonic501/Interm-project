import React from 'react'

const ClosePopUpTooltip = (props) => {
  return (
    <button 
                className="absolute top-3 right-3 w-6 h-6 rounded-full flex justify-center 
                  items-center bg-gray-200 hover:bg-gray-300 focus:outline-none" 
                onClick={props.handleClosePopupTooltip}>
          <svg className="w-4 h-4 fill-current text-gray-600" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
  )
}

export default ClosePopUpTooltip