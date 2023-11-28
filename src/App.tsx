import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './context/user-context-provider';
import Home from './components/Home';
import User from './components/User';
import { Routes, Navigate, Route } from 'react-router';
import Chats from './components/Chats';

class App extends React.Component<{}, {}> {

  render() {
    return (
      <BrowserRouter>
        <UserContextProvider>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/user" element={<User />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </UserContextProvider>
      </BrowserRouter>
    );
  }
}

export default App;