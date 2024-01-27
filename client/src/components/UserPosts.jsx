import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';
import './UserStages.css'

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const { user } = useContext(AuthContext);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/admin/getAllPostes', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setPosts(response.data.postes);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [user]);

    const filteredPosts = posts.filter(post =>
        Object.values(post).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleDeletePost = async (profileId, postId) => {
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
                await axios.delete(`/api/admin/${profileId}/deletePoste/${postId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                // Refresh posts after deletion
                fetchPosts();
                Swal.fire('Supprimé!', 'Le poste a été supprimé.', 'success');
            } catch (error) {
                console.error('Error deleting post:', error);
                Swal.fire('Erreur!', 'Une erreur s\'est produite lors de la suppression du poste.', 'error');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-4 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
            />
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Content</th>
                            <th className="py-3 px-6 text-left">Creation Date</th>
                            <th className="py-3 px-6 text-left">Actions</th> {/* Ajout de la colonne Actions */}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                        {currentPosts.map(post => (
                            <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-4 px-6">{post.title}</td>
                                <td className="py-4 px-6">{post.content}</td>
                                <td className="py-4 px-6">{post.creationDate}</td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleDeletePost(post.profileId, post._id)}
                                        className="px-3 py-1 rounded-full focus:outline-none bg-red-500 text-white"
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

export default UserPosts;
