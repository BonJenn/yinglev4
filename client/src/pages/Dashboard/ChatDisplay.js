import Chat from './Chat';
import ChatInput from './ChatInput';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './ChatDisplay.module.css'; // Import the CSS module

const ChatDisplay = ({ user, clickedUser }) => {
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;
    const [allMessages, setAllMessages] = useState([]); // Use this state to maintain all messages

    const fetchMessages = async () => {
        try {
            const [usersResponse, clickedUsersResponse] = await Promise.all([
                axios.get('http://localhost:8000/messages', {
                    params: { userId: userId, correspondingUserId: clickedUserId },
                }),
                axios.get('http://localhost:8000/messages', {
                    params: { userId: clickedUserId, correspondingUserId: userId },
                }),
            ]);

            const mergedMessages = [...usersResponse.data, ...clickedUsersResponse.data];
            const sortedMessages = mergedMessages.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
            setAllMessages(sortedMessages.map(message => ({
                name: message.from_userId === userId ? user?.first_name : clickedUser?.first_name,
                img: message.from_userId === userId ? user?.url : clickedUser?.url,
                message: message.message,
                timestamp: message.timestamp,
            })));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [userId, clickedUserId]); // Now it depends on userId and clickedUserId to re-fetch messages when they change

    // This function is passed to ChatInput to allow optimistic UI updates
    const updateChatDisplayWithNewMessage = (optimisticMessage) => {
        setAllMessages(prevMessages => [...prevMessages, optimisticMessage].sort((a,b) => a.timestamp.localeCompare(b.timestamp)));
    };

    return (
        <div className={styles.chatDisplay}>
            <Chat descendingOrderMessages={allMessages} />
            <ChatInput
                user={user}
                clickedUser={clickedUser}
                updateChatDisplayWithNewMessage={updateChatDisplayWithNewMessage}
            />
        </div>
    );
};

export default ChatDisplay;
