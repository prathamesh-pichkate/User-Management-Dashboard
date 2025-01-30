import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUser, setLoading } from '../store/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.users);


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

  const handleDelete = async (id) => {
  
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch(deleteUser(id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };
  
  if (loading) return <div className="text-center py-4">Loading...</div>;

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
            {users.map((user) => {
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
                      onClick={() => {
                        handleDelete(user.id);
                      }}
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
    </div>
  );
};

export default UserList;
