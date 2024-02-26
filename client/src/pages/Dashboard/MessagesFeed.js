import axios from 'axios';
import { useState, useEffect } from 'react';
import style from './MessagesFeed.module.css';

const MessagesFeed = ({ user }) => {
    const userId = user?.user_id

    const [messagesSample, setMessagesSample] = useState([]);

    const getMessagesSample = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages/sample', {
                params: { userId: userId }
            });
            setMessagesSample(response.data);
            console.log('Response data:', JSON.stringify(response.data, null, 2));
            console.log('Fetching messages for userId:', userId);
            console.log(user)


        } catch (error) {
            console.error('Failed to fetch messages sample:', error);
        }
    };

    useEffect(() => {
        getMessagesSample();
    }, [userId]);

    return (
        <div className={style.messagesFeed}>
            {messagesSample.map((message, index) => (
                <div key={index} className={style.message}>
                    <img 
                        src={message.url} 
                        alt="Profile" 
                        className={style.profilePic} 
                        onError={(e) => e.target.src = 'path/to/default/image.png'}
                    />
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
};

export default MessagesFeed;
