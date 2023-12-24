import PropTypes from 'prop-types'
import React from 'react'
import profilePic from '../assets/profilepic.png'

export const OneCommentInput = ({
  commentOwner = 'Comment Owner', // howa li mconnecter
  className
}) => {
  return (
    <div className='self-stretch rounded-3xs bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[25px] '>
      <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
        <img
          className='relative rounded-21xl w-[60px] h-[60px] object-cover'
          alt=''
          src={profilePic}
        />
        <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
          <b className='relative'>{commentOwner}</b>
        </div>
      </div>
      <div className='self-stretch flex flex-col items-center justify-center  py-0 pr-0 pl-3.5 text-[17px] '>
        <b className='self-stretch relative '>
          <input
            type='text'
            id='commmentInput'
            class='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-lg focus:ring-blue-500 focus:border-blue-500'
          />
          <button
            type='submit'
            class='mt-2 bg-transparent hover:bg-[#017cc5] text-[#017cc5] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          >
            Valider
          </button>
        </b>
      </div>
    </div>
  )
}

OneCommentInput.propTypes = {
  commentDescription: PropTypes.string,
  commentTime: PropTypes.string,
  commentOwner: PropTypes.string
}
