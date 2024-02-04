import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { HiDownload } from 'react-icons/hi';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { SubmitButton } from '../components/SubmitButton'
import * as Icons from '@heroicons/react/24/solid'
function UserLaureats() {
  const { user } = useContext(AuthContext);
  const [laureats, setLaureats] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [laureatsPerPage] = useState(5);

  const fetchLaureats = async () => {
    try {
      const response = await axios.get('/api/admin/getAllLaureats', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setLaureats(response.data); 
    } catch (error) {
      console.error('Erreur lors de la récupération des lauréats :', error);
    }
  };

  useEffect(() => {
    fetchLaureats();
  }, [user]);

  const filteredLaureats = laureats.filter(laureat =>
    typeof laureat.filiere === 'string' &&
    laureat.filiere.toLowerCase().includes(selectedFiliere.toLowerCase())
  );

  const indexOfLastLaureat = currentPage * laureatsPerPage;
  const indexOfFirstLaureat = indexOfLastLaureat - laureatsPerPage;
  const currentLaureats = filteredLaureats.slice(
    indexOfFirstLaureat,
    indexOfLastLaureat
  );

  const totalPages = Math.ceil(filteredLaureats.length / laureatsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleExportPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const title = selectedFiliere ? `La liste des Laureats de la filiere ${selectedFiliere}` : 'La liste des laureats';
    pdf.setFontSize(15);
    pdf.text(title, pdf.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    const yOffset = 30;

    const table = document.getElementById('laureats-table');
  
    const tableData = [];
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const rowData = [];
      row.querySelectorAll('td:not(:first-child)').forEach(cell => {
        rowData.push(cell.textContent.trim());
      });
      tableData.push(rowData);
    });
  
    pdf.autoTable({
      startY: yOffset, 
      head: [['First Name', 'Last Name', 'Email', 'Filiere', 'Promotion', 'Poste Actuel']], 
      body: tableData, 
    });
  
    pdf.save(`laureats-${selectedFiliere}.pdf`);
  };
  const styles = `
    .container-laureats {
      margin-top: 20px;
    }

    .laureats-table {
      width: 100%;
      background-color: #fff;
      border-collapse: collapse;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    .laureats-table th, .laureats-table td {
      padding: 16px;
      text-align: left;
    }

    .laureats-table th {
      background-color: #f3f4f6;
      color: #4b5563;
      text-transform: uppercase;
    }

    .laureats-table tbody tr:nth-child(even) {
      background-color: #f9fafb;
    }

    .laureats-table tbody tr:hover {
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
  `;


  return (
    <div className='container-laureats mx-auto px-4 py-0'>
      <style>{styles}</style>
      <div className='mb-3'>
        <div className='flex mt-4 justify-end'>
          <SubmitButton 
              property1='default'
              className='submit'
              buttonTxt='Télécharger PDF'
              icon={Icons.ArrowDownIcon}
              onclick={handleExportPDF}
            />       
        </div>
        <div className='relative mb-4 flex w-1/2 flex-wrap items-stretch '>
          <select
            value={selectedFiliere}
            onChange={(e) => setSelectedFiliere(e.target.value)}
            className='font-poppins relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
            aria-label='Sélectionner une filière'
          >
            <option value="">Toutes les filières</option>
            <option value="GSTR">GSTR</option>
            <option value="GSEA">GSEA</option>
            <option value="GINF">GINF</option>
            <option value="G3EI">G3EI</option>
            <option value="CS">CS</option>
          </select>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table id="laureats-table" className='laureats-table w-full bg-white shadow-md rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-lg'>
              <th className='py-3 px-6 text-left'>Image</th>
              <th className='py-3 px-6 text-left'>First Name</th>
              <th className='py-3 px-6 text-left'>Last Name</th>
              <th className='py-3 px-6 text-left'>Conract</th>
              <th className='py-3 px-6 text-left'>Filiere</th>
              <th className='py-3 px-6 text-left'>Promotion</th>
              <th className='py-3 px-6 text-left'>Poste Actuel</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-lg'>
            {currentLaureats.map(laureat => (
              <tr
                key={laureat._id}
                className='border-b border-gray-200 hover:bg-gray-100'
              >
                <td className='py-4 px-6'><img src={laureat.image} alt="Profile" className="h-8 w-8 rounded-full object-cover" /></td>
                <td className='py-4 px-6'>{laureat.firstName}</td>
                <td className='py-4 px-6'>{laureat.lastName}</td>
                <td className='py-4 px-6'>{laureat.email}</td>
                <td className='py-4 px-6'>{laureat.filiere}</td>
                <td className='py-4 px-6'>{laureat.promotion}</td>
                <td className='py-4 px-6'>{laureat.posteActuel}</td>
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
  );
}

export default UserLaureats;
