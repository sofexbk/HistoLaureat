import { Button } from '../components/ButtonComponent'
import * as Icons from '@heroicons/react/24/solid'

const monProfile = () => {
  return (
    <div className='relative bg-aliceblue-100 w-full h-[2078px] min-w-[580px] flex flex-col items-center justify-start py-[10px] px-10 box-border gap-[40px] text-left text-xl text-white font-poppins'>
      
      <div className='self-stretch relative text-[40px] font-extrabold text-steelblue-200'>
        Mon Profile
      </div>
      <div className='w-full rounded-3xl bg-white flex flex-col items-start justify-center py-[30px] px-10 box-border gap-[38px] max-w-[1000px] text-base shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out'>
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
        <div className='self-stretch flex flex-row items-start justify-center gap-[38px] text-dimgray-100'>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label for='prenom' class='top-0 left-0'>
                  Prénom
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='prenom'
                  name='prenom'
                  class='w-full h-full px-6 appearance-none text-base bg-transparent border-none'
                />
              </div>
            </div>
          </div>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label for='nom' class='top-0 left-0'>
                  Nom
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='nom'
                  name='nom'
                  class='w-full h-full px-6 appearance-none text-base bg-transparent border-none'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-col items-start justify-start gap-[6px] text-sm text-dimgray-100'>
          <div className='relative'>Votre filière</div>
          <div class='self-stretch flex flex-row flex-wrap items-start justify-start gap-2 text-base text-gray'>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='ginf'
                name='options'
                value='ginf'
                class='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='ginf' class='relative cursor-pointer'>
                GINF
              </label>
            </div>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='gind'
                name='options'
                value='gind'
                class='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='gind' class='relative cursor-pointer'>
                GIND
              </label>
            </div>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='gstr'
                name='options'
                value='gstr'
                class='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='gstr' class='relative cursor-pointer'>
                GSTR
              </label>
            </div>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='cs'
                name='options'
                value='cs'
                class='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='cs' class='relative cursor-pointer'>
                CS
              </label>
            </div>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='gsea'
                name='options'
                value='gsea'
                class='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='gsea' class='relative cursor-pointer'>
                GSEA
              </label>
            </div>
            <div class='shrink-0 flex flex-row items-center justify-center py-1 px-2 gap-2'>
              <input
                type='radio'
                id='g3ei'
                name='options'
                value='g3ei'
                class='appearance border border-gray-300 rounded-full w-5 h-5 cursor-pointer checked:bg-blue-500 checked:border-transparent focus:outline-none transition-all duration-300 ease-in-out hover:bg-blue-200'
              />
              <label for='g3ei' class='relative cursor-pointer'>
                G3EI
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full rounded-3xl bg-white flex flex-col items-start justify-start py-10 px-[60px] box-border gap-[38px] max-w-[1000px] text-center text-xs font-avenir shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out'>
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
                <label for='promotion' class='top-0 left-0'>
                  Promotion
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='promotion'
                  name='promotion'
                  class='w-full h-full px-6 appearance-none text-base bg-transparent border-none'
                />
              </div>
            </div>
          </div>
          <div className='flex-1 shrink-0 flex flex-row items-start justify-start'>
            <div className='flex-1 flex flex-col items-start justify-start gap-[4px]'>
              <div className='self-stretch relative h-[27px]'>
                <label for='poste' class='top-0 left-0'>
                  Poste actuel
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <input
                  type='text'
                  id='poste'
                  name='poste'
                  class='w-full h-full px-6 appearance-none text-base bg-transparent border-none'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='self-stretch flex flex-col items-start justify-center gap-[12px] text-left text-base text-dimgray-100 font-poppins'>
          <div className='self-stretch relative h-[27px]'>
            <label for='exp1' class='top-0 left-0'>
              Expériences passées
            </label>
          </div>
          <div className='self-stretch relative rounded-lg box-border h-[87px] overflow-hidden shrink-0 border-[1px] border-solid border-dimgray-400'>
            <input
              type='text'
              id='exp1'
              name='exp1'
              class='w-full h-full px-2 appearance-none bg-transparent border-none text-base'
            />
          </div>
        </div>
      </div>
      <div className='w-full rounded-3xl bg-white flex flex-col items-start justify-start pt-[30px] px-[60px] pb-10 box-border gap-[38px] max-w-[1000px] text-center text-xs font-avenir shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out'>
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
                <label for='niveau' class='top-0 left-0'>
                  Niveau
                </label>
              </div>
              <div className='self-stretch relative rounded-lg box-border h-14 overflow-hidden shrink-0 text-dimgray-200 border border-solid border-dimgray-400'>
                <select
                  id='niveau'
                  name='niveau'
                  class='w-full h-full px-6 appearance-none text-base bg-transparent border-none'
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
            <label for='exp2' class='top-0 left-0'>
              Expériences passées
            </label>
          </div>
          <div className='self-stretch relative rounded-lg box-border h-[87px] overflow-hidden shrink-0 border-[1px] border-solid border-dimgray-400'>
            <input
              type='text'
              id='exp1'
              name='exp1'
              class='w-full h-full px-2 appearance-none text-base bg-transparent border-none '
            />
          </div>
        </div>
      </div>
      <Button
        property1='default'
        className='submit'
        buttonTxt='Enregistrer'
        icon={Icons.ChevronRightIcon}
        src='/'
      />
    </div>
  )
}

export default monProfile
