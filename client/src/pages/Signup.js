import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import * as Icons from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ButtonComponent'

function Signup () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const roles = ['etudiant', 'laureat']
  const { Signup: handleSignup, isLoading } = useSignup()

  const Navigate = useNavigate()
  const handleSubmit = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    try {
      await handleSignup(email, password, confirmPassword, role)
      Navigate('/create-profile')
    } catch (error) {
      setError("echec d'inscreption")
    }
  }

  return (
    <div className=" relative bg-aliceblue-100 w-full h-[1117px] overflow-hidden flex flex-col items-center justify-center py-[10px] px-[289px] box-border text-center text-[32px] text-white font-poppins">
    <div className="self-stretch flex flex-row items-start justify-start min-w-[1150px] ">
      <div className="hidden sm:block relative w-[327px] h-[854px]">
        <div className="absolute top-[0px] left-[0px] rounded-tl-3xl rounded-tr-none rounded-br-none rounded-bl-3xl [background:linear-gradient(173.97deg,_#8121ff,_rgba(151,_71,_255,_0)),_#017cc5] w-[327px] h-[854px]" />
        <img
          className="absolute top-[243px] left-[calc(50%_-_125.5px)] w-[251px] h-[172px] object-cover"
          alt=""
          src="/logo@2x.png"
        />
        <div className="absolute top-[427px] left-[calc(50%_-_118.5px)] font-extrabold flex items-center justify-center w-[237px]">
          HistoLauréat
        </div>
      </div>
      <div className=" self-stretch flex-1 rounded-tl-none rounded-tr-3xl rounded-br-3xl sm:rounded-bl-3xl sm:rounded-tl-3xl rounded-bl-none bg-white overflow-hidden flex flex-col items-center justify-start py-[34px] px-[51px] gap-[19px] text-5xl text-steelblue">
        <div className="relative font-extrabold flex items-center justify-center w-[658px]">
          Créer votre compte HistoLauréat
        </div>
        <div className="flex flex-col items-center justify-center text-left text-base text-dimgray-100">
          <div className="rounded-3xl bg-white h-[683px] shrink-0 flex flex-col items-start justify-start p-6 box-border gap-[30px]">
            <div className="shrink-0 flex flex-row items-start justify-center gap-[6px] text-center text-xs text-white font-avenir">
              <div className="shrink-0 flex flex-col items-center justify-center gap-[8px]">
                <div className="relative w-5 h-5">
                  <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5" />
                  <div className="absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]">
                    1
                  </div>
                </div>
                <i className="relative text-base font-light font-poppins text-darkslategray">
                  L’essentiel
                </i>
              </div>
              <div className="relative bg-darkslategray w-[232px] h-px opacity-[0.35]" />
              <div className="shrink-0 flex flex-col items-center justify-center gap-[8px] opacity-[0.35]">
                <div className="relative w-5 h-5">
                  <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5" />
                  <div className="absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]">
                    2
                  </div>
                </div>
                <i className="relative text-base font-light font-poppins text-darkslategray">
                  Profil
                </i>
              </div>
              <div className="relative bg-darkslategray w-[232px] h-px opacity-[0.35]" />
              <div className="shrink-0 flex flex-col items-center justify-center gap-[8px] opacity-[0.35]">
                <div className="relative w-5 h-5">
                  <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-5 h-5" />
                  <div className="absolute top-[3.5px] left-[7px] flex items-center justify-center w-[5.56px] h-[12.22px]">
                    3
                  </div>
                </div>
                <i className="relative text-base font-light font-poppins text-darkslategray">
                  Prêt
                </i>
              </div>
            </div>
            <div className="w-[611px] flex flex-col items-start justify-center gap-[8px] text-white">
              <div className="flex flex-row items-center justify-start gap-[12px] text-center text-xs font-avenir">
                <div className="relative w-6 h-6">
                  <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-darkslategray w-6 h-6" />
                  <div className="absolute top-[4.2px] left-[8.4px] flex items-center justify-center w-[6.67px] h-[14.67px]">
                    1
                  </div>
                </div>
                <i className="relative text-5xl font-poppins text-darkslategray">
                  L’essentiel
                </i>
              </div>
              <i className="relative inline-block font-light text-dimgray-100 w-[611px]">
                Veuillez renseigner les informations de base de votre compte.
                Des champs supplémentaires seront requis après votre
                connexion.
              </i>
              <i className="relative inline-block text-gray w-[589px]">
                *Tous les champs sont obligatoires sauf indication contraire.
              </i>
            </div>
            <div className="w-[534px] flex flex-col items-start justify-start gap-[4px]">
              <div className="self-stretch relative h-[27px]">
                <i className="absolute top-[0px] left-[0px]">*Email</i>
                <div className="absolute top-[0px] right-[8.86px] w-[73px] h-[27px] hidden text-right text-lg text-dimgray-200">
                  <img
                    className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden object-cover"
                    alt=""
                    src="/icon@2x.png"
                  />
                  <i className="absolute top-[0px] right-[0px]">Hide</i>
                </div>
              </div>
              <div className="self-stretch relative rounded-xl box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400">
                <div className="absolute top-[15px] left-[24px] hidden flex-row items-center justify-start">
                  <div className="relative">Enter your email address</div>
                  <div className="relative bg-gray w-px h-6 hidden" />
                </div>
                <img
                  className="absolute top-[40px] right-[24px] w-6 h-6 overflow-hidden object-cover hidden"
                  alt=""
                  src="/icons@2x.png"
                />
              </div>
              <i className="relative text-sm hidden text-crimson">
                Error message
              </i>
            </div>
            <div className="shrink-0 flex flex-col items-start justify-start gap-[6px] text-sm">
              <i className="relative">Sélectionner votre rôle</i>
              <div className="shrink-0 flex flex-row items-start justify-start gap-[32px] text-base text-gray">
                <div className="shrink-0 flex flex-row items-center justify-center py-0 px-2 gap-[8px]">
                  <img
                    className="relative w-4 h-4 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/radio-button@2x.png"
                  />
                  <i className="relative">Étudiant</i>
                </div>
                <div className="shrink-0 flex flex-row items-center justify-center py-0 px-2 gap-[8px]">
                  <img
                    className="relative w-4 h-4 overflow-hidden shrink-0 object-cover"
                    alt=""
                    src="/radio-button@2x.png"
                  />
                  <i className="relative">Lauréat</i>
                </div>
              </div>
            </div>
            <div className="shrink-0 flex flex-col items-start justify-start gap-[8px]">
              <div className="shrink-0 flex flex-row items-start justify-start gap-[16px]">
                <div className="w-[259px] flex flex-col items-start justify-start gap-[4px]">
                  <div className="self-stretch relative h-[27px]">
                    <i className="absolute top-[0px] left-[0px]">
                      Mot de passe
                    </i>
                    <div className="absolute top-[0px] right-[8.86px] w-[73px] h-[27px] hidden text-right text-lg text-dimgray-200">
                      <img
                        className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden object-cover"
                        alt=""
                        src="/icon@2x.png"
                      />
                      <i className="absolute top-[0px] right-[0px]">Hide</i>
                    </div>
                  </div>
                  <div className="self-stretch relative rounded-xl box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400">
                    <div className="absolute top-[15px] left-[24px] hidden flex-row items-center justify-start">
                      <div className="relative">Enter your email address</div>
                      <div className="relative bg-gray w-px h-6 hidden" />
                    </div>
                    <img
                      className="absolute top-[40px] right-[24px] w-6 h-6 overflow-hidden object-cover hidden"
                      alt=""
                      src="/icons@2x.png"
                    />
                  </div>
                  <i className="relative text-sm hidden text-crimson">
                    Error message
                  </i>
                </div>
                <div className="w-[259px] flex flex-col items-start justify-start gap-[4px]">
                  <div className="self-stretch relative h-[27px]">
                    <i className="absolute top-[0px] left-[0px]">
                      <p className="m-0">Confirmation</p>
                    </i>
                    <div className="absolute top-[0px] right-[8.86px] w-[73px] h-[27px] hidden text-right text-lg text-dimgray-200">
                      <img
                        className="absolute top-[3px] right-[49px] w-6 h-6 overflow-hidden object-cover"
                        alt=""
                        src="/icon@2x.png"
                      />
                      <i className="absolute top-[0px] right-[0px]">Hide</i>
                    </div>
                  </div>
                  <div className="self-stretch relative rounded-xl box-border h-14 overflow-hidden shrink-0 text-dimgray-300 border-[1px] border-solid border-dimgray-400">
                    <div className="absolute top-[15px] left-[24px] hidden flex-row items-center justify-start">
                      <div className="relative">Enter your email address</div>
                      <div className="relative bg-gray w-px h-6 hidden" />
                    </div>
                    <img
                      className="absolute top-[40px] right-[24px] w-6 h-6 overflow-hidden object-cover hidden"
                      alt=""
                      src="/icons@2x.png"
                    />
                  </div>
                  <i className="relative text-sm hidden text-crimson">
                    Error message
                  </i>
                </div>
              </div>
              <i className="relative">
                Utilisez 8 caractères ou plus avec un mélange de lettres, de
                chiffres et de symboles.
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup
