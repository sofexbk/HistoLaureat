import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Home() {
  const { user } = useAuthContext();
  const userId = jwtDecode(user.token);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(userId._id)
        const response = await axios.get(`/api/profile/${userId._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfile(response.data.profile);
        console.log(response.data.image)
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div>
      <h1>Home</h1>
      {profile && (
        <div>
          <h2>User Profile</h2>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
          {profile.image && (
            <img src={profile.image} alt="User Profile" style={{ maxWidth: '100%' }} />
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
