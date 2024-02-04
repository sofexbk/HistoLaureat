import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { SubmitButton } from './SubmitButton'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import * as Icons from '@heroicons/react/24/solid'

const CreateProfile = () => {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    filiere: "",
    niveau: "",
    experiences: "",
    posteActuel: "",
    experiencesPassee: "",
    promotion: "",
  });
  useEffect(() => {
    console.log('CreateProfile component mounted');
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ ...formData, role: user.role, image: profilePicture });
  
    const formDataWithImage = new FormData();
    formDataWithImage.append('image', profilePicture);
    formDataWithImage.append('firstName', formData.firstName);
    formDataWithImage.append('lastName', formData.lastName);
    formDataWithImage.append('filiere', formData.filiere);
    formDataWithImage.append('niveau', formData.niveau);
    formDataWithImage.append('experiences', formData.experiences);
    formDataWithImage.append('posteActuel', formData.posteActuel);
    formDataWithImage.append('experiencesPassee', formData.experiencesPassee);
    formDataWithImage.append('promotion', formData.promotion);
  
    try {
      const response = await axios.post(
        'api/profile/createProfile',
        formDataWithImage,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
        Swal.fire({
        title: 'Profile Created!',
        icon: 'success',
        text: 'Your profile has been successfully created.',
      });
  
      console.log('Profile creation successful:', response.data);
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...user,
          hasProfile: true,
          userName: response.data.profile.firstName,
          photo: response.data.profile.image,
          userRole: user.role,
        })
      );
      dispatch({ type: 'PROFILE_STATUS', payload: true });
      Navigate('/landing');
      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.response ? error.response.data : 'An error occurred',
      });
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };
  return (
    <>
    {user && (
    <form onSubmit={handleSubmit} className='relative bg-aliceblue-100 w-full h-[2078px] min-w-[580px] flex flex-col items-center justify-start py-[60px] px-10 box-border gap-[40px] text-left text-xl text-white font-poppins'>
   
      <div className='self-stretch relative text-[40px] font-extrabold text-steelblue-200'>
              Mon Profile
            </div>
            <div className='self-stretch relative h-[27px]'>
      </div>

      <div className='w-full rounded-3xl bg-white flex flex-col items-start justify-center py-[30px] px-10 box-border gap-[38px] max-w-[1000px] text-base'>
        <div className='self-stretch flex flex-row items-start justify-center gap-[6px] min-w-[400px] text-center text-xs font-avenir'>
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                1
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-darkslategray'>
              L’essentiel
            </i>
          </div>
          <div className='relative bg-black w-[232px] h-px' />
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-black w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                2
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-black'>
              Profil
            </i>
          </div>
          <div className='relative bg-darkslategray w-[232px] h-px opacity-[0.35]' />
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px] opacity-[0.35]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                3
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-darkslategray'>
              Prêt
            </i>
          </div>
        </div>
        
        <div className='self-stretch flex flex-col items-start justify-center gap-[8px]'>
          <div className='self-stretch flex flex-row items-center justify-start gap-[12px] text-center text-xs font-avenir'>
            <div className='relative w-6 h-6'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-6 h-6' />
              <div className='absolute top-[4.2px] left-[9.4px] font-medium flex items-center justify-center w-[6.67px] h-[14.67px]'>
                2
              </div>
            </div>
            <div className='relative text-5xl font-poppins text-darkslategray'>
              Profil
            </div>
          </div>
          <div className='self-stretch relative font-light text-dimgray-100'>
            Veuillez saisir vos information personnelles
          </div>
          <div className='self-stretch relative text-gray'>
            *Tous les champs sont obligatoires sauf indication contraire.
          </div>
        </div>
        <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
        <input
          type='file'
          id='image'
          name='image'
          onChange={(e) => setProfilePicture(e.target.files[0])}
          accept='image/*'
          className='w-full h-full px-6 appearance-none bg-transparent border-none outline-none font-poppins text-lg text-zinc-700'
        />
      </div>
        <div className='self-stretch flex flex-row items-start justify-center gap-[38px] text-dimgray-100'>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label htmlFor='prenom' className='top-0 left-0'>
                  Prénom
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='prenom'
                  name='firstName'
                  onChange={handleInputChange}
                  className='w-full h-full px-6 appearance-none bg-transparent border-none outline-none font-poppins text-lg text-zinc-700'
                />
              </div>
            </div>
          </div>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label htmlFor='nom' className='top-0 left-0'>
                  Nom
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='nom'
                  name='lastName'
                  onChange={handleInputChange}
                  className='w-full h-full px-6 appearance-none bg-transparent border-none outline-none font-poppins text-lg text-zinc-700'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-col items-start justify-start gap-[6px] text-sm text-dimgray-100'>
          <div className='relative'>Votre filière</div>
          <div className='self-stretch flex flex-row flex-wrap items-start justify-start gap-2 text-base text-gray'>
            <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2' >
              <input
                type='radio'
                id='ginf'
                name='filiere'
                value='ginf'
                onChange={handleInputChange}
                className='outline-none font-poppins text-lg text-zinc-700 appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label htmlFor='ginf' className='relative cursor-pointer'>
                GINF
              </label>
            </div>
            <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='gind'
                name='filiere'
                value='gind'
                onChange={handleInputChange}
                className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200 outline-none font-poppins text-lg text-zinc-700'
              />
              <label htmlFor='gind' className='relative cursor-pointer'>
                GIND
              </label>
            </div>
            <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='gstr'
                name='filiere'
                onChange={handleInputChange}
                value='gstr'
                className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200 outline-none font-poppins text-lg text-zinc-700'
              />
              <label htmlFor='gstr' className='relative cursor-pointer'>
                GSTR
              </label>
            </div>
            <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='cs'
                name='filiere'
                onChange={handleInputChange}
                value='cs'
                className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200 outline-none font-poppins text-lg text-zinc-700'
              />
              <label htmlFor='cs' className='relative cursor-pointer'>
                CS
              </label>
            </div>
            <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='gsea'
                name='filiere'
                onChange={handleInputChange}
                value='gsea'
                className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200 outline-none font-poppins text-lg text-zinc-700'
              />
              <label htmlFor='gsea' className='relative cursor-pointer'>
                GSEA
              </label>
            </div>
            <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='g3ei'
                name='filiere'
                onChange={handleInputChange}
                value='g3ei'
                className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200 outline-none font-poppins text-lg text-zinc-700'
              />
              <label htmlFor='g3ei' className='relative cursor-pointer'>
                G3EI
              </label>
            </div>
          </div>
        </div>
      </div>
      {user.role=='laureat'&&(
      <div className='w-full rounded-3xl bg-white flex flex-col items-start justify-start py-10 px-[60px] box-border gap-[38px] max-w-[1000px] text-center text-xs font-avenir'>
        <div className='self-stretch flex flex-row items-start justify-center gap-[6px]'>
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                1
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-darkslategray'>
              L’essentiel
            </i>
          </div>
          <div className='relative bg-black w-[232px] h-px' />
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-black w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                2
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-black'>
              Profil
            </i>
          </div>
          <div className='relative bg-darkslategray w-[232px] h-px' />
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                3
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-darkslategray'>
              Prêt
            </i>
          </div>
        </div>
        <div className='flex flex-row items-center justify-start gap-[12px]'>
          <div className='relative w-6 h-6'>
            <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-6 h-6' />
            <div className='absolute top-[4.2px] left-[9.4px] font-medium flex items-center justify-center w-[6.67px] h-[14.67px]'>
              3
            </div>
          </div>
          <div className='relative text-5xl font-poppins text-darkslategray'>
            Lauréat Infos
          </div>
        </div>
        <div className='self-stretch flex flex-row items-start justify-center gap-[38px] text-left text-base text-dimgray-100 font-poppins'>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label htmlFor='promotion' className='top-0 left-0'>
                  Promotion
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='promotion'
                  name='promotion'
                  onChange={handleInputChange}
                  className='w-full h-full px-6 appearance-none bg-transparent border-none outline-none font-poppins text-lg text-zinc-700'
                  placeholder='example: 2023-2024'
                />
              </div>
            </div>
          </div>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label htmlFor='poste' className='top-0 left-0'>
                  Poste actuel
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='poste'
                  name='posteActuel'
                  onChange={handleInputChange}
                  className='w-full h-full px-6 appearance-none bg-transparent border-none outline-none font-poppins text-lg text-zinc-700'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-col items-start justify-center gap-[12px] text-left text-base text-dimgray-100 font-poppins'>
          <div className='self-stretch relative h-[27px]'>
            <label htmlFor='exp1' className='top-0 left-0'>
              Expériences passées
            </label>
          </div>
          <div className='self-stretch relative rounded-lg box-border h-[87px] overflow-hidden shrink-0 border-[1px] border-solid border-dimgray-400'>
            <input
              type='text'
              id='exp1'
              name='experiencesPassee'
              onChange={handleInputChange}
              className='w-full h-full px-2 appearance-none bg-transparent border-none outline-none font-poppins text-lg text-zinc-700'
            />
          </div>
        </div>
      </div>
      )}
      {user.role=='etudiant'&& (
      <div className='w-full rounded-3xl bg-white flex flex-col items-start justify-start pt-[30px] px-[60px] pb-10 box-border gap-[38px] max-w-[1000px] text-center text-xs font-avenir'>
        <div className='self-stretch flex flex-row items-start justify-center gap-[6px]'>
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                1
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-darkslategray'>
              L’essentiel
            </i>
          </div>
          <div className='relative bg-black w-[232px] h-px' />
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-black w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                2
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-black'>
              Profil
            </i>
          </div>
          <div className='relative bg-darkslategray w-[232px] h-px' />
          <div className='shrink-0 flex flex-col items-center justify-center gap-[8px]'>
            <div className='relative w-5 h-5'>
              <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5' />
              <div className='absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]'>
                3
              </div>
            </div>
            <i className='relative text-base font-light font-poppins text-darkslategray'>
              Prêt
            </i>
          </div>
        </div>
        <div className='flex flex-row items-center justify-start gap-[12px]'>
          <div className='relative w-6 h-6'>
            <div className='absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-6 h-6' />
            <div className='absolute top-[4.2px] left-[9.4px] font-medium flex items-center justify-center w-[6.67px] h-[14.67px]'>
              3
            </div>
          </div>
          <div className='relative text-5xl font-poppins text-darkslategray'>
            Étudiant Infos
          </div>
        </div>
        <div className='self-stretch flex flex-row items-start justify-center text-left text-base text-dimgray-100 font-poppins'>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label htmlFor='niveau' className='top-0 left-0'>
                  Niveau
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <select
                  id='niveau'
                  name='niveau'
                  className='w-full h-full px-6 appearance-none bg-transparent border-none outline-none font-poppins text-lg text-zinc-700'
                  onChange={handleInputChange}
                >
                  <option value='AP1'>AP1</option>
                  <option value='AP2'>AP2</option>
                  <option value='CI1'>CI1</option>
                  <option value='CI2'>CI2</option>
                  <option value='CI3'>CI3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-col items-start justify-center gap-[12px] text-left text-base text-dimgray-100 font-poppins'>
          <div className='self-stretch relative h-[27px]'>
            <label htmlFor='exp2' className='top-0 left-0'>
              Expériences 
            </label>
          </div>
          <div className='self-stretch relative rounded-lg box-border h-[87px] overflow-hidden shrink-0 border-[1px] border-solid border-dimgray-400'>
            <input
              type='text'
              id='exp1'
              name='experiences'
              onChange={handleInputChange}
              className='w-full h-full px-2 appearance-none bg-transparent border-none outline-none font-poppins text-lg text-zinc-700'
            />
          </div>
        </div>
      </div>
      )}
      
      <SubmitButton 
              property1='default'
              className='submit'
              buttonTxt='Connexion'
              icon={Icons.ArrowRightIcon}
              onclick={handleSubmit}
            />

    </form>
  )}
    </>
  )
}

export default CreateProfile