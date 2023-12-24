import PropTypes from 'prop-types'
import React from 'react'
import profilePic from '../assets/profilepic.png'
import { Button } from './ButtonComponent'
import * as Icons from '@heroicons/react/24/solid'
import { AccordionBox } from './AccordionBox'
import { OneComment } from './OneComment'
import { OneCommentInput } from './OneCommentInput'

export const OnePost = ({
  profileStatus = "A L'instant",
  description = 'Description',
  profileName = 'Nom',
  commentaires,
  className
}) => {
  return (
    <>
      {/* ---PARTIE 1--- */}
      <div className='self-stretch flex flex-col items-start justify-start shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out '>
        <div className='mb-[-20px] self-stretch rounded-t-xl rounded-b-none bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[20px]'>
          {/* 1.2.2 - POST OWNER (name / img / time) */}

          <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
            <img
              className='relative rounded-21xl w-[60px] h-[60px] object-cover'
              alt=''
              src={profilePic}
            />
            <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
              <b className='relative'>{profileName}</b>
              <div className='relative text-smi font-light text-darkgray'>
                {profileStatus}
              </div>
            </div>
          </div>
          {/* 1.2.3 - POST ITSELF */}
          <div className='mb-4 self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-3.5'>
            <b className='self-stretch relative'>
              <p className='[margin-block-start:0] [margin-block-end:1px]'>
                {description}
              </p>
            </b>
          </div>
        </div>
        {/* ---PARTIE 2--- */}
        {/* 1.2.4 - POSTE COMMENT */}
        <AccordionBox commentaires={commentaires} />
      </div>
    </>
  )
}

OnePost.propTypes = {
  profileStatus: PropTypes.string,
  description: PropTypes.string,
  profileName: PropTypes.string
}
