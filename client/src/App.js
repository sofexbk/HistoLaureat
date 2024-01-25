import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import CreateProfile from './components/CreateProfile'
import Landing from './pages/Landing' // Import Landing component
import MonProfile from './pages/monProfile' // Import MonProfile component
import NewPost from './pages/newPost' // Import NewPost component
import NewStage from './pages/newStage' // Import NewStage component
import { Navbar } from './components/Navbar'
import CreatePost from './components/CreatePost'
import CreateStage from './components/CreateStage'
import ResetPasswordForm from './components/resetPassword'
import ForgotPassword from './components/ForgotPassword';
import { useParams } from 'react-router-dom';

function App () {
  const { user,hasProfile } = useAuthContext()
  const { token } = useParams();
  const isCreateProfilePage = window.location.pathname.includes('create-profile');
  return (
    <Router>
      <div className='App'>
        <Navbar
          // ajouter connextion if connected
          connexion={hasProfile}
        />
        <Routes>
          <Route
            path='/login'
            element={!user ? <Login /> : <Navigate to='/home' />}
          />
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to='/home' />}
          />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/create-profile' element={<CreateProfile />} />
          <Route path='/landing' element={<Landing />} />
          <Route path='/mon-profile' element={<MonProfile />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/create-stage' element={<CreateStage />} />
          <Route path='/new-post' element={<NewPost/>} />
          <Route path='/new-stage' element={<NewStage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
