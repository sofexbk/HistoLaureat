import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './components/Home';
import CreateProfile from './components/CreateProfile';
import Landing from './components/Landing';
import NewPost from './components/NewPost';
import NewStage from './components/NewStage';
import Navbar from './components/Navbar'


function App() {
  const {user}=useAuthContext();
  return (
    <Router>
      <div className="App">
            <Navbar></Navbar>
          <Routes>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/home" />} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/home" />} />
            <Route  path="/home" element={user ? <Home/>: <Navigate to="/login" /> } />
            <Route  path="/create-profile" element={ <CreateProfile/>}/>
            <Route path="/landing" element={<Landing/>} />
            <Route path='/new-post' element={<NewPost/>}/>
            <Route path='/new-stage' element={<NewStage/>}/>

          </Routes>
      </div>
    </Router>
  );
}

export default App;
