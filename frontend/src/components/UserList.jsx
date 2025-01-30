import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUser, setLoading } from '../store/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMoreUsers, setShowMoreUsers] = useState(false);  // State for toggling users
  const { users, loading } = useSelector((state) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch(setUsers(response.data));
      } catch (error) {
        toast.error('Failed to fetch users');
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${userToDelete}`);
        dispatch(deleteUser(userToDelete));
        toast.success('User deleted successfully');
        setIsModalOpen(false); 
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const openModal = (id) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  // Determine which users to display (either 10 or all)
  const usersToDisplay = showMoreUsers ? users : users.slice(0, 8);

  return (
    <div className="p-6 mx-auto lg:w-3/4">
      <div className="flex justify-between items-center my-6">
        <h2 className="text-2xl font-bold text-blue-600">Users</h2>
        <button
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95"
          onClick={() => navigate('/add')}
        >
          + Add User
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Edit</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map((user) => {
              const [firstName, ...lastNameParts] = user.name.split(' ');
              const lastName = lastNameParts.join(' ') || 'N/A';

              return (
                <tr key={user.id} className="border-b bg-white hover:bg-gray-50">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{firstName}</td>
                  <td className="px-6 py-4">{lastName}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.company?.name || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-purple-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Show More Button */}
      {users.length > 8 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setShowMoreUsers((prev) => !prev)}
            className="text-blue-600 hover:underline"
          >
            {showMoreUsers ? 'Show Less' : 'Show More...'}
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-md">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm"
              onClick={closeModal}
            >
              <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
            </button>
            <div className="p-4 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this user?</h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="text-white bg-red-600 hover:bg-red-800 px-5 py-2.5 rounded-lg text-sm"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={closeModal}
                  className="bg-white border text-gray-900 px-5 py-2.5 rounded-lg text-sm"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
