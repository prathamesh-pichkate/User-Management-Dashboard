import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Header from './components/Header';


const notify = (message) => toast(message);

const App = () => {
  return (
    <BrowserRouter>
      <Header /> 
      <ToastContainer />

      
      <Routes>
       
        <Route path="/" element={ <UserList />} /> 
        <Route path="/add" element={<UserForm notify={notify} />} />
        <Route path="/edit/:id" element={<UserForm notify={notify} />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
