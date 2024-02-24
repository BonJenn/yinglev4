import { useState } from 'react';
import axios from 'axios';
import styles from './ChatDisplay.module.css';

const ChatInput = ({ user, clickedUser, updateChatDisplayWithNewMessage }) => {
    const [textArea, setTextArea] = useState("");
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;

    const addMessage = async () => {
        const optimisticMessage = {
            name: user?.first_name,
            img: user?.url,
            message: textArea,
            timestamp: new Date().toISOString(),
        };

        // Optimistically update the UI
        updateChatDisplayWithNewMessage(optimisticMessage);

        try {
            await axios.post('http://localhost:8000/message', {
                from_userId: userId,
                to_userId: clickedUserId,
                message: textArea,
                timestamp: optimisticMessage.timestamp,
            });
            // No need to fetch all messages again if we are optimistically updating the UI
        } catch (error) {
            console.log(error);
            // Optionally handle failed message submission, e.g., by notifying the user
        } finally {
            setTextArea("");
        }
    };

    return (
        <div className={styles.chatInput}>
            <textarea 
                className={styles.textArea} 
                value={textArea} 
                onChange={(e) => setTextArea(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        addMessage();
                    }
                }}
                placeholder="Type a message..."
            ></textarea>
            <button className={styles.secondaryButton} onClick={addMessage}>Submit</button>
        </div>
    );
};

export default ChatInput;
