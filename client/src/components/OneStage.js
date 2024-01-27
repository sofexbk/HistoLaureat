import PropTypes from 'prop-types'
import React from 'react'
import { useStageContext } from '../context/StageContext';
import Swal from 'sweetalert2';
export const OneStage = ({
  titreStage = '',
  typeStage = '',
  company = "",
  description = '',
  startDate = '',
  endDate = '',
  stage,
  isCurrentUserStage,
  fetchAllData,
  className
}) => {
  const { stages, dispatch,deleteStage } = useStageContext();

  
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this stage!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (result.isConfirmed) {
      deleteStage(stage._id); 
      fetchAllData()
      Swal.fire('Deleted!', 'Your stage has been deleted.', 'success');
    }
  };

  return (
    <>
      <div className='w-[338px] flex flex-col items-start justify-start text-center bg-transparent text-xl text-black shadow hover:shadow-xl transition-all duration-300 ease-in-out'>
        <div className='self-stretch rounded-xl bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] flex flex-col items-center justify-start py-5 px-[25px] gap-[10px]'>
          <div className='self-stretch flex flex-col items-center justify-start gap-[5px]'>
          {isCurrentUserStage && (
              <button
                onClick={handleDelete}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              >
                Supprimer
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
