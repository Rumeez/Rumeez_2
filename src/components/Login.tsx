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
    alert("Email: " + email + "\nPassword: " + password);
    context.updateState({user: {isloggedin: true, firstname: "John", lastname: "Wick", email: email}});
  }

  return <div className='d-flex justify-content-center'>
    <Card color="dark" outline style={{width: '36rem'}}>
      <CardHeader>
        Rumeez Account Login
      </CardHeader>
      <CardBody>
        <CardTitle tag="h5">
          Login Form
        </CardTitle>
        <Form onSubmit={handleSumbit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" placeholder="jwick@continental.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" placeholder="babayaga" 
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }} />
          </FormGroup>
          <Button type="submit" value="submit" color="primary">
                Login
          </Button>
        </Form>
      </CardBody>
    </Card>
    <p>Logged in guy: {context.user.firstname ? context.user.firstname : ""}</p>
  </div>
}

export default Login;
