import { Button } from '../components/Button'
import * as Icons from '@heroicons/react/24/solid'
import { images } from '../constants'
const Landing = () => {
    return (
      <div className='relative bg-aliceblue-100 w-full flex flex-row flex-wrap items-start justify-between py-[60px] px-0 box-border text-left text-21xl text-steelblue-200 font-poppins'>
        {/* CONTENENTS GLOBAL */}
        <div className='flex-1 shrink-0 flex flex-row flex-wrap items-start justify-center gap-[10px]'>
          {/* CONTENENTS  */}
          {/* 1 - POSTS */}
          <div className='flex-1 flex flex-col items-start justify-start py-0 px-10 box-border gap-[20px] min-w-[600px] max-w-[1200px]'>
            <div className='self-stretch relative font-extrabold'>Posts</div>
            {/* 1.1 - CONTENAIRE POSTES */}
            <div className='self-stretch flex flex-col items-start justify-start gap-[28px] text-xl text-black'>
              {/* 1.2 --- start ONE POSTE */}
              <div className='self-stretch flex flex-col items-start justify-start'>
                {/* 1.2.1 - POST CONTENT */}
                <div className='self-stretch rounded-t-xl rounded-b-none bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[19px]'>
                  {/* 1.2.2 - POST OWNER (name / img / time) */}
                  <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
                    <img
                      className='relative rounded-21xl w-[60px] h-[60px] object-cover'
                      alt=''
                      src={images.Logo}
                    />
                    <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
                      <b className='relative'>Anass</b>
                      <div className='relative text-smi font-light text-darkgray'>
                        Il ya 35 min
                      </div>
                    </div>
                  </div>
                  {/* 1.2.3 - POST ITSELF */}
                  <div className='self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-3.5'>
                    <b className='self-stretch relative'>
                      <p className='[margin-block-start:0] [margin-block-end:1px]'>
                        J'espère que vous allez bien. Actuellement, je travaille
                        sur un projet en Java et je suis confronté(e) à des
                        difficultés dans la construction des constructeurs. Plus
                        précisément, je peine à comprendre comment organiser les
                        différentes parties du code pour créer des constructeurs
                        efficaces.
                      </p>
                      <p className='m-0'>
                        Si vous avez de l'expérience dans ce domaine et que vous
                        pourriez me prodiguer des conseils sur la construction des
                        constructeurs en Java, cela serait d'une grande aide. Des
                        exemples concrets ou des directives sur les bonnes
                        pratiques seraient particulièrement appréciés. Merci
                        d'avance pour votre précieuse assistance.
                      </p>
                    </b>
                  </div>
                </div>
                {/* 1.2.4 - POSTE COMMENT */}
                <div className='self-stretch overflow-y-auto flex flex-col items-start justify-start'>
                  <div className='self-stretch bg-aliceblue-200 flex flex-col items-center justify-start p-[30px] gap-[25px]'>
                    {/* --- start ONE COMMENT */}
                    <div className='self-stretch rounded-3xs bg-white shadow-[13px_9px_28.1px_-13px_rgba(0,_0,_0,_0.05)] flex flex-col items-start justify-start py-[29px] px-10 gap-[25px] '>
                      <div className='flex flex-row flex-wrap items-center justify-start gap-[16px]'>
                        <img
                          className='relative rounded-21xl w-[60px] h-[60px] object-cover'
                          alt=''
                          src={images.Logo}
                        />
                        <div className='shrink-0 flex flex-col items-center justify-start gap-[6px]'>
                          <b className='relative'>Anass</b>
                          <div className='relative text-smi font-light text-darkgray'>
                            À l’instant
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch flex flex-col items-start justify-start py-0 pr-0 pl-3.5 text-[17px] '>
                        <b className='self-stretch relative'>{`J'espère que vous allez bien. Actuellement, je travaille sur un projet en Java et je suis confronté(e) `}</b>
                      </div>
                    </div>
                    {/* --- end ONE COMMENT */}
                    {/* Button Ajouter commentaire */}
                    <Button
                      property1='default'
                      className='submit'
                      buttonTxt='Commentaire'
                      icon={Icons.PlusIcon}
                      src='https://www.google.com/search?q=your+search+query'
                    />
                  </div>
                  <div className='self-stretch rounded-t-none rounded-b-xl bg-aliceblue-300 flex flex-row items-center justify-start py-5 pr-0 pl-[50px] gap-[36px] text-steelblue-100'>
                    <img
                      className='relative w-[25.04px] h-[27px] object-contain'
                      alt=''
                      src='/expand-down-double-light@2x.png'
                    />
                    <div className='relative font-light'>
                      Masquer les commentaires
                    </div>
                  </div>
                </div>
              </div>
              {/* 1.2 --- end ONE POSTE */}
            </div>
          </div>
          {/* 2 - OFFRE DE STAGES */}
          <div className='shrink-0 flex flex-col items-start justify-start py-0 px-10 gap-[20px]'>
            <div className='self-stretch relative font-extrabold'>
              Offres de Stages
            </div>
            {/* 2.1 - CONTENAIRE STAGES */}
            <div className='self-stretch flex flex-col items-start justify-start gap-[30px] text-center text-xl text-black'>
              {/* 2.1 - start ONE STAGE */}
              <div className='relative w-[337px] h-[340px]'>
                <div className='absolute top-[0px] left-[0px] rounded-mini bg-white shadow-[13px_9px_20.5px_-13px_rgba(0,_0,_0,_0.25)] w-[337px] h-[340px]' />
                <img
                  className='absolute h-[36.47%] w-[56.38%] top-[16.47%] right-[21.96%] bottom-[47.06%] left-[21.66%] max-w-full overflow-hidden max-h-full object-cover'
                  alt=''
                  src='/ensat-1@2x.png'
                />
                <b className='absolute top-[208px] left-[59px] flex items-center justify-center w-[219px] h-14'>
                  Responsable communication
                </b>
              </div>
              {/* 2.2 - end ONE STAGE */}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Landing
  