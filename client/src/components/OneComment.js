import PropTypes from 'prop-types'
import profilePic from '../assets/profilepic.png'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import Modal from 'react-modal'
import Skeleton from 'react-loading-skeleton'
import React, { useState, useEffect } from 'react'

export const OneComment = ({
  commentDescription,
  commentTime,
  commentOwner,
  profilePic = '',
  commentId,
  onDeleteClick,
  isCurrentUserCommentOwner,
  user,
  postID,
  resolvedProfileId,
  fetchAllData,
  comment
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(commentDescription)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const id = comment.profileId
  useEffect(() => {
    if (comment) {
      const fetchUserEmail = async () => {
        try {
          const response = await axios.get(`/api/user/getemail/${id}`)
          if (response.status === 200) {
            setEmail(response.data.email)
          } else {
            console.error('Failed to fetch user email:', response.data)
          }
        } catch (error) {
          console.error('Error fetching user email:', error)
        }
      }

      fetchUserEmail()
    }
  }, [email])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `api/comment/updateComment/${postID}/${commentId}/${resolvedProfileId}`,
        {
          content: editedComment
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      setIsEditing(false)
      fetchAllData()
    } catch (error) {
      console.error('Error updating comment:', error.message)
    }
  }
  const handleEditChange = e => {
    setEditedComment(e.target.value)
  }

  return (
    <div
      className={`self-stretch relative rounded-3xs bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[25px] }`}
    >
      <div className='flex flex-row flex-wrap items-center gap-[16px] w-full'>
        <img
          className='relative rounded-21xl w-[60px] h-[60px] object-cover'
          alt=''
          src={profilePic}
        />
        <div className='flex flex-row justify-between'>
          <div className='shrink-0 flex flex-col justify-start gap-[5px]'>
            <b className='relative'>{commentOwner}</b>
            <div className='flex flex-row gap-6'>
              <div className='relative text-smi font-light text-darkgray'>
                {email}
              </div>
              <div className='relative text-smi font-light text-darkgray'>
                {commentTime}
              </div>
            </div>
          </div>
          {loading ? (
            <div className='flex gap-4'>
              <Skeleton height={36} width={100} />
              <Skeleton height={36} width={100} />
            </div>
          ) : (
            isCurrentUserCommentOwner &&
            !isEditing && (
              <>
                <div className='flex flex-row gap-4 ml-10'>
                  <button
                    type='button'
                    onClick={handleEditClick}
                    data-te-ripple-init
                    data-te-ripple-color='light'
                    className='cursor-pointer items-center h-full border-none flex rounded-lg bg-white p-2 uppercase leading-normal text-white drop-shadow-md transition duration-300 ease-in-out hover:bg-success-600 '
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1'
                      stroke='currentColor'
                      className='w-6 h-6 text-success hover:text-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                      />
                    </svg>
                  </button>

                  <button
                    type='button'
                    onClick={onDeleteClick}
                    data-te-ripple-init
                    data-te-ripple-color='light'
                    className=' cursor-pointer items-center h-full border-none flex rounded-lg bg-white p-2 uppercase leading-normal text-white drop-shadow-md transition duration-300 ease-in-out hover:bg-danger-600 '
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1'
                      stroke='currentColor'
                      className='w-6 h-6 text-danger hover:text-white '
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                      />
                    </svg>
                  </button>
                </div>
              </>
            )
          )}
        </div>
      </div>
      <div className='self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-3.5 text-[17px]'>
        {isEditing ? (
          <>
            <textarea
              className='w-full border rounded-md p-2 mb-4'
              value={editedComment}
              onChange={handleEditChange}
            />
            <div className='flex space-x-4'>
              <button
                type='button'
                onClick={handleCancelEdit}
                data-te-ripple-init
                data-te-ripple-color='light'
                className='cursor-pointer flex items-center h-full border-none rounded-lg bg-danger-600 p-2  leading-normal text-white drop-shadow-md transition duration-300 ease-in-out hover:bg-danger-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  className='w-6 h-6 text-white transition duration-300 ease-in-out mr-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18 18 6M6 6l12 12'
                  />
                </svg>
                <span className='mr-3 font-poppins font-medium '>Annuler</span>
              </button>
              <button
                type='button'
                onClick={handleSaveEdit}
                data-te-ripple-init
                data-te-ripple-color='light'
                class='cursor-pointer flex items-center h-full border-none rounded-lg bg-emerald-500 p-2  leading-normal text-white drop-shadow-md transition duration-300 ease-in-out hover:bg-emerald-600'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  className='w-6 h-6 text-white transition duration-300 ease-in-out mr-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m4.5 12.75 6 6 9-13.5'
                  />
                </svg>
                <span className='mr-3 font-poppins font-medium'>
                  Enregistrer
                </span>
              </button>
            </div>
          </>
        ) : (
          <b className='self-stretch relative'>{`${commentDescription}`}</b>
        )}
      </div>
    </div>
  )
}
OneComment.propTypes = {
  commentDescription: PropTypes.string,
  commentTime: PropTypes.string,
  commentOwner: PropTypes.string,
  onDeleteClick: PropTypes.func,
  isCurrentUserCommentOwner: PropTypes.bool
}
