import PropTypes from 'prop-types'
import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useAuthContext } from '../hooks/useAuthContext'
import { SubmitButton } from './SubmitButton'
import * as Icons from '@heroicons/react/24/solid'
import Swal from 'sweetalert2'
import Skeleton from 'react-loading-skeleton'

export const OneCommentInput = ({
  postID,
  commentOwner,
  className,
  fetchAllData
}) => {
  const [userData, setUserData] = useState(null)
  const [userId, setUserId] = useState(null)
  const { user } = useAuthContext()
  const [commentContent, setCommentContent] = useState('')
  const [comments, setComments] = useState([])
  const [lastFetchTime, setLastFetchTime] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [newComment, setNewComment] = useState(null)

  const createComment = async (
    posteId,
    profileId,
    commentContent,
    authToken
  ) => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `/api/comment/createComment/${posteId}/${profileId}`,
        { content: commentContent },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )
      setNewComment(response.data)
      setCommentContent('')
      setComments(prevComments => {
        const newComments = Array.isArray(prevComments)
          ? [...prevComments, response.data]
          : [response.data]
        return newComments
      })
      await Swal.fire({
        icon: 'success',
        title: 'Comment Created Successfully!',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then(() => {
        fetchAllData()
      })
      setLastFetchTime(Date.now())
    } catch (error) {
      console.error('Error creating comment:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error Creating Comment',
        text: 'An error occurred while creating the comment.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `/api/comment/getCommentsByPoste/${postID}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )
      setComments(response.data)
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }, [postID, user.token])

  useEffect(() => {
    const getUserIdFromToken = () => {
      if (user && user.token) {
        const id = jwtDecode(user.token)._id
        setUserId(id)
      }
    }
    getUserIdFromToken()
  }, [user])

  useEffect(() => {
    fetchComments()
  }, [postID, lastFetchTime, fetchComments])

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/profile/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          })
          setUserData(response.data.profile)
        } catch (error) {
          console.error('Error fetching profile data:', error)
        }
      }
    }

    fetchProfileData()
  }, [userId, user.token])

  const handleCommentSubmit = async () => {
    if (!commentContent.trim() || !userData || !userData._id) {
      return
    }

    try {
      setIsLoading(true)
      await createComment(postID, userData._id, commentContent, user.token)
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='self-stretch rounded-3xs bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[25px] '>
      <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
        {userData && userData.image ? (
          <img
            className='relative rounded-21xl w-[60px] h-[60px] object-cover'
            alt=''
            src={userData.image}
          />
        ) : (
          <Skeleton width={60} height={60} circle={true} />
        )}
        <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
          {userData ? (
            <b className='relative'>{`${userData.firstName} ${userData.lastName}`}</b>
          ) : (
            <Skeleton width={80} />
          )}
        </div>
      </div>
      <div className='self-stretch flex flex-col items-center justify-center  py-0 pr-0 pl-3.5 text-[17px] '>
        <b className='self-stretch relative flex flex-col  gap-5 '>
          <div className='sm:col-span-3'>
            <div className='mt-2'>
              <input
                type='text'
                id='commentInput'
                name='first-name'
                placeholder='Ajouter un commentaire'
                autoComplete='given-name'
                value={commentContent}
                onChange={e => setCommentContent(e.target.value)}
                className='block w-full rounded-md border-0 font-poppins text-lg py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-aliceblue-100 sm:text-sm sm:leading-6'
              ></input>
            </div>
          </div>
          <button
            type='button'
            onClick={handleCommentSubmit}
            data-te-ripple-init
            data-te-ripple-color='light'
            className='cursor-pointer flex items-center pl-4 w-fit h-full border-none rounded-lg bg-primary-500 p-2  leading-normal text-white drop-shadow-md transition duration-300 ease-in-out hover:bg-primary-600'
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
                d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
              />
            </svg>
            <span className='mr-3 font-poppins font-semibold'>Commenter</span>
          </button>
        </b>
      </div>
      {/* Condition pour afficher le squelette seulement lors de la création du commentaire */}
      {isLoading && (
        <div className='loading-skeleton'>
          {/* Votre squelette de chargement ici */}
        </div>
      )}
    </div>
  )
}

OneCommentInput.propTypes = {
  commentOwner: PropTypes.string
}
