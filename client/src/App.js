import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './components/Home';
import CreateProfile from './components/CreateProfile';
import CreatePost from './components/CreatePost';
import CreateStage from './components/CreateStage';

function App() {
  const {user}=useAuthContext();
  return (
    <Router>
      <div className="App">
          <Routes>
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/home" />} />
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/home" />} />
            {//<Route  path="/home" element={user ? <Home/>: <Navigate to="/login" /> } />
}
            <Route  path="/home" element={ <Home/>  }/>
            <Route  path="/create-profile" element={ <CreateProfile/>}/>
            <Route path='/create-post' element={ <CreatePost/>} />
            <Route  path="/create-profile" element={ <CreateProfile/>}/>
            <Route  path="/create-stage" element={ <CreateStage/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
