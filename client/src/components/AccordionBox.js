import React, { useState, useEffect } from 'react';
import { OneComment } from './OneComment';
import { OneCommentInput } from './OneCommentInput';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton'

export const AccordionBox = ({ postID, commentaires,fetchAllData,resolvedProfileId }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const { user } = useAuthContext();
  const [userId, setUserId] = useState(null);
  const [profileId, setProfileId] = useState(null);
  const [comments, setComments] = useState(commentaires); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserIdFromToken = () => {
      if (user && user.token) {
        const id = jwtDecode(user.token)._id;
        setUserId(id);
      }
    };
    
    const fetchData = async () => {
      getUserIdFromToken();
      if (userId) {
        try {
          const response = await axios.get(`/api/profile/${userId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setProfileId(response.data.profile._id);
        } catch (error) {
          console.error('Erreur lors de la requête :', error);
        }
      }
    };
    
    fetchData();
  }, [userId, user]);

  const fetchProfileData = async (profileId) => {
    try {
      const response = await axios.get(`/api/profile/pr/${profileId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileIds = commentaires.map((comment) => comment.profileId);
        const profilesData = await Promise.all(profileIds.map(fetchProfileData));
        setProfileData(profilesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [commentaires, user.token]);

  const rotationDegree = accordionOpen ? 'rotate-180' : 'rotate-0';

  const handleDeleteComment = async (commentId) => {
    const confirmationResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });
      if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `/api/comment/deleteCommentByPost/${postID}/${commentId}/${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        fetchAllData()
        setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
        Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting comment:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    }
  };
  
  
  return (
    <>
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className='border-none relative w-full flex flex-col items-start bg-[#DBF2FF] justify-start text-left text-[20px] text-steelblue font-poppins hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out'
      >
        <div className='self-stretch rounded-t-none bg-[#DBF2FF] rounded-b-xl bg-aliceblue flex flex-row items-center justify-start py-5 pr-0 pl-[50px]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='#017CC5'
            className={`w-6 h-6 mr-4 transition-transform duration-500 transform ${rotationDegree}`}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5' />
          </svg>

          <div className='relative font-light flex items-center w-full h-[30px] text-[#017CC5] '>
            {accordionOpen ? 'Masquer les commentaires' : 'Afficher les commentaires'}
          </div>
        </div>
      </button>

      <div
        className={`grid self-stretch relative overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen ? 'grid-rows-auto opacity-100' : 'grid-rows-0 opacity-0 visibility-hidden'
        }`}
        style={{ height: accordionOpen ? 'auto' : 0 }}
      >
        <div className='bg-aliceblue-200 self-stretch relative flex flex-col items-center justify-start p-4 gap-4 rounded-b-2xl'>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Skeleton height={100} width={600} />
              </div>
            ))
          ) : (
            commentaires.map((comment, index) => (
              <React.Fragment key={comment._id}>
                {profileData && profileData[index] ? (
                  <OneComment
                    commentOwner={`${profileData[index].firstName || ''} ${profileData[index].lastName || ''}`}
                    commentTime={new Date(comment.creationDate).toLocaleString()}
                    commentDescription={comment.content}
                    profilePic={profileData[index].image}
                    isCurrentUserCommentOwner={profileId === comment.profileId}
                    onDeleteClick={() => handleDeleteComment(comment._id)}
                    user={user}
                    postID={postID}
                    resolvedProfileId={resolvedProfileId}
                    commentId={comment._id}
                    fetchAllData={fetchAllData}
                    loading={loading}
                    comment={comment}
                  />
                ) : (
                  <div className="flex flex-col gap-4">
                  </div>
                )}
              </React.Fragment>
            ))
          )}
          <OneCommentInput postID={postID} fetchAllData={fetchAllData} />
        </div>
      </div>
    </>
  );
};