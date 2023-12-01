import React, { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'
import { Button } from "reactstrap"
import { useNavigate } from 'react-router-dom';

const Chats: React.FunctionComponent = (): JSX.Element => {
  const [chats, setChats] = useState([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatNames, setNames] = useState<string[]>([]);
  const [userEmail, setEmail] = useState<string>()
  const navigate = useNavigate();

  useEffect(() => 
  {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
    fetch('http://localhost:8000/user', {
    credentials: 'include' // Ensures cookies are included with the request
    })
    .then(response =>
      {
        if(!response.ok)
        {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
          const userChats = data.chats;
          setChats(userChats);
          setEmail(data.email);
      })
      .catch(error => console.error('Fetch error', error));

      return () => {
        if (newSocket) newSocket.close();
      };
    }, []);

  useEffect(() => {
    const fetchChatNames = async () => {
        try {
            const namesArray = [];

            for (const chatId of chats) {
                const response = await fetch(`http://localhost:8000/chat/get/${chatId}`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                  console.log(chatId)
                  throw new Error('Network response was not ok');
                }

                const chatData = await response.json();
                namesArray.push(chatData.chatName); // Assuming 'name' is the property in the response
            }

            // namesArray now contains the names corresponding to each chatId
            setNames(namesArray);

        } catch (error) {
            console.error('Fetch error', error);
        }
    };

    if (chats.length > 0) {
        fetchChatNames();
    }
  }, [chats]); // Re-run when chats array changes

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  }
  return <div>
    <h1 style={{ textAlign: "center" }}>Chats</h1>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" }}>
      {chats.map((id, index) => (
        <Button 
          key={index} 
          style={{ 
            backgroundColor: 'lightblue', // Alternate colors
            color: 'black', // Text color for readability
            width: '60%' // Set a specific width for uniformity
          }} 
          onClick={() => handleChatClick(id)}
        >
          Chat: {chatNames[index]}
        </Button>
      ))}
    </div>
  </div>
};


export default Chats;