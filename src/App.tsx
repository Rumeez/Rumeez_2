import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './context/user-context-provider';
import Home from './components/Home';
import User from './components/User';
import Chats from './components/Chats';
import OptionsBar from './components/OptionsBar';
import LoginChecker from './components/LoginChecker';
import AccountVerification from './components/AccountVerification';
import VerificationToken from './components/VerificationToken';
import { Outlet } from 'react-router-dom';
import AccountRecovery from './components/AccountRecovery';
import RecoveryToken from './components/RecoveryToken';
import PasswordReset from './components/PasswordReset';

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
              <Route path="verify" element={<Outlet />}>
                <Route path=":vtoken" element={<VerificationToken />} />
                <Route path="" element={<AccountVerification />} />
              </Route>
              <Route path="recovery" element={<Outlet />}>
                <Route path=":rtoken" element={<RecoveryToken />} />
                <Route path="" element={<AccountRecovery />} />
              </Route>
              <Route path="passwordreset" element={<PasswordReset />} />
            </Routes>
          </LoginChecker>
        </Router>
      </UserContextProvider>
    );
  }
}

export default App;
