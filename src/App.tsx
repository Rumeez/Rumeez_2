import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './context/user-context-provider';
import Home from './components/Home';
import User from './components/User';
import Chats from './components/Chats';
import OptionsBarA from './components/OptionsBarA';
import OptionsBarB from './components/OptionsBarB';
import LoginChecker from './components/LoginChecker';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <UserContextProvider>
        <Router>
          <LoginChecker />
          <OptionsBarB />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="chats" element={<Chats />} />
          </Routes>
        </Router>
      </UserContextProvider>
    );
  }
}

export default App;
