import PropTypes from 'prop-types'
import * as Icons from '@heroicons/react/24/solid'
import React, { useReducer } from 'react'

export const SubmitButton = ({
  property1,
  className,
  buttonTxt,
  icon,
  onclick,
  disabled
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || 'default'
  })

  const DynamicIcon = icon
  return (
    <button
      onClick={onclick}
      type="submit"
      disabled={disabled}
      className={`border border-solid border-[#017cc5] inline-flex items-center gap-[15px] px-[30px] py-[15px] overflow-hidden rounded-[5px] relative shadow-md  hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 ease-in-out
    ${state.property1 === 'hover' ? 'bg-[#017cc5] cursor-pointer' : 'bg-transparent '}
    ${className}`}
      onMouseLeave={() => {
        dispatch('mouse_leave')
      }}
      onMouseEnter={() => {
        dispatch('mouse_enter')
      }}
    >
      <div
        className={`font-bold whitespace-nowrap relative ${
          state.property1 === 'hover' ? 'text-white' : 'text-[#017cc5]'
        } w-fit mt-[-1.00px] tracking-[0.10px] text-[20px]`}
        style={{ fontFamily: "'Montserrat', 'Helvetica', sans-serif" }}
      >
        {buttonTxt}
      </div>
      <DynamicIcon
        className={`[h-6 w-6  ${
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

SubmitButton.propTypes = {
  property1: PropTypes.oneOf(['hover', 'default'])
}
