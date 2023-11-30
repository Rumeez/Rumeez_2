import React, { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'
import { Button } from "reactstrap"
import { useParams } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

const Chat: React.FunctionComponent = (): JSX.Element => {
    const { chatId } = useParams();
    const [userEmail, setUserEmail] = useState();
    const [messages, setMessages] = useState([[]])
    const [chatName, setName] = useState<string>();
    const [showRenameField, setShowRenameField] = useState(false);
    const [newChatName, setNewChatName] = useState('');
    useEffect(() => {
        const fetchMessages = () => {
            fetch(`http://localhost:8000/chat/get/${chatId}`, {
                credentials: 'include' // Ensures cookies are included with the request
            })
            .then(response => response.json())
            .then(data => {
                setMessages(data.messages);
                setName(data.chatName);
            })
            .catch(error => console.error('Fetch error', error));
        };

        fetchMessages();

        const intervalId = setInterval(fetchMessages, 300);

        return () => clearInterval(intervalId);
    }, [chatId]);

    useEffect(() => {
        fetch(`http://localhost:8000/user`, {
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
            setUserEmail(data.email);
        })
        .catch(error => console.error('Fetch error', error));
    }, []); 

    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = async () => {
          const data = {
            userEmail: userEmail,
            chatId: chatId,
            message: inputMessage,
        };
        try {
            const response = await fetch('http://localhost:8000/chat/send', {
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

        } catch (error) {
            console.error('Error:', error);
        }
        setInputMessage(''); // Clear the input field after sending
    };
    
    const handleRenameChat = async () => {
        const data = {
            newName: newChatName,
        };
        try {
            const response = await fetch(`http://localhost:8000/chat/rename/${chatId}`, {
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

        } catch (error) {
            console.error('Error:', error);
        }
        setNewChatName('');
    };
  return <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginRight: '20px', marginLeft: '20px' }}>
        <h2 style={{
      textAlign: 'center',
      marginTop: '20px'
    }}>
        {chatName}:
    </h2>
      <button onClick={() => setShowRenameField(!showRenameField)}>Rename Chat</button>
    </div>
    {showRenameField && (
      <div style={{ textAlign: 'right', marginRight: '20px' }}>
        <input
          type="text"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          placeholder="New chat name"
        />
        <button onClick={handleRenameChat}>Submit</button>
      </div>
    )}
        <div style={{
      paddingBottom: '60px',  // Adjust according to the height of your text box
      maxHeight: 'calc(100vh - 60px)',  // Adjust for viewport height minus text box height
      overflowY: 'auto'
    }}>
      {messages.map(([email, message], index) => (
        <Card 
          key={index} 
          style={{ 
            maxWidth: '60%', 
            margin: '10px auto', 
            textAlign: email === userEmail ? 'left' : 'right',
            backgroundColor: email === userEmail ? 'lightblue' : 'yellow',
            float: email === userEmail ? 'left' : 'right',
            clear: 'both' 
          }}
        >
          <CardBody>
            <p><strong>{email}:</strong> {message}</p>
          </CardBody>
        </Card>
      ))}
      <div style={{ position: 'fixed', bottom: 0, width: '100%', padding: '10px' }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter message here"
          style={{ width: '80%' }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      </div>
    </div>
}

export default Chat;