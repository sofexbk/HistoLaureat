import PropTypes from 'prop-types'
import * as Icons from '@heroicons/react/24/solid'
import React, { useReducer } from 'react'

export const ButtonIcon = ({
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
    className={`border border-solid border-[#017cc5] inline-flex items-center gap-[15px] px-[15px] py-[11px] overflow-hidden rounded-[5px] relative shadow-md  hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 ease-in-out
    ${state.property1 === 'hover' ? 'bg-[#017cc5] cursor-pointer' : 'bg-transparent '}
    ${className}`}
    onMouseLeave={() => {
      dispatch('mouse_leave')
    }}
    onMouseEnter={() => {
      dispatch('mouse_enter')
    }}
  >
    <DynamicIcon
      className={`[h-8 w-8  ${
        state.property1 === 'hover' ? 'text-[#FFFFFF]' : 'text-[#017CC5]'
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

ButtonIcon.propTypes = {
  property1: PropTypes.oneOf(['hover', 'default'])
}
