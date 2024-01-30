import PropTypes from 'prop-types'
import React from 'react'
import { useStageContext } from '../context/StageContext'
import Swal from 'sweetalert2'
export const OneStage = ({
  titreStage = '',
  typeStage = '',
  company = '',
  description = '',
  startDate = '',
  endDate = '',
  stage,
  isCurrentUserStage,
  fetchAllData,
  className
}) => {
  const { stages, dispatch, deleteStage } = useStageContext()

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this stage!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    })
    if (result.isConfirmed) {
      deleteStage(stage._id)
      fetchAllData()
      Swal.fire('Deleted!', 'Your stage has been deleted.', 'success')
    }
  }

  return (
    <>
      <div className='w-[338px] flex flex-col items-start justify-start text-center bg-transparent text-xl text-black shadow hover:shadow-xl transition-all duration-300 ease-in-out'>
        <div className='self-stretch rounded-xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] flex flex-col items-center justify-start py-5 px-[25px] gap-[10px]'>
          <div className='self-stretch flex flex-col items-end justify-start gap-[5px]'>
            {isCurrentUserStage && (
              <button
                type='button'
                onClick={handleDelete}
                data-te-ripple-init
                data-te-ripple-color='light'
                className='cursor-pointer items-end h-full border-none flex rounded-lg bg-white p-2 uppercase leading-normal text-white drop-shadow-md transition duration-300 ease-in-out hover:bg-danger-600 '
              >
                <svg 
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1'
                  stroke='currentColor'
                  className='w-6 h-6 text-danger hover:text-white '
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                  />
                </svg>
              </button>
            )}
            <b className='self-stretch relative'>{titreStage}</b>
            <i className='self-stretch relative text-smi font-medium text-gray text-left'>
              {typeStage}
            </i>
          </div>
          <b className='self-stretch relative uppercase text-steelblue-100'>
            {company}
          </b>
          <div className='self-stretch flex flex-row items-center justify-start pt-0 px-0 pb-2.5 text-left text-sm text-darkslategray-100'>
            <div className='flex-1 relative capitalize'>{description}</div>
          </div>
          <div className='relative w-[250.88px] h-[62px] text-left text-sm text-darkslategray-200'>
            <div className='absolute top-[17px] left-[26.94px] rounded-[30px] bg-steelblue-100 w-[188px] h-3.5' />
            <div className='absolute top-[19px] left-[202.94px] rounded-[50%] bg-white w-2.5 h-2.5' />
            <b className='absolute top-[41px] left-[150px] capitalize'>
              {endDate}
            </b>
            <i className='absolute top-[-8px] left-[201.94px] text-4xs capitalize font-light text-darkslategray-100'>
              Fin
            </i>
            <div className='absolute top-[19px] left-[28.94px] rounded-[50%] bg-white w-2.5 h-2.5' />
            <b className='absolute top-[41px] left-[0px] capitalize'>
              {startDate}
            </b>
            <i className='absolute top-[-8px] left-[20.06px] text-4xs capitalize font-light text-darkslategray-100'>
              Début
            </i>
          </div>
        </div>
      </div>
    </>
  )
}