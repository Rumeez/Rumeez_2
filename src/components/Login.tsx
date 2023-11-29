import React, { useContext, useState } from "react";
import {
  Form,
  Label,
  Input,
  FormGroup,
  CardBody,
  CardTitle,
  Card,
  CardHeader,
  Button,
  CardText,
  CardFooter
} from "reactstrap";
import { UserContext } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface ILoginProps {
  setModal(val: boolean): void;
}

const Login: React.FunctionComponent<ILoginProps> = ({setModal}): JSX.Element => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidLogin, setInvalidLogin] = useState(false);

  const navigate = useNavigate();

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const resource: string = "http://localhost:8000/user/login";
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      const req: RequestInit = {
        headers: headers,
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };

      const response = await fetch(resource, req);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Update the context with the user information
      context.updateState({
        user: {
          isLoggedIn: true,
          firstName: data.firstname, // Adjust according to the actual response structure
          lastName: data.lastname,   // Adjust according to the actual response structure
          email: email,
        },
      });

      navigate('/home');
      setModal(false);
    } catch (error) {
      console.error('Error during login:', error);
      setInvalidLogin(true);
      // Handle the error, e.g., display an error message to the user
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <Card color="dark" outline style={{ width: '36rem' }}>
        <CardHeader>Rumeez Account Login</CardHeader>
        <CardBody>
          <CardTitle tag="h5">Login Form</CardTitle>
          <Form onSubmit={handleSumbit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="jwick@continental.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="babayaga"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        {invalidLogin ? <CardText style={{color: 'red'}}>Invalid username or password!</CardText>: <></>}
        </CardBody>
        <CardFooter><NavLink onClick={()=>setModal(false)} to="/accountrecovery">Forgot password?</NavLink></CardFooter>
      </Card>
      {/* <p>Logged in guy: {context.user.firstName ? context.user.firstName : ""}</p> */}
    </div>
  );
};

export default Login;
