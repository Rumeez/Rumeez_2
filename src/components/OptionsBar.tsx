
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

const OptionsBarA: React.FunctionComponent = (): JSX.Element => {
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
            
            {/***********************************************************************************/}
            
            {/*---------------------------------------------------------------------------------*/}
          </Nav>
          {!context.user.isLoggedIn ?
            <div>
              <Nav>
                <NavItem>
                  <NavLink onClick={()=>navigate("/signup")}>Sign up</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={()=>setModal(!modal)}>Login</NavLink>
                </NavItem>
              </Nav>
            </div>
            :
            <Nav>
              <NavItem>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </NavItem>
            </Nav>
          }
        </Collapse>
        <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
          <Login setModal={setModal}/>
        </Modal>
      </Navbar>
    </div>
  );
}

export default OptionsBarA;