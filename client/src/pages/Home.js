import React from 'react'
import homeStudents from '../assets/homeStudents.png'
import firstPic from '../assets/homeIcons/1.png'
import secondPic from '../assets/homeIcons/2.png'
import thirdPic from '../assets/homeIcons/3.png'
import fourthPic from '../assets/homeIcons/4.png'

function Home () {
  return (
    <div className='bg-aliceblue-100 relative h-[1500px] bg-ghostwhite w-full overflow-hidden flex flex-col items-center justify-start py-7 px-0 box-border gap-[34px] min-w-[1030px] text-left text-[48px] text-steelblue font-raleway'>
      <div className='self-stretch flex flex-row flex-wrap items-center justify-center gap-[160px]'>
        <div className='relative font-montserrat font-extrabold text-transparent !bg-clip-text [background:linear-gradient(98.39deg,_#017cc5,_#9747ff)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block w-[841px] shrink-0'>
          Votre plateforme collaborative pour interagir avec les anciens
          lauréats
        </div>

        <img
          className='relative w-[444px] h-[350px] object-cover'
          alt=''
          src={homeStudents}
        />
      </div>
      <div className='self-stretch flex flex-col items-center justify-center gap-[35px] text-[40px]  font-montserrat'>
        <div className='relative text-[#017CC5] '>NOS SERVICES</div>
        <div className='w-[944px] flex flex-col items-center justify-center gap-[46px] text-xl text-dimgray font-montserrat'>
          <div className='self-stretch flex flex-row flex-wrap items-start justify-start gap-[30px]'>
          <img
              className='relative w-[55px] h-[55px] object-cover'
              alt=''
              src={firstPic}
            />
            <div className='relative'>
              <p className='m-0 text-5xl text-black'>
                <b>ÉCHANGE DYNAMIQUE</b>
              </p>
              <p className='m-0'>
                une plateforme interactive favorisant l'échange dynamique entre
                lauréats et
              </p>
              <p className='m-0'>étudiants actuels.</p>
            </div>
          </div>
          <div className='self-stretch flex flex-row items-start justify-start gap-[30px]'>
            <img
              className='relative w-[55px] h-[55px] object-cover'
              alt=''
              src={secondPic}
            />
            <div className='relative'>
              <p className='m-0 text-5xl text-black'>
                <b>PARTAGE D’EXPERIENCE</b>
              </p>
              <p className='m-0'>
                Faciliter le partage d'expériences professionnelles, académiques
                et personnelles entre
              </p>
              <p className='m-0'>les participants.</p>
            </div>
          </div>
          <div className='self-stretch flex flex-row flex-wrap items-start justify-start gap-[30px] text-5xl text-black'>
            <img
              className='relative w-[55px] h-[55px] object-cover'
              alt=''
              src={thirdPic}
            />
            <div className='relative'>
              <p className='m-0'>
                <b>OFFRE DE STAGES</b>
              </p>
              <p className='m-0 text-xl text-dimgray'>
                Proposer de stages ou formations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
/*          <div className='self-stretch flex flex-row flex-wrap items-start justify-start gap-[30px] text-5xl text-black'>
            <img
              className='relative w-[55px] h-[55px] object-cover'
              alt=''
              src={fourthPic}
            />
            <div className='relative'>
              <p className='m-0'>
                <b>{`VISUALISATION DES ZONES CHALANDISES `}</b>
              </p>
              <p className='m-0 text-xl text-dimgray'>
                Visualisation géographique de la localisation des lauréats,
              </p>
            </div>
          </div>*/