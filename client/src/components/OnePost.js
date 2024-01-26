import PropTypes from 'prop-types'
import React from 'react'
import profilePic from '../assets/profilepic.png'
import { Button } from './ButtonComponent'
import * as Icons from '@heroicons/react/24/solid'
import { AccordionBox } from './AccordionBox'
import { OneComment } from './OneComment'
import { OneCommentInput } from './OneCommentInput'
import { useEffect, useState } from 'react';


export const OnePost = ({
  profileStatus = "",
  description = '',
  profileName = '',
  profilePic='',
  comments = [],
  postID,
  title,
  onDeleteClick,
  isCurrentUserPost,
  
})  => {

    return (
    <>
      <div className='self-stretch flex flex-col items-start justify-start shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out '>
       
        <div className='mb-[-20px] self-stretch rounded-t-xl rounded-b-none bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[20px]'>
          <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
            <img
              className='relative rounded-21xl w-[60px] h-[60px] object-cover'
              alt=''
              src={profilePic}
            />
            <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
              <b>
              {isCurrentUserPost && (
             <button 
             onClick={() => onDeleteClick(postID)}        
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"  >
             <span>Delete</span>
             </button>
              )}
              </b>
              <b className='relative'>
                {profileName}
                </b>

              <div className='relative text-smi font-light text-darkgray'>
                {profileStatus}
              </div>
            </div>
          </div>
          <div className='mb-4 self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-3.5'>
          <h2 className='text-2xl font-bold'>{title}</h2>
          </div>
          <div className='mb-4 self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-3.5'>
         <p className='[margin-block-start:0] [margin-block-end:1px] text-lg'>{description}</p>
        </div>
        </div>
        <AccordionBox postID={postID} commentaires={comments} />
      </div>
    </>
  )
}

OnePost.propTypes = {
  profileStatus: PropTypes.string,
  description: PropTypes.string,
  profileName: PropTypes.string,
  profileData: PropTypes.object, 
  comments: PropTypes.array, 
  title: PropTypes.string,
 }
