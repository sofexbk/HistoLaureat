import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

function UserStages() {
    const { user } = useContext(AuthContext);
    const [stages, setStages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [stagesPerPage] = useState(5);

    const fetchStages = async () => {
        try {
            const response = await axios.get('/api/admin/getAllStages', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setStages(response.data.stages);
        } catch (error) {
            console.error('Error fetching stages:', error);
        }
    };

    useEffect(() => {
        fetchStages();
    }, [user]);

    const filteredStages = stages.filter(stage =>
        Object.values(stage).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastStage = currentPage * stagesPerPage;
    const indexOfFirstStage = indexOfLastStage - stagesPerPage;
    const currentStages = filteredStages.slice(indexOfFirstStage, indexOfLastStage);

    const totalPages = Math.ceil(filteredStages.length / stagesPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDeleteStage = async (laureatId, stageId) => {
        const confirmed = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: 'Cette action ne peut pas être annulée!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        });

        if (confirmed.isConfirmed) {
            try {
                await axios.delete(`/api/admin/${laureatId}/${stageId}/deleteStage`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                // Refresh stages after deletion
                fetchStages();
                Swal.fire('Supprimé!', 'Le stage a été supprimé.', 'success');
            } catch (error) {
                console.error('Error deleting stage:', error);
                Swal.fire('Erreur!', 'Une erreur s\'est produite lors de la suppression du stage.', 'error');
            }
        }
    };

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
            font-size: 12px;
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
    `;

    return (
        
        <div className="container-stages mx-auto px-4 py-8">
            
            <style>{styles}</style>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <div className="overflow-x-auto">
                <table className="stages-table w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                            <th className="py-3 px-6 text-left">Company</th>
                            <th className="py-3 px-6 text-left">Type</th>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">Start Date</th>
                            <th className="py-3 px-6 text-left">End Date</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {currentStages.map(stage => (
                            <tr key={stage._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-4 px-6">{stage.company}</td>
                                <td className="py-4 px-6">{stage.type}</td>
                                <td className="py-4 px-6">{stage.title}</td>
                                <td className="py-4 px-6">{stage.description}</td>
                                <td className="py-4 px-6">{stage.startDate}</td>
                                <td className="py-4 px-6">{stage.endDate}</td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleDeleteStage(stage.laureatId, stage._id)}
                                        className="delete-button px-3 py-1 rounded-full focus:outline-none bg-red-500 text-white"
                                        style={{
                                            margin: '0 4px',
                                            padding: '8px 16px',
                                            borderRadius: '9999px',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            backgroundColor: '#e53e3e', 
                                            border: '1px solid #d1d5db',
                                            color: '#ffffff',
                                            transition: 'background-color 0.3s, border-color 0.3s, color 0.3s'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mx-1 px-3 py-1 rounded-full focus:outline-none bg-gray-300 text-gray-800"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`mx-1 px-3 py-1 rounded-full focus:outline-none ${
                            currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                        }`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="mx-1 px-3 py-1 rounded-full focus:outline-none bg-gray-300 text-gray-800"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default UserStages;