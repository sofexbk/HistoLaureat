import { Button } from '../components/Button'
import * as Icons from '@heroicons/react/24/solid'
const newStage = () => {
  return (
    <div className='relative bg-aliceblue-100 w-full h-[2078px] flex flex-col items-center justify-start py-[60px] px-10 box-border gap-[40px] text-left text-[40px] text-steelblue-200 font-poppins'>
      <div className='self-stretch relative font-extrabold'>
        Proposer un nouveau stage
      </div>
      <div className='w-full rounded-3xl flex flex-col items-start justify-center py-[30px] px-10 box-border gap-[38px] max-w-[1000px] text-base text-dimgray-100'>
        <div className='self-stretch flex flex-row items-start justify-start'>
          <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
            <div className='self-stretch relative h-[27px]'>
              <label for='entreprise' class='top-0 left-0'>
                Entreprise
              </label>
            </div>
            <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
              <input
                type='text'
                id='entreprise'
                name='entreprise'
                class='w-full h-full px-6 appearance-none bg-transparent border-none'
              />
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-row items-start justify-start'>
          <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
            <div className='self-stretch relative h-[27px]'>
              <label for='offreTitle' class='top-0 left-0'>
                Titre de l'offre
              </label>
            </div>
            <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
              <input
                type='text'
                id='offreTitle'
                name='offreTitle'
                class='w-full h-full px-6 appearance-none bg-transparent border-none'
              />
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-row items-start justify-start'>
          <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
            <div className='self-stretch relative h-[27px]'>
              <label for='descOffre' class='top-0 left-0'>
                Description de l'offre
              </label>
            </div>
            <div className='self-stretch relative rounded-lg box-border h-20 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
              <input
                type='text'
                id='descOffre'
                name='descOffre'
                class='w-full h-full px-3 appearance-none bg-transparent border-none'
              />
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-col items-start justify-start gap-[6px] text-sm text-dimgray-100'>
          <div className='relative'>Type de stage</div>
          <div class='self-stretch flex flex-row flex-wrap items-start justify-start gap-2 text-base text-gray '>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2 '>
              <input
                type='radio'
                id='observation'
                name='options'
                value='ginf'
                class=' appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='observation' class='relative cursor-pointer'>
                Observation
              </label>
            </div>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='pfa'
                name='options'
                value='gind'
                class='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='pfa' class='relative cursor-pointer'>
                PFA
              </label>
            </div>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='pfe'
                name='options'
                value='gstr'
                class='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='pfe' class='relative cursor-pointer'>
                PFE
              </label>
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-row items-start justify-center gap-[38px] text-dimgray-100'>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label for='startDate' class='top-0 left-0'>
                  Date début
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='date'
                  id='startDate'
                  name='startDate'
                  class='w-full h-full px-6 appearance-none bg-transparent border-none'
                />
              </div>
            </div>
          </div>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label for='endDate' class='top-0 left-0'>
                  Date fin
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='date'
                  id='endDate'
                  name='endDate'
                  class='w-full h-full px-6 appearance-none bg-transparent border-none'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        property1='default'
        className='submit'
        buttonTxt='Proposer Stage'
        icon={Icons.ChevronRightIcon}
        src='https://www.google.com/search?q=your+search+query'
      />
    </div>
  )
}

export default newStage
