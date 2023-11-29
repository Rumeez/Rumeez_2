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
  Button
} from "reactstrap";
import { UserContext } from "../context/user-context";

const Login: React.FunctionComponent = (): JSX.Element => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

<<<<<<< HEAD
=======
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Handle the response data as needed
      console.log('Login successful:', data);

      // Update the context with the user information
      context.updateState({
        user: {
          isloggedin: true,
          firstname: data.firstname, // Adjust according to the actual response structure
          lastname: data.lastname,   // Adjust according to the actual response structure
          email: email,
        },
      });
    } catch (error) {
      console.error('Error during login:', error);
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
        </CardBody>
      </Card>
      <p>Logged in guy: {context.user.firstname ? context.user.firstname : ""}</p>
    </div>
  );
};

>>>>>>> 1c6d0b8 (Basic Login, Home, and App.tsx changed BroswerRouter to Router)
export default Login;
