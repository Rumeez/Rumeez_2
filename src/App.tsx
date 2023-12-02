import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './context/user-context-provider';
import Home from './components/Home';
import User from './components/User';
import Chats from './components/Chats';
import OptionsBar from './components/OptionsBar';
import LoginChecker from './components/LoginChecker';

import MyProfile from './components/MyProfile';
import Search from './components/Seach';
import Root from './components/Root';
import AccountVerification from './components/AccountVerification';
import VerificationToken from './components/VerificationToken';
import { Outlet } from 'react-router-dom';
import SignUp from './components/SignUp';
import Preference from './components/Preference';

import Chat from './components/Chat'

class App extends React.Component<{}, {}> {
  render() {
    return (
      <UserContextProvider>
        <Router>
          <LoginChecker>
          <OptionsBar />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="chats" element={<Chats />} />
             <Route path="signup" element={<SignUp />} />
             <Route path="search" element={<Search />} />
             <Route path = "myprofile" element = {<MyProfile/>}/>
             <Route path="preference" element={<Preference />} />
            <Route path="verify" element={<Outlet />}>
              <Route path=":vtoken" element={<VerificationToken />} />
              <Route path="" element={<AccountVerification />} />
            </Route>
            <Route path="/chat/:chatId" element={<Chat />} />
              <Route path="" element={<Root />} /> 
          </Routes>
          </LoginChecker>
        </Router>
      </UserContextProvider>
    );
  }
}

export default App;
