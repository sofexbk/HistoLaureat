import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitButton } from '../components/SubmitButton'
import * as Icons from '@heroicons/react/24/solid'

function NotFound () {
  const navigate = useNavigate()

  useEffect(() => {
    // Go back to the previous page after 3 seconds
    const timeoutId = setTimeout(() => {
      navigate(-1) // Go back one step in the history
    }, 33000)

    return () => {
      // Clear the timeout on component unmount
      clearTimeout(timeoutId)
    }
  }, [navigate])

  return (
    <div className='font-poppins'>
      <h1 className='text-9xl opacity-10 '>404</h1>
      <p className='text-4xl font-extrabold opacity-70'>Uh-ooh!</p>
      <p className='text-4xl font-thin opacity-80'>Page non trouvée</p>
      <SubmitButton // ajouter post
              property1='default'
              className='submit'
              buttonTxt='Retour en arrière'
              icon={Icons.ArrowLeftIcon}
              onclick={() => navigate(-1)}
            />
      
    </div>
  )
}

export default NotFound
