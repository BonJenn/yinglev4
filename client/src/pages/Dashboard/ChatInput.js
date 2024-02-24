import { useState } from 'react'
import axios from 'axios'
import styles from './ChatDisplay.module.css';

const ChatInput = ({user, clickedUser, getUsersMessages, getClickedUsersMessages}) => {
    const [textArea, setTextArea] = useState("")
    const userId = user?.user_id
    const clickUserId = clickedUser?.user_id

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickUserId,
            message: textArea
        }

        try {
            await axios.post('http://localhost:8000/message', {message})
            getUsersMessages()
            getClickedUsersMessages()
            setTextArea("")
        
        } catch (error) {
            console.log(error)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent the default action to avoid line break in textarea
            addMessage();
        }
    }

    return (
        <div className={styles.chatInput}>
            <textarea 
                className={styles.textArea} 
                value={textArea} 
                onChange={(e) => setTextArea(e.target.value)}
                onKeyPress={handleKeyPress} // Add the onKeyPress event handler here
            />
            <button className={styles.secondaryButton} onClick={addMessage}>Submit</button>
        </div>
    )
}

export default ChatInput;