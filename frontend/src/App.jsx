import { ToastContainer, toast } from 'react-toastify';
import React from 'react'
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Header from './components/Header';


const notify = (message) => toast(message);
const App = () => {
  return (
    <div>
        <ToastContainer />
        <Header/>
        <UserForm/>
        <UserList/>
    </div>
  )
}

export default App
