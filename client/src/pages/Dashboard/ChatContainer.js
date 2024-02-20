import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import { useState } from 'react'
import styles from './ChatContainer.module.css'

const ChatContainer = ({user}) => {
    const [ clickedUser, setClickedUser ] = useState(null)


  

    return (
        <>
            <ChatHeader user={user}/>
            <div className={styles.chatContainer}> {/* Use the imported styles */}
                

                <div className={styles.chatMatchButtons}>
                    <button className={styles.option} onClick={() => setClickedUser(null)}>Matches</button>
                    <button className={styles.option} disabled={!clickedUser}>Chat</button>
                </div>

            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}

            {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}

            </div>

        </>
    )
}

export default ChatContainer;