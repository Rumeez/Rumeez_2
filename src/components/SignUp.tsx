import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
  InputGroupText,
} from 'reactstrap';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add your form submission logic here
    // You can send the formData to your backend for processing

    // Redirect to the User component with state indicating the source
    navigate('/user', { state: { fromSignup: true } });

    // Clear the form after submission
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="6">
          <div className="signup-container">
            <h1>Create an Account</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password:</Label>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <InputGroupText>
                    <Input
                      type="checkbox"
                      onChange={handleShowPasswordToggle}
                    />{' '}
                    Show Password
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="confirmPassword">Confirm Password:</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;




