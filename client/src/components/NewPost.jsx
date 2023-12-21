import { Button } from '../components/Button'
import * as Icons from '@heroicons/react/24/solid'
const newPost = () => {
    return (
      <div className='relative bg-aliceblue-100 w-full h-[2078px] flex flex-col items-center justify-start py-[60px] px-10 box-border gap-[40px] text-left text-[40px] text-steelblue-200 font-poppins'>
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
                <label for='titrePost' class='top-0 left-0'>
                  Titre du poste
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='titrePost'
                  name='titrePost'
                  class='w-full h-full px-6 appearance-none bg-transparent border-none'
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
                id='desc'
                name='desc'
                className='w-full h-auto px-6 appearance-none bg-transparent border border-solid border-[#BFC6C9] rounded-lg'
              />
            </div>
          </div>
        </div>
        <Button
          property1='default'
          className='submit'
          buttonTxt='Créer poste'
          icon={Icons.ChevronRightIcon}
          src='https://www.google.com/search?q=your+search+query'
        />
      </div>
    )
  }
  
  export default newPost
  