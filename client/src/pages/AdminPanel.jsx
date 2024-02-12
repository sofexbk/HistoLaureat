import React, { useState } from 'react'
import SideBar from '../components/SideBar.js'
import AdminCard from '../components/AdminCard.jsx'
import UserStages from '../components/UserStages.jsx'
import UserProfiles from '../components/UserProfiles.jsx'
import UserPosts from '../components/UserPosts.jsx'
import Users from '../components/Users.jsx'
import { SubmitButton } from '../components/SubmitButton'
import * as Icons from '@heroicons/react/24/solid'
import UserLaureats from '../components/UserLaureats.jsx'

function AdminPanel () {
  const [showUserStages, setShowUserStages] = useState(false);
  const [showUserProfiles, setShowUserProfiles] = useState(false);
  const [showUserPosts, setShowUserPosts] = useState(false);
  const [showUserLaureats, setShowUserLaureats] = useState(false); // Ajoutez un état pour afficher UserLaureats
  const [showUsers, setShowUsers] = useState(false);

  const toggleUserStages = () => setShowUserStages(!showUserStages);
  const toggleUserProfiles = () => setShowUserProfiles(!showUserProfiles);
  const toggleUserPosts = () => setShowUserPosts(!showUserPosts);
  const toggleUserLaureats = () => setShowUserLaureats(!showUserLaureats); // Ajoutez une fonction pour basculer UserLaureats
  const toggleUsers = () => setShowUsers(!showUsers);

  const [dashboardTitle, setDashboardTitle] = useState('Dashboard');

  const handleStateBtnChange = newState => {
    if (newState === 'Dashboard') {
      setShowUserProfiles(false);
      setShowUserStages(false);
      setShowUserPosts(false);
      setShowUserLaureats(false); // Assurez-vous de cacher UserLaureats lorsque vous basculez vers le tableau de bord
      setShowUsers(false)
    } else if (newState === 'Profiles') {
      setShowUserProfiles(true);
      setShowUserStages(false);
      setShowUserPosts(false);
      setShowUserLaureats(false);
      setShowUsers(false)
    } else if (newState === 'Postes') {
      setShowUserProfiles(false);
      setShowUserStages(false);
      setShowUserPosts(true);
      setShowUserLaureats(false);
      setShowUsers(false)
    } else if (newState === 'Stages') {
      setShowUserProfiles(false);
      setShowUserStages(true);
      setShowUserPosts(false);
      setShowUserLaureats(false);
      setShowUsers(false)
    } else if (newState === 'Laureat') {
      setShowUserProfiles(false);
      setShowUserStages(false);
      setShowUserPosts(false);
      setShowUserLaureats(true); // Affichez UserLaureats lorsque vous sélectionnez "Laureat"
      setShowUsers(false)
    }else if (newState === 'Utilisateurs') {
      setShowUserProfiles(false);
      setShowUserStages(false);
      setShowUserPosts(false);
      setShowUserLaureats(false); // Affichez UserLaureats lorsque vous sélectionnez "Laureat"
      setShowUsers(true)
    }
    setDashboardTitle(newState);
  };

  return (
    <>
      <SideBar onStateBtnChange={handleStateBtnChange}>
      {dashboardTitle === 'Dashboard' && (
          <h1 className='text-left ml-8 text-6xl text-indigo-500'>
            {dashboardTitle}
          </h1>
        )}
        <AdminCard />
        {dashboardTitle !== 'Dashboard' && (
          <h1 className='text-left ml-8 text-6xl text-indigo-500'>
            {dashboardTitle}
          </h1>
        )}
        {showUserStages && <UserStages />}
        {showUserProfiles && <UserProfiles />}
        {showUserPosts && <UserPosts />}        
        {showUserLaureats && <UserLaureats />}
        {showUsers && <Users/>}
      </SideBar>
    </>
  )
}

export default AdminPanel
