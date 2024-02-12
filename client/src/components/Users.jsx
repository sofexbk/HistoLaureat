import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user/getAllUsers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const restoredUsers = users.map(user => {
      const isLockedString = localStorage.getItem(`user_${user._id}_isLocked`);
      if (isLockedString !== null) {
        const isLocked = JSON.parse(isLockedString);
        return { ...user, isLocked };
      } else {
        return user;
      }
    });
    setUsers(restoredUsers);
  }, [users.locked]); 

  const toggleLock = async (userId, isLocked) => {
    try {
      const updatedIsLocked = !isLocked;
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, isLocked: updatedIsLocked } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem(`user_${userId}_isLocked`, updatedIsLocked.toString());
      await axios.post(`/api/user/lock/${userId}`, { isLocked: updatedIsLocked });
    } catch (error) {
      console.error('Error toggling lock:', error);
    }
  };

  return (
    <div className='container-laureats mx-auto px-4 py-0'>
      <div className='overflow-x-auto'>
        <table id="users-table" className='laureats-table w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-slate-200 text-gray-600 uppercase text-lg'>
              <th className='py-3 px-8 text-center'>Email</th>
              <th className='py-3 px-6 text-center'>Role</th>
              <th className='py-3 px-2 text-center'>Restrindre l'activité</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-lg'>
            {users.map(user => (
              <tr key={user._id} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='py-4 px-8 text-left'>{user.email}</td>
                <td className='py-4 px-6'>{user.role}</td>
                <td className='py-4 px-2 justify-center flex'>
                  <button
                    type='button'
                    onClick={() => toggleLock(user._id, user.isLocked)}
                    data-te-ripple-init
                    data-te-ripple-color='light'
                    className={`cursor-pointer items-end h-full border-none flex rounded-lg p-2 uppercase leading-normal text-white drop-shadow-md transition duration-300 ease-in-out ${
                      user.isLocked
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-danger-600 hover:bg-danger-700'
                    }`}
                  >
                    {user.isLocked ? 'Débloquer' : 'Bloquer'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
