import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthContext } from '../hooks/useAuthContext';
import Swal from 'sweetalert2';

export const OneCommentInput = ({ postID, commentOwner, className }) => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const { user } = useAuthContext();
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  const createComment = async (posteId, profileId, commentContent, authToken) => {
    try {
      const response = await axios.post(
        `/api/comment/createComment/${posteId}/${profileId}`,
        { content: commentContent },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log('Comment created successfully:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Comment Created Successfully!',
        showConfirmButton: false,
        timer: 2000,
      });
      setCommentContent('');
      setComments((prevComments) => {
        const newComments = Array.isArray(prevComments) ? [...prevComments, response.data] : [response.data];
        return newComments;
      });
        setLastFetchTime(Date.now());
    } catch (error) {
      console.error('Error creating comment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error Creating Comment',
        text: 'An error occurred while creating the comment.',
      });
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/comment/getCommentsByPoste/${postID}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log('Fetched comments:', response.data);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [postID, user.token]);

  useEffect(() => {
    const getUserIdFromToken = () => {
      if (user && user.token) {
        const id = jwtDecode(user.token)._id;
        setUserId(id);
      }
    };
    getUserIdFromToken();
  }, [user]);

  useEffect(() => {
    fetchComments();
  }, [postID, lastFetchTime, fetchComments]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/profile/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setUserData(response.data.profile);
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfileData();
  }, [userId, user.token]);

  const handleCommentSubmit = async () => {
    if (!commentContent.trim() || !userData || !userData._id) {
      return;
    }

    try {
      await createComment(postID, userData._id, commentContent, user.token);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className='self-stretch rounded-3xs bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[25px] '>
      <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
        {userData && userData.image && (
          <img
            className='relative rounded-21xl w-[60px] h-[60px] object-cover'
            alt=''
            src={userData.image}
          />
        )}
        <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
          <b className='relative'>{`${userData && userData.firstName} ${userData && userData.lastName}`}</b>
        </div>
      </div>
      <div className='self-stretch flex flex-col items-center justify-center  py-0 pr-0 pl-3.5 text-[17px] '>
        <b className='self-stretch relative '>
          <input
            type='text'
            id='commentInput'
            className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-lg focus:ring-blue-500 focus:border-blue-500'
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button
            type='submit'
            onClick={handleCommentSubmit}
            className='mt-2 bg-transparent hover:bg-[#017cc5] text-[#017cc5] font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          >
            Valider
          </button>
        </b>
      </div>
    </div>
  );
};

OneCommentInput.propTypes = {
  commentOwner: PropTypes.string,
};
