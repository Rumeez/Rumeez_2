import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './context/user-context-provider';
import Home from './components/Home';
import User from './components/User';
import { Routes, Navigate, Route } from 'react-router';
import Chats from './components/Chats';
import Login from './components/Login';
import OptionsBar from './components/OptionsBar';

class App extends React.Component<{}, {}> {

  render() {
    return (
      <UserContextProvider>
        <BrowserRouter>
          <OptionsBar />
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/user" element={<User />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="*" element={<Navigate to="/home" />} /> */}
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    );
  }
}

export default App;