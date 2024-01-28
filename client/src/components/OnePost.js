import PropTypes from 'prop-types'
import React from 'react'
import profilePic from '../assets/profilepic.png'
import { Button } from './ButtonComponent'
import * as Icons from '@heroicons/react/24/solid'
import { AccordionBox } from './AccordionBox'
import { OneComment } from './OneComment'
import { OneCommentInput } from './OneCommentInput'
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export const OnePost = ({
  profileStatus = "",
  description = '',
  profileName = '',
  profilePic='',
  comments = [],
  postID,
  title,
  resolvedProfileId,
  onDeleteClick,
  isCurrentUserPost,
  user,
  fetchAllData,
  loading,  
  userEmail,
  userId,
})  => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPostData, setEditedPostData] = useState({
    title,
    description,
  });
  const [userE,setUserE]=useState('')
  
  useEffect(() => {
    if (userEmail) {
      console.log("ggg",userEmail)

      const fetchUserEmail = async () => {
        try {
          const response = await axios.get(`/api/user/getuserbyemail/${userEmail}`);
          if (response.status === 200) {
            setUserE(response.data.email);
          } else {
            console.error('Failed to fetch user email:', response.data);
          }
        } catch (error) {
          console.error('Error fetching user email:', error);
        }
      };
  
      fetchUserEmail();
    }
  }, [isModalOpen, userEmail]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleEditClick = () => {
    console.log('Modifier button clicked');
   openModal();
  };
  

  const handleSaveChanges = async () => {
    try {
      const response = await axios.patch(`/api/poste/${resolvedProfileId}/updatePoste/${postID}`, {
        title: editedPostData.title,
        content: editedPostData.description,
      },{        headers: {
        Authorization: `Bearer ${user.token}`,
          },}
      );
        if (response.status === 200) {
        console.log('Post updated successfully:', response.data);
        closeModal(); 
        fetchAllData(); 
      } else {
        console.error('Failed to update post:', response.data);
      }
    } catch (error) {
      console.error('Error updating post:', error);   }
  };
  useEffect(() => {
    if (isModalOpen) {
    }
  }, [isModalOpen]);
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
              <b >
                {isCurrentUserPost && (
                  <div className="flex space-x-4">
                 <button

                  onClick={handleEditClick}
                  className=" bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  >
                <span>Modifier</span>
                 </button>
                    <button
                      onClick={() => onDeleteClick(postID)}
                      className="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    >
                      <span>Supprimer</span>
                    </button>
              </div>
                )}
              </b>
              <b className='relative'>
                {profileName}
              </b>
              <div className='relative text-smi font-light text-darkgray'>
                {userE}
              </div>
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
        <AccordionBox postID={postID} commentaires={comments} loading={loading}  fetchAllData={fetchAllData} resolvedProfileId={resolvedProfileId}/>
      </div>
      <Modal
  isOpen={isModalOpen}
  onRequestClose={closeModal}
  contentLabel="Edit Post Modal"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '500px', // Adjusted width
      maxHeight: '80vh',
      overflow: 'auto',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adjusted shadow
      borderRadius: '10px', // Slightly increased border radius
      backgroundColor: '#fff', // Added background color
    },
  }}
>
  <div className="bg-blue-500 text-white p-[3px] mt-2 rounded-lg">
    <h2 className="text-lg font-semibold pl-4">Edit Post</h2>
  </div>
  <div className="p-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">Title:</label>
    <input
      className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500" // Added focus styles
      type="text"
      value={editedPostData.title}
      onChange={(e) =>
        setEditedPostData((prevData) => ({
          ...prevData,
          title: e.target.value,
        }))
      }
    />

    <label className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
    <textarea
      className="w-full border rounded-md p-2 mb-4 h-32 focus:outline-none focus:border-blue-500" // Added focus styles
      value={editedPostData.description}
      onChange={(e) =>
        setEditedPostData((prevData) => ({
          ...prevData,
          description: e.target.value,
        }))
      }
    />

    <div className="flex justify-end">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none" // Added focus styles
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none" // Added focus styles
        onClick={closeModal}
      >
        Cancel
      </button>
    </div>
  </div>
</Modal>
    </>
  );
};

OnePost.propTypes = {
  profileStatus: PropTypes.string,
  description: PropTypes.string,
  profileName: PropTypes.string,
  profileData: PropTypes.object,
  comments: PropTypes.array,
  title: PropTypes.string,
};
