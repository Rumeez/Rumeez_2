
import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import { UserContext } from "../context/user-context";

const OptionsBar: React.FunctionComponent = (): JSX.Element => {
  const context = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light={true} full={false} expand="md" container="fluid">
        <NavbarBrand href="/">Rumeez</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/home">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user">Preferences</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/chat">Chats</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                User
              </DropdownToggle>
              <DropdownMenu left>
                <DropdownItem>Update preferences</DropdownItem>
                <DropdownItem>Password reset</DropdownItem>
                <DropdownItem>Account verification</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {!context.user.isloggedin ?
            <div>
              <Nav>
                <NavItem>
                  <NavLink href="/signup">Sign up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              </Nav>
            </div>
            :
            <Nav>
              <NavItem>
                <NavLink href="/logout">Logout</NavLink>
              </NavItem>
            </Nav>
          }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default OptionsBar;