import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2' // Import SweetAlert
import * as Icons from '@heroicons/react/24/solid'
import { SubmitButton } from './SubmitButton'
import { Datepicker, Input, initTE } from 'tw-elements'
initTE({ Datepicker, Input })

export default function CreateStage () {
  const { user } = useAuthContext()
  const Navigate = useNavigate()
  const [error, setError] = useState(null)
  const [stage, setStage] = useState({
    company: '',
    title: '',
    description: '',
    type: '',
    startDate: '',
    endDate: ''
  })

  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const getUserIdFromToken = () => {
      if (user && user.token) {
        const id = jwtDecode(user.token)._id
        setUserId(id)
      }
    }

    getUserIdFromToken()
  }, [user])

  const getProfileId = async () => {
    try {
      const response = await axios.get(`/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      return response.data.profile._id
    } catch (error) {
      console.error('Erreur lors de la requête:', error)
    }
  }

  const handleInput = e => {
    setStage({ ...stage, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(stage)
    const profileId = await getProfileId()
    console.log(profileId)
    try {
      const response = await axios.post(
        `api/stageLaureat/${profileId}/createStage`,
        { ...stage },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      )

      console.log('Stage Created with success', response.data)

      // Show success alert using SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Stage created successfully!'
      })

      Navigate('/landing')
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred')

      // Show error alert using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          error.response?.data?.message ||
          'An error occurred while creating the stage.'
      })
    }
  }

  /*
const handleInput = (e) => {
    setStage({...stage,[e.target.name]: e.target.value})
   }

   const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(stage);
    

   };
*/

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='relative bg-aliceblue-100 w-full h-[2078px] flex flex-col items-center justify-start py-[10px] px-10 box-border gap-[40px] text-left text-[40px] text-steelblue-200 font-poppins'>
          <div className='self-stretch relative font-extrabold'>
            Proposer un nouveau stage
          </div>

          <div className='w-full rounded-3xl flex flex-col items-start justify-center py-[30px] px-10 box-border gap-[38px] max-w-[1000px] text-base text-dimgray-100'>
            <div className='self-stretch flex flex-row items-start justify-start'>
              <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
                <div className='self-stretch relative h-[27px]'>
                  <label htmlFor='entreprise' className='top-0 left-0'>
                    Entreprise
                  </label>
                </div>
                <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
                  <input
                    type='text'
                    id='entreprise'
                    name='company'
                    onChange={handleInput}
                    value={stage.company}
                    className='w-full h-full px-6 appearance-none bg-transparent border-none'
                  />
                </div>
              </div>
            </div>
            <div className='self-stretch flex flex-row items-start justify-start'>
              <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
                <div className='self-stretch relative h-[27px]'>
                  <label htmlFor='offreTitle' className='top-0 left-0'>
                    Titre de l'offre
                  </label>
                </div>
                <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
                  <input
                    type='text'
                    id='offreTitle'
                    name='title'
                    onChange={handleInput}
                    value={stage.title}
                    className='w-full h-full px-6 appearance-none bg-transparent border-none'
                  />
                </div>
              </div>
            </div>
            <div className='self-stretch flex flex-row items-start justify-start'>
              <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
                <div className='self-stretch relative h-[27px]'>
                  <label htmlFor='descOffre' className='top-0 left-0'>
                    Description de l'offre
                  </label>
                </div>
                <div className='self-stretch relative rounded-lg box-border h-20 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
                  <input
                    type='text'
                    id='descOffre'
                    name='description'
                    onChange={handleInput}
                    value={stage.description}
                    className='w-full h-full px-3 appearance-none bg-transparent border-none'
                  />
                </div>
              </div>
            </div>
            <div className='self-stretch flex flex-col items-start justify-start gap-[6px] text-sm text-dimgray-100'>
              <div className='relative'>Type de stage</div>
              <div className='self-stretch flex flex-row flex-wrap items-start justify-start gap-2 text-base text-gray '>
                <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2 '>
                  <input
                    type='radio'
                    id='observation'
                    name='type'
                    checked={stage.type === 'Observation'}
                    value='Observation'
                    onChange={handleInput}
                    className=' appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
                  />
                  <label
                    htmlFor='observation'
                    className='relative cursor-pointer'
                  >
                    Observation
                  </label>
                </div>
                <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
                  <input
                    type='radio'
                    id='pfa'
                    name='type'
                    checked={stage.type === 'PFA'}
                    value='PFA'
                    onChange={handleInput}
                    className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
                  />
                  <label htmlFor='pfa' className='relative cursor-pointer'>
                    PFA
                  </label>
                </div>
                <div className='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
                  <input
                    type='radio'
                    id='pfe'
                    name='type'
                    checked={stage.type === 'PFE'}
                    value='PFE'
                    onChange={handleInput}
                    className='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
                  />
                  <label htmlFor='pfe' className='relative cursor-pointer'>
                    PFE
                  </label>
                </div>
              </div>
            </div>
            <div className='self-stretch flex flex-row items-start justify-center gap-[38px] text-dimgray-100'>
              <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
                <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
                  <div className='self-stretch relative h-[27px]'>
                    <label htmlFor='startDate' className='top-0 left-0'>
                      Date début
                    </label>
                  </div>
                  <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                    <input
                      type='date'
                      id='startDate'
                      name='startDate'
                      onChange={handleInput}
                      value={stage.startDate}
                      className='w-full h-full px-6 appearance-none bg-transparent border-none'
                    />
                  </div>
                </div>
              </div>
              <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
                <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
                  <div className='self-stretch relative h-[27px]'>
                    <label htmlFor='endDate' className='top-0 left-0'>
                      Date fin
                    </label>
                  </div>
                  <div className='font-poppins self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                    <input
                      type='date'
                      id='endDate'
                      name='endDate'
                      onChange={handleInput}
                      value={stage.endDate}
                      className='w-full h-full px-6 appearance-none bg-transparent border-none'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SubmitButton
            property1='default'
            className='submit'
            buttonTxt='Créer Stage'
            icon={Icons.PlusIcon}
          />
          {error && <div className='text-red-500 mt-4'>{error.message}</div>}
        </div>
      </form>
    </>
  )
}