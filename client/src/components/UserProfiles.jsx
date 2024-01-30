import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'
import Swal from 'sweetalert2'

function UserProfiles () {
  const styles = `
        .container-stages {
            margin-top: 20px;
        }

        .stages-table {
            width: 100%;
            background-color: #fff;
            border-collapse: collapse;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        .stages-table th, .stages-table td {
            padding: 16px;
            text-align: left;
        }

        .stages-table th {
            background-color: #f3f4f6;
            color: #4b5563;
            text-transform: uppercase;
        }

        .stages-table tbody tr:nth-child(even) {
            background-color: #f9fafb;
        }

        .stages-table tbody tr:hover {
            background-color: #edf2f7;
        }

        .delete-button {
            margin: 0 4px;
            padding: 8px 16px;
            border-radius: 9999px;
            outline: none;
            cursor: pointer;
            background-color: #ffffff;
            border: 1px solid #d1d5db;
            color: #374151;
            transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        }

        .delete-button.active {
            background-color: #1e40af;
            color: #ffffff;
            border-color: #1e40af;
        }
    `

  const { user } = useContext(AuthContext)
  const [profiles, setProfiles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [profilesPerPage] = useState(5)

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/admin/getAllProfiles', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setProfiles(response.data.profiles)
    } catch (error) {
      console.error('Error fetching profiles:', error)
    }
  }

  useEffect(() => {
    fetchProfiles()
  }, [user])

  const filteredProfiles = profiles.filter(profile =>
    Object.values(profile).some(
      value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const indexOfLastProfile = currentPage * profilesPerPage
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage
  const currentProfiles = filteredProfiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  )

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const handleDeleteProfile = async profileId => {
    const confirmed = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Cette action ne peut pas être annulée!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    })

    if (confirmed.isConfirmed) {
      try {
        await axios.delete(`/api/admin/deleteProfile/${profileId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        // Refresh profiles after deletion
        fetchProfiles()
        Swal.fire('Supprimé!', 'Le profil a été supprimé.', 'success')
      } catch (error) {
        console.error('Error deleting profile:', error)
        Swal.fire(
          'Erreur!',
          "Une erreur s'est produite lors de la suppression du profil.",
          'error'
        )
      }
    }
  }

  return (
    <div className='container-stages mx-auto px-4 py-0'>
      <style>{styles}</style>

      <div class='mb-3'>
        <div class='relative mb-4 flex w-1/2 flex-wrap items-stretch '>
          <input
            type='search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            class='font-poppins relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border  border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
            placeholder='Rechercher'
            aria-label='Search'
            aria-describedby='button-addon1'
          />

          <button
            class='cursor-pointer relative z-[2] flex items-center border-none rounded-r bg-indigo-500 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-indigo-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg'
            type='button'
            id='button-addon1'
            data-te-ripple-init
            data-te-ripple-color='light'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              class='h-5 w-5'
            >
              <path
                fill-rule='evenodd'
                d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                clip-rule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='stages-table'>
          <thead className=''>
            <tr className='bg-gray-200 text-gray-600 uppercase text-lg '>
              <th className='py-3 px-6 text-left'>First Name</th>
              <th className='py-3 px-6 text-left'>Last Name</th>
              <th className='py-3 px-6 text-left'>Filiere</th>
              <th className='py-3 px-6 text-left'>Niveau</th>
              <th className='py-3 px-6 text-left'>Promotion</th>
              <th className='py-3 px-6 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-gray-400 text-lg'>
            {currentProfiles.map(profile => (
              <tr
                key={profile._id}
                className='border-b border-gray-200 hover:bg-gray-100'
              >
                <td className='py-4 px-6'>{profile.firstName}</td>
                <td className='py-4 px-6'>{profile.lastName}</td>
                <td className='py-4 px-6'>{profile.filiere}</td>
                <td className='py-4 px-6'>{profile.niveau}</td>
                <td className='py-4 px-6'>{profile.promotion}</td>
                <td className='py-4 px-6'>
                  <button
                    type='button'
                    className='delete-button'
                    onClick={() => handleDeleteProfile(profile._id)}
                    data-te-ripple-init
                    data-te-ripple-color='light'
                    class='cursor-pointer items-end h-full border-none flex rounded-lg bg-white p-2 uppercase leading-normal text-white drop-shadow-md transition duration-300 ease-in-out hover:bg-danger-600 '
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1'
                      stroke='currentColor'
                      class='w-6 h-6 text-danger hover:text-white '
                    >
                      <path
                        stroke-linecap='round'
                        strokeLinejoin='round'
                        d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex mt-4 justify-end'>
  <a
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
    className={`relative block rounded bg-transparent px-3 py-1.5 text-md ${
      currentPage === 1
        ? 'pointer-events-none text-neutral-500'
        : 'text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
    }`}
  >
    Previous
  </a>
  {Array.from({ length: totalPages }, (_, i) => (
    <a
      key={i}
      onClick={() => paginate(i + 1)}
      className={`relative block rounded bg-transparent px-3 py-1.5 text-lg ${
        currentPage === i + 1
          ? 'bg-primary-100 text-primary-700 font-medium transition-all duration-300'
          : 'text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
      }`}
    >
      {i + 1}
      {currentPage === i + 1 && (
        <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">(current)</span>
      )}
    </a>
  ))}
  <a
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`relative block rounded bg-transparent px-3 py-1.5 text-md ${
      currentPage === totalPages
        ? 'pointer-events-none text-neutral-500'
        : 'text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'
    }`}
  >
    Next
  </a>
  
</div>

    </div>
  )
}

export default UserProfiles
