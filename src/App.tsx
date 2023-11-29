import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './context/user-context-provider';
import Home from './components/Home';
import User from './components/User';
import Chats from './components/Chats';
import Login from './components/Login';
import OptionsBar from './components/OptionsBar';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <UserContextProvider>
        <Router>
          <OptionsBar />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="chats" element={<Chats />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </Router>
      </UserContextProvider>
    );
  }
}

export default App;
