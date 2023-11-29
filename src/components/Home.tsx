import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { UserContext } from '../context/user-context';

const Home: React.FunctionComponent = (): JSX.Element => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();  // useNavigate instead of useHistory
  const context = useContext(UserContext);

  useEffect(() => {
    const backendUrl = 'http://localhost:8000/look';

    axios.get(backendUrl)
      .then((response) => {
        const userScores = response.data;

        for (const userId in userScores) {
          axios.get(`/getuser/${userId}`)
            .then((userResponse) => {
              const userData = userResponse.data;
              console.log(`User ID: ${userId}, User Data:`, userData);
            })
            .catch((userError) => {
              console.error(`Error fetching user ID ${userId} data:`, userError);
            });
        }

        setData(userScores);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);

        // Redirect to localhost:3000/ if not logged in
        if (!context.user.isloggedin) {
          navigate('/');
        }
      });
  }, [context, navigate]);

  return <div>
    <p>Home</p>
  </div>
}

export default Home;
