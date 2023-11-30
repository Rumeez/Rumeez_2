import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

const User: React.FC = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    bio: '',
    gender: '',
    year: '',
    major: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState(initialFormData);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user information from localStorage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('userFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle form submission logic here

    // Save the updated form data to local storage
    localStorage.setItem('userFormData', JSON.stringify(formData));

    // Check if the user has come from the Signup component
    if (location.state && location.state.fromSignup) {
      navigate('/preference'); // Navigate to Preference only if fromSignup is true
    } else {
      // Handle navigation or logic for other scenarios
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="6">
          <div className="user-info-container">
            <h1>User Information</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="firstName">First Name:</Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name:</Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="bio">Bio:</Label>
                <Input
                  type="textarea"
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="gender">Gender:</Label>
                <Input
                  type="select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="year">Year:</Label>
                <Input
                  type="text"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="major">Major:</Label>
                <Input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default User;
