import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

function AdminCard () {
  const { user } = useAuthContext()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    async function fetchStats () {
      try {
        const response = await fetch('/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [user])

  return (
    <>
      {stats && (
        <div className='font-poppins grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 sm:px-8 mb-8'>
          <div className='flex items-center bg-green-400 border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out'>
            <div className='p-4 bg-green-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                ></path>
              </svg>
            </div>
            <div className='text-gray-700 flex flex-col items-center justify-around w-full   '>
              <h3 className='text-3xl text-white  tracking-wider font-md'>
                Total des membres
              </h3>
              <span className='text-green-700 text-6xl content-evenly w-full text-right mr-10 mb-3'>
                {stats.usersCount}
              </span>
            </div>
          </div>
          <div className='flex items-center bg-blue-400 border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out'>
            <div className='p-4 bg-blue-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
                ></path>
              </svg>
            </div>
            <div className='text-gray-700 flex flex-col items-center justify-around w-full   '>
              <h3 className='text-3xl text-white tracking-wider font-md'>
                Total des postes
              </h3>
              <span className='text-blue-700 text-6xl content-evenly w-full text-right mr-10 mb-3'>
                {stats.postesCount}
              </span>
            </div>
          </div>
          <div className='flex items-center bg-indigo-400 border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out'>
            <div className='p-4 bg-indigo-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-white'
                fill='none'
                
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
                />
              </svg>
            </div>
            <div className='text-gray-700 flex flex-col items-center justify-around w-full   '>
              <h3 className='text-3xl text-white tracking-wider font-md'>
                Total des Commentaires
              </h3>
              <span className='text-indigo-700 text-6xl content-evenly w-full text-right mr-10 mb-3'>
                {stats.commentsCount}
              </span>
            </div>
          </div>
          <div className='flex items-center bg-red-400 border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out'>
            <div className='p-4 bg-red-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-12 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z'
                />
              </svg>
            </div>
            <div className='text-gray-700 flex flex-col items-center justify-around w-full   '>
              <h3 className='text-3xl text-white tracking-wider font-md'>
                Total des Stages
              </h3>
              <span className='text-red-700 text-6xl content-evenly w-full text-right mr-10 mb-3'>
                {stats.stagesCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminCard