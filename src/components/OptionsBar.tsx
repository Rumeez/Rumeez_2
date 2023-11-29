
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
} from 'reactstrap';
import { UserContext } from "../context/user-context";
import { Link, useNavigate } from 'react-router-dom';
// import Nav from 'react-bootstrap/Nav';

const OptionsBar: React.FunctionComponent = (): JSX.Element => {
  const context = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  return (
    <div>
      <Navbar color="light" light={true} /*full="true"*/ expand="md" container="fluid">
        <NavbarBrand as={Link} to="/">Rumeez</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink onClick={()=>navigate("/home")}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>navigate("/user")} >Preferences</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>navigate("/chats")} >Chats</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                User
              </DropdownToggle>
              <DropdownMenu left="true">
                <DropdownItem>Update preferences</DropdownItem>
                <DropdownItem>Password reset</DropdownItem>
                <DropdownItem>Account verification</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {!context.user.isLoggedIn ?
            <div>
              <Nav>
                <NavItem>
                  <NavLink onClick={()=>navigate("/signup")}>Sign up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={()=>navigate("/login")}>Login</NavLink>
                </NavItem>
              </Nav>
            </div>
            :
            <Nav>
              <NavItem>
                <NavLink onClick={()=>navigate("/logout")}>Logout</NavLink>
              </NavItem>
            </Nav>
          }
        </Collapse>
      </Navbar>
    </div>
  );
}

export default OptionsBar;