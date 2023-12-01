import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';

const Home: React.FunctionComponent = (): JSX.Element => {
  const [data, setData] = useState<any>(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const context = useContext(UserContext);
  console.log(context.user.firstName);
  console.log(context.user.userId?.toString());
  const [responseText, setResText] = useState<string>()

  useEffect(() => {
    const backendUrl = 'http://localhost:8000/look';

    const fetchData = async () => {
      try {
        const response = await fetch(backendUrl, { credentials: 'include' });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const userScores = await response.json();
        setData(userScores);

        const userIds = Object.keys(userScores || {});
        const userId = userIds[currentUserIndex];
        const userResponse = await fetch(`http://localhost:8000/look/getuser/${userId}`, { credentials: 'include' });

        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        setCurrentUserData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);

        // Redirect to localhost:3000/ if not logged in
        if (!context.user.isLoggedIn) {
          navigate('/');
        }
      }
    };

    fetchData();
  }, [context, navigate, currentUserIndex]);

  const handleAction = async (actionType: 'like' | 'skip') => {
    if (loading) return; // Do nothing if the previous action is still in progress
    setLoading(true); // Set loading to true to prevent multiple actions

    try {
      const userIds = Object.keys(data || {});
      const userId = context.user.userId;
      const userToActionId = userIds[currentUserIndex];
      const actionUrl = `http://localhost:8000/look/${actionType}/${userId}/${userToActionId}`;

      const response = await fetch(actionUrl, { method: 'POST', credentials: 'include' });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Check if both users have liked each other
      const loggedInUser = await fetch(`http://localhost:8000/look/getuser/${userId}`, { credentials: 'include' });
      const loggedInUserData = await loggedInUser.json();

      const userToAction = await fetch(`http://localhost:8000/look/getuser/${userToActionId}`, { credentials: 'include' });
      const userToActionData = await userToAction.json();

      if (
        loggedInUserData.usersLiked.includes(userToActionId) &&
        userToActionData.usersLiked.includes(userId)
      ) {
        // If both users have liked each other, show a matched popup
        const data = {
            chatName: "NewChat",
        };
        try {
          const response = await fetch('http://localhost:8000/chat/create', {
              credentials: 'include',
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            });
            if(!response.ok)
            {
                throw new Error('Network response was not ok');
            }
            response.text().then(async responseT => {
              const chatId = JSON.parse(responseT);
              console.log("this should be the ne chatid");
              console.log(chatId);
              const user1Data = {
                  chatId: chatId,
                  userId: userId,
              };
              console.log(user1Data);
              try {
                const response = await fetch('http://localhost:8000/chat/join', {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user1Data)
                  });
                  if(!response.ok)
                  {
                      throw new Error('Network response was not ok');
                  }
              } catch (error) {
                  console.error('Error:', error);
              }
              
              const user2Data = {
                chatId: chatId,
                userId: userToActionId,
              };
              try {
                const response = await fetch('http://localhost:8000/chat/join', {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user2Data)
                  });
                  if(!response.ok)
                  {
                      throw new Error('Network response was not ok');
                  }
              } catch (error) {
                  console.error('Error:', error);
              }

            }).catch(error => {
              console.error('Error:', error);
            });
        } catch (error) {
            console.error('Error:', error);
        }

        alert('Matched!'); // You can replace this with a more sophisticated popup logic
      }

      // After like/skip, move to the next user
      setCurrentUserIndex((prevIndex) => (prevIndex + 1) % userIds.length);
    } catch (error) {
      console.error(`Error during ${actionType}:`, error);
    } finally {
      setLoading(false); // Reset loading to false after the action is completed
    }
  };

  return (
    <div style={{ backgroundColor: '#87CEEB', height: '100vh' }}>
      <Container className="mt-4" style={{ backgroundColor: '#FFD700', padding: '20px', borderRadius: '10px' }}>
        {data && currentUserData && (
          <Card>
            <CardBody>
              <Row className="mb-4">
                <Col>
                  <h3>User Details</h3>
                  <p><strong>First Name:</strong> {currentUserData.firstname}</p>
                  <p><strong>Last Name:</strong> {currentUserData.lastname}</p>
                  <p><strong>Gender:</strong> {currentUserData.gender}</p>
                  <p><strong>Year:</strong> {currentUserData.year}</p>
                  <p><strong>Major:</strong> {currentUserData.major}</p>
                  <p><strong>About Me:</strong> {currentUserData.bio}</p>
                  <p><strong>Compatibility Score:</strong> {((data[Object.keys(data)[currentUserIndex]] || 0) * 100).toFixed(2)}%</p>
                </Col>
                <Col>
                  <h3>Preferences</h3>
                  <ul>
                    <li><strong>Dorm Type:</strong> {currentUserData.preferences.dormType}</li>
                    <li><strong>Number of Roommates:</strong> {currentUserData.preferences.numberOfRoommates}</li>
                    <li><strong>Gender of Roommate:</strong> {currentUserData.preferences.genderOfRoomate}</li>
                    <li><strong>Smoking:</strong> {currentUserData.preferences.smoking ? 'Yes' : 'No'}</li>
                    <li><strong>Drinking:</strong> {currentUserData.preferences.drinking ? 'Yes' : 'No'}</li>
                    <li><strong>Rise Time:</strong> {currentUserData.preferences.riseTime}</li>
                    <li><strong>Sleep Time:</strong> {currentUserData.preferences.sleepTime}</li>
                    <li><strong>Temperature:</strong> {currentUserData.preferences.temp}</li>
                    {/* Add more preferences as needed */}
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button color="success" size="lg" onClick={() => handleAction('like')} className="me-2">
                    Room Together
                  </Button>
                  <Button color="primary" size="lg" onClick={() => handleAction('skip')}>
                    Next
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )}
      </Container>
    </div>
  );

};

export default Home;
