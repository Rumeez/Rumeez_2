import React, { useState } from 'react';
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

const Preference: React.FC = () => {
  const [formData, setFormData] = useState({
    dormType: '',
    roommateGender: '',
    smoking: '',
    drinking: '',
    risetime: '',
    sleeptime: '',
    temperature: '',
  });

  const [originalFormData] = useState({ ...formData }); // Store the original form data

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the form data has changed
    const formDataChanged = JSON.stringify(formData) !== JSON.stringify(originalFormData);

    if (formDataChanged) {
      // The form data has changed, add your logic to handle the preferences submission here
      // You can send the formData to your backend or perform any other actions

      // Optionally, you can update the originalFormData to the new formData
      // originalFormData will now contain the latest form data for future comparisons
      // originalFormData = { ...formData };
    } else {
      // The form data has not changed, you can display a message or handle it as needed
      alert('No changes made. Nothing to save.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm="6">
          <div className="preference-container">
            <h1>Set Your Preferences</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="dormType">Dorm Type:</Label>
                <Input
                  type="select"
                  id="dormType"
                  name="dormType"
                  value={formData.dormType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select dorm type
                  </option>
                  <option value="plazadouble">Plaza Double</option>
                  <option value="plazatriple">Plaza Triple</option>
                  <option value="plazadoubleprivbath">Plaza Double Priv Bath</option>
                  <option value="plazatripleprivbath">Plaza Triple Priv Bath</option>
                  <option value="deluxedouble">Deluxe Triple</option>
                  <option value="deluxetriple">Deluxe Triple</option>
                  <option value="classicdouble">Classic Double</option>
                  <option value="classictriple">Classic Triple</option>
                  <option value="universityapartments">University Apartments</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="roommateGender">Roommate Gender:</Label>
                <Input
                  type="select"
                  id="roommateGender"
                  name="roommateGender"
                  value={formData.roommateGender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select roommate gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="nonbinary">Nonbinary</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="smoking">Smoking:</Label>
                <Input
                  type="select"
                  id="smoking"
                  name="smoking"
                  value={formData.smoking}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select smoking preference
                  </option>
                  <option value="often">Often</option>
                  <option value="never">Never</option>
                  <option value="sometimes">Sometimes/Ask me</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="drinking">Drinking:</Label>
                <Input
                  type="select"
                  id="drinking"
                  name="drinking"
                  value={formData.drinking}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select drinking preference
                  </option>
                  <option value="often">Often</option>
                  <option value="never">Never</option>
                  <option value="sometimes">Sometimes/Ask me</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="temperature">Temperature:</Label>
                <Input
                  type="select"
                  id="temperature"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select temperature preference
                  </option>
                  <option value="warm">Warm (76-79°F)</option>
                  <option value="medium">Medium (72-75°F)</option>
                  <option value="cold">Cold (68-71°F)</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="risetime">Rise Time:</Label>
                <Input
                  type="select"
                  id="risetime"
                  name="risetime"
                  value={formData.risetime}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select rise time preference
                  </option>
                  <option value="5">5 am</option>
                  <option value="6">6 am</option>
                  <option value="7">7 am</option>
                  <option value="8">8 am</option>
                  <option value="9">9 am</option>
                  <option value="10">10 am</option>
                  <option value="11">11 am</option>
                  <option value="12">12 pm</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="sleeptime">Sleep Time:</Label>
                <Input
                  type="select"
                  id="sleeptime"
                  name="sleeptime"
                  value={formData.sleeptime}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select sleep time preference
                  </option>
                  <option value="5">5 am</option>
                  <option value="8">8 pm</option>
                  <option value="9">9 pm</option>
                  <option value="10">10 pm</option>
                  <option value="11">11 pm</option>
                  <option value="12">12 am</option>
                  <option value="1">1 am</option>
                  <option value="2">2 am</option>
                  <option value="3">3 am</option>
                </Input>
              </FormGroup>
              <Button color="primary" type="submit">
                Save Preferences
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Preference;




