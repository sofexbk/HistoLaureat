import React, { useState } from 'react'
import SideBar from '../components/SideBar.js'
import AdminCard from '../components/AdminCard.jsx'
import UserStages from '../components/UserStages.jsx'
import UserProfiles from '../components/UserProfiles.jsx'
import UserPosts from '../components/UserPosts.jsx'
import { SubmitButton } from '../components/SubmitButton'
import * as Icons from '@heroicons/react/24/solid'

function AdminPanel () {
  const [showUserStages, setShowUserStages] = useState(false)
  const [showUserProfiles, setShowUserProfiles] = useState(false)
  const [showUserPosts, setShowUserPosts] = useState(false)

  const toggleUserStages = () => setShowUserStages(!showUserStages)
  const toggleUserProfiles = () => setShowUserProfiles(!showUserProfiles)
  const toggleUserPosts = () => setShowUserPosts(!showUserPosts)
  const [dashboardTitle, setDashboardTitle] = useState('Dashboard')

  const handleStateBtnChange = newState => {
    if (newState === 'Dashboard') {
      setShowUserProfiles(false)
      setShowUserStages(false)
      setShowUserPosts(false)
    }
    if (newState === 'Profiles') {
      setShowUserProfiles(true)
      setShowUserStages(false)
      setShowUserPosts(false)
    }
    if (newState === 'Postes') {
      setShowUserProfiles(false)
      setShowUserStages(false)
      setShowUserPosts(true)
    }
    if (newState === 'Stages') {
      setShowUserProfiles(false)
      setShowUserStages(true)
      setShowUserPosts(false)
    }
    setDashboardTitle(newState)
  }

  return (
    <>
      <SideBar onStateBtnChange={handleStateBtnChange}>
      {dashboardTitle == 'Dashboard' && (
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
      </SideBar>
    </>
  )
}

export default AdminPanel
