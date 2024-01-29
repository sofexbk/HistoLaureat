import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';  
import * as Icons from '@heroicons/react/24/solid';
import { Button } from '../components/ButtonComponent'
import { SubmitButton } from './SubmitButton'

export default function CreatePost() {
  const { user } = useAuthContext();
  const Navigate = useNavigate();
  const [error, setError] = useState(null);
  const [post, setPost] = useState({
    title: '',
    content: '',
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserIdFromToken = () => {
      if (user && user.token) {
        const id = jwtDecode(user.token)._id;
        setUserId(id);
      }
    };

    getUserIdFromToken();
  }, [user]);

  const getProfileId = async () => {
    try {
      const response = await axios.get(`/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return response.data.profile._id;
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  };

  const handleInput = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileId = await getProfileId();
    try {
      const response = await axios.post(
        `api/poste/${profileId}/createPoste`,
        { ...post },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      console.log('Post Created with success', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Post created successfully!',
      });

      Navigate('/landing');
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred');

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'An error occurred while creating the post.',
      });
    }
  };




  return (
    <>
    <form onSubmit={handleSubmit}>
    <div className='relative bg-aliceblue-100 w-full h-[2078px] flex flex-col items-center justify-start py-[10px] px-10 box-border gap-[40px] text-left text-[40px] text-steelblue-200 font-poppins'>
      <div className='self-stretch relative font-extrabold'>
        Créer un nouveau post
      </div>
      <div className='w-full rounded-3xl flex flex-col items-start justify-center py-[30px] px-10 box-border gap-[38px] max-w-[1000px] text-base text-dimgray-100'>
        <div className='self-stretch flex flex-col items-start justify-center gap-[8px]'>
          <div className='self-stretch relative text-gray'>
            Merci d'éviter les gros mots et de rédiger soigneusement. Respectons
            une communication positive sur HistoLauréat{' '}
          </div>
        </div>
        
        <div className='self-stretch flex flex-row items-start justify-start'>
          <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
            <div className='self-stretch relative h-[27px]'>
              <label htmlFor='titrePost' className='top-0 left-0'>
              Titre du poste
              </label>
            </div>
            <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
             <input
              type="text" name='title' id='titrePost'
              onChange={handleInput}
              value={post.title}
              required
              className='w-full h-full text-base px-6 appearance-none bg-transparent border-none'
             />
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-row items-start justify-start'>
          <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
            <div className='self-stretch flex-1 relative'>
              <label htmlFor='desc' className='top-0 left-0'>
              Description poste
              </label>
            </div>
            <textarea
            name ='content' id='desc' onChange={handleInput}
            value={post.content}
            className='w-full h-96 px-6 text-base appearance-none bg-transparent border border-solid border-[#BFC6C9] rounded-lg'
            />
          </div>
        </div>
      </div>


       <SubmitButton 
              property1='default'
              className='submit'
              buttonTxt='Créer Poste'
              icon={Icons.PlusIcon}
            />

      {error && <div className="text-red-500 mt-4">{error.error}</div>}
    </div>
    </form>
    </>
  )
}