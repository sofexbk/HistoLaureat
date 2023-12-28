import React, { useState } from 'react'
import { OneComment } from './OneComment'
import { OneCommentInput } from './OneCommentInput'
import { Button } from '../components/ButtonComponent'
import * as Icons from '@heroicons/react/24/solid'

export const AccordionBox = ({ commentaires }) => {
  const [accordionOpen, setAccordionOpen] = useState(false)
  const rotationDegree = accordionOpen ? 'rotate-180' : 'rotate-0';


  return (
    <>
      <button
      onClick={() => setAccordionOpen(!accordionOpen)}
      className='border-none relative w-full flex flex-col items-start bg-[#DBF2FF] justify-start text-left text-[20px] text-steelblue font-poppins
      hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out'
    >
      <div className='self-stretch rounded-t-none bg-[#DBF2FF] rounded-b-xl bg-aliceblue flex flex-row items-center justify-start py-5 pr-0 pl-[50px]'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='#017CC5'
          className={`w-6 h-6 mr-4 transition-transform duration-500 transform ${rotationDegree}`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5'
          />
        </svg>

        <div className='relative font-light flex items-center w-full h-[30px] text-[#017CC5] '>
        {accordionOpen ? 'Masquer les commentaires' : 'Afficher les commentaires'}
        </div>
      </div>
    </button>

      <div
        className={`grid self-stretch relative overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? 'grid-rows-auto opacity-100'
            : 'grid-rows-0 opacity-0 visibility-hidden'
        }`}
        style={{ height: accordionOpen ? 'auto' : 0 }}
      >
        <div className='bg-aliceblue-200 self-stretch relative flex flex-col items-center justify-start p-4 gap-4 rounded-b-2xl'>
          {commentaires}
          <Button
            property1='default'
            className='submit'
            buttonTxt='Commentaire'
            icon={Icons.PlusIcon}
            src='https://www.google.com/search?q=your+search+query'
          />
        </div>
      </div>
    </>
  )
}
