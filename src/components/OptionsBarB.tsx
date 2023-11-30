//Menu Bar Post Login 
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
  Modal,
} from 'reactstrap';
import { UserContext } from "../context/user-context";
import { Link, redirect, useNavigate } from 'react-router-dom';
import Login from './Login';
// import Nav from 'react-bootstrap/Nav';

const OptionsBarB: React.FunctionComponent = (): JSX.Element => {
  const context = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(true);
  const [modal, setModal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resource: string = "http://localhost:8000/user/logout";
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      const req: RequestInit = {
        headers: headers,
        method: "GET",
        credentials: "include",
        mode: "cors",
      };

      const response = await fetch(resource, req);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error during logout:', error);
      // Handle the error, e.g., display an error message to the user
    }

    redirect('/');
    navigate(0)
  };

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
            <Nav>
              <NavItem>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </NavItem>
            </Nav>
        </Collapse>
        <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
          <Login setModal={setModal}/>
        </Modal>
      </Navbar>
    </div>
  );
}

export default OptionsBarB;