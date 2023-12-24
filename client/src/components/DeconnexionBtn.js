import PropTypes from 'prop-types'
import * as Icons from '@heroicons/react/24/solid'
import React, { useReducer } from 'react'

export const DeconnexionBtn = ({
  property1,
  className,
  icon,
  src,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || 'default'
  })

  const handleClick = () => {
    window.open(`${src}`, '_self')
  }
  const DynamicIcon = icon
  return (
    <button
    type='buton'
    onClick={handleClick}
    className={`border border-solid border-[#FF5284] inline-flex items-center gap-[15px] px-[15px] py-[10px] overflow-hidden rounded-[5px] relative shadow-md  hover:shadow-xl hover:shadow-rose-200 transition-all duration-300 ease-in-out 
    ${state.property1 === 'hover' ? 'bg-[#FF5284] cursor-pointer' : 'bg-transparent '}
    ${className}`}
    onMouseLeave={() => {
      dispatch('mouse_leave')
    }}
    onMouseEnter={() => {
      dispatch('mouse_enter')
    }}
  >
    <DynamicIcon
      className={`[h-6 w-6  ${
        state.property1 === 'hover' ? 'text-[#FFFFFF]' : 'text-[#FF5284]'
      }`}
    />
  </button>
  )
}

function reducer (state, action) {
  switch (action) {
    case 'mouse_enter':
      return {
        ...state,
        property1: 'hover'
      }
    case 'mouse_leave':
      return {
        ...state,
        property1: 'default'
      }
  }
  return state
}

DeconnexionBtn.propTypes = {
  property1: PropTypes.oneOf(['hover', 'default'])
}
