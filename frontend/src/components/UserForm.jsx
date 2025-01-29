import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../store/userSlice';
import { toast } from 'react-toastify';

const UserForm = ({ userToEdit }) => {
  const [name, setName] = useState(userToEdit ? userToEdit.name : '');
  const [email, setEmail] = useState(userToEdit ? userToEdit.email : '');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
    };

    if (userToEdit) {
      dispatch(updateUser({ ...userToEdit, ...newUser }));
      toast.success('User updated successfully');
    } else {
      dispatch(addUser(newUser));
      toast.success('User added successfully');
    }
  };

  return (
    <div class="flex items-center justify-center flex-row  mx-auto p-10 bg-amber-400">
        <form onSubmit={handleSubmit}>
      <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        class="mb-4 border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      </div>
      <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        class="mb-4 border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{userToEdit ? 'Update User' : 'Add User'}</button>
    </form>
    </div>
  );
};

export default UserForm;
