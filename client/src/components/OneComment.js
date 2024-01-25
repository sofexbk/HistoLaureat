import PropTypes from 'prop-types'
import React from 'react'
import profilePic from '../assets/profilepic.png'

export const OneComment = ({
  commentDescription,
  commentTime,
  commentOwner,
  profilePic='',
}) => {
  
  return (
    <div className=' self-stretch relative rounded-3xs bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[25px] '>
      <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
        <img
          className='relative rounded-21xl w-[60px] h-[60px] object-cover'
          alt=''
          src={profilePic}
        />
        <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
          <b className='relative'>{commentOwner}</b>
          <div className='relative text-smi font-light text-darkgray'>
            {commentTime}
          </div>
        </div>
      </div>
      <div className='self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-3.5 text-[17px] '>
        <b className='self-stretch relative'>{`${commentDescription}`}</b>
      </div>
    </div>
  )
}

OneComment.propTypes = {
  commentDescription: PropTypes.string,
  commentTime: PropTypes.string,
  commentOwner: PropTypes.string
  
}
