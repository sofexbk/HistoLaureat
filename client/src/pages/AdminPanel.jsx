import React, { useState } from 'react';
import SideBar from '../components/SideBar.js';
import AdminCard from '../components/AdminCard.jsx';
import UserStages from '../components/UserStages.jsx';
import UserProfiles from '../components/UserProfiles.jsx';
import UserPosts from '../components/UserPosts.jsx';
import { SubmitButton } from '../components/SubmitButton'
import * as Icons from '@heroicons/react/24/solid'

function AdminPanel() {
  const [showUserStages, setShowUserStages] = useState(false);
  const [showUserProfiles, setShowUserProfiles] = useState(false);
  const [showUserPosts, setShowUserPosts] = useState(false);

  const toggleUserStages = () => setShowUserStages(!showUserStages);
  const toggleUserProfiles = () => setShowUserProfiles(!showUserProfiles);
  const toggleUserPosts = () => setShowUserPosts(!showUserPosts);

  return (
    <>
      <SideBar>
        <AdminCard />
        
        <button 
          className={`px-4 py-2 rounded-full border border-green-500 ${showUserStages ? 'bg-green-500 text-white' : 'bg-white text-green-500'}`} 
          onClick={toggleUserStages}
        >
          {showUserStages ? 'Hide User Stages' : 'Show User Stages'}
        </button>
        {showUserStages && <UserStages />}
        
        <button 
          className={`px-4 py-2 rounded-full border border-yellow-500 ${showUserProfiles ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500'}`} 
          onClick={toggleUserProfiles}
        >
          {showUserProfiles ? 'Hide User Profiles' : 'Show User Profiles'}
        </button>
        {showUserProfiles && <UserProfiles />}
        
        <button 
          className={`px-4 py-2 rounded-full border border-blue-500 ${showUserPosts ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`} 
          onClick={toggleUserPosts}
        >
          {showUserPosts ? 'Hide User Posts' : 'Show User Posts'}
        </button>
        {showUserPosts && <UserPosts />}
      </SideBar>
    </>
  );
}

export default AdminPanel;
