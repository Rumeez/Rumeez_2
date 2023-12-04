import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user-context';
import { Input, InputGroup, InputGroupText, Container, Row, Col, Card, CardBody, Button } from 'reactstrap';

const Search: React.FC = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const context = useContext(UserContext);
  const handleSearchClick = () => {
    const searchQuery = { name: searchValue };

    fetch('http://localhost:8000/search', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchQuery),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setSearchResults(data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    setSearchValue('');
  };

  const handleRoomTogetherClick = (userData: any) => {
    const userId = context.user.userId;
  };

  return (
    <div>
      <div>
        <> </>
        <> </>
      </div>

      <InputGroup size="mg">
        <InputGroupText>
          <button onClick={handleSearchClick}>Search</button>
        </InputGroupText>
        <Input
          placeholder="Search by Name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>

      {/* Display search results */}
      <Container className="mt-4">
        {searchResults.map((userData, index) => (
          <Row key={index}>
            <Col>
              <Card>
                <CardBody>
                  <p><strong>First Name:</strong> {userData.firstname}</p>
                  <p><strong>Last Name:</strong> {userData.lastname}</p>
                  <p><strong>Gender:</strong> {userData.gender}</p>
                  <p><strong>Year:</strong> {userData.year}</p>
                  <p><strong>Major:</strong> {userData.major}</p>
                  <p><strong>About Me:</strong> {userData.bio}</p>

                 
                  <h4>Preferences</h4>
                  <ul>
                    <li><strong>Dorm Type:</strong> {userData.preferences.dormType}</li>
                    <li><strong>Number of Roommates:</strong> {userData.preferences.numberOfRoommates}</li>
                    <li><strong>Gender of Roommate:</strong> {userData.preferences.genderOfRoomate}</li>
                    <li><strong>Smoking:</strong> {userData.preferences.smoking ? 'Yes' : 'No'}</li>
                    <li><strong>Drinking:</strong> {userData.preferences.drinking ? 'Yes' : 'No'}</li>
                    <li><strong>Rise Time:</strong> {userData.preferences.riseTime}</li>
                    <li><strong>Sleep Time:</strong> {userData.preferences.sleepTime}</li>
                    <li><strong>Temperature:</strong> {userData.preferences.temp}</li>
                  </ul>
                  <div>
                    <Button color="success" size="lg" onClick={() => handleRoomTogetherClick(userData)}>
                      Room Together
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default Search;
export {};
