import PropTypes from 'prop-types'
import profilePic from '../assets/profilepic.png'
import Swal from 'sweetalert2';
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import Modal from 'react-modal'; 
import Skeleton from 'react-loading-skeleton'
import React, { useState, useEffect } from 'react';

export const OneComment = ({
  commentDescription,
  commentTime,
  commentOwner,
  profilePic='',
  commentId,
  onDeleteClick,
  isCurrentUserCommentOwner,
  user,
  postID,
  resolvedProfileId,
  fetchAllData,
  comment
}) => {
  console.log("dsds",comment)
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commentDescription);
  const [loading, setLoading] = useState(true); 
  const [email,setEmail]=useState('')
  const id=comment.profileId
  useEffect(() => {
    if (comment) {
      const fetchUserEmail = async () => {
        try {
          const response = await axios.get(`/api/user/getemail/${id}`);
          if (response.status === 200) {
            setEmail(response.data.email);
          } else {
            console.error('Failed to fetch user email:', response.data);
          }
        } catch (error) {
          console.error('Error fetching user email:', error);
        }
      };
  
      fetchUserEmail();
    }
  }, [email]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
    };
    fetchData();
  }, []);


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `api/comment/updateComment/${postID}/${commentId}/${resolvedProfileId}`,
        {
          content: editedComment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIsEditing(false);
      fetchAllData()
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };
  const handleEditChange = (e) => {
    setEditedComment(e.target.value);
  };


  return (
    <div className={`self-stretch relative rounded-3xs bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[25px] }`}>
          <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
            <img
              className='relative rounded-21xl w-[60px] h-[60px] object-cover'
              alt=''
              src={profilePic}
            />
            <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
              <b className='relative'>{commentOwner}</b>

              <div className='relative text-smi font-light text-darkgray'>
                {email}
              </div>
              <div className='relative text-smi font-light text-darkgray'>
                {commentTime}
              </div>
            </div>
            {loading ? (
          <div className="flex gap-4">
            <Skeleton height={36} width={100} />
            <Skeleton height={36} width={100} />
          </div>
        ) : (
          isCurrentUserCommentOwner && !isEditing && (
            <>
              <button
                onClick={handleEditClick}
                className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                <span>Modifier</span>
              </button>
              <button
                onClick={onDeleteClick}
                className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                <span>Supprimer</span>
              </button>
            </>
          )
        )}
          </div>
          <div className='self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-3.5 text-[17px]'>
            {isEditing ? (
              <>
                <textarea
                  className="w-full border rounded-md p-2 mb-4"
                  value={editedComment}
                  onChange={handleEditChange}
                />
                <div className="flex space-x-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveEdit}>
                    Save Changes
                  </button>
                  <button className="bg-orange-300 hover:bg-orange-700 text-gray-800 font-bold py-2 px-4 rounded" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <b className='self-stretch relative'>{`${commentDescription}`}</b>
            )}
          </div>
    </div>
  );
};
OneComment.propTypes = {
  commentDescription: PropTypes.string,
  commentTime: PropTypes.string,
  commentOwner: PropTypes.string,
  onDeleteClick: PropTypes.func,
  isCurrentUserCommentOwner: PropTypes.bool,

}
