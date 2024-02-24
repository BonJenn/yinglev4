import styles from './Chat.module.css'; // Corrected the import statement

const Chat = ({ descendingOrderMessages }) => {
    return (
        <>
            <div className={styles.chatDisplay}> {/* Updated to use module CSS */}
                {descendingOrderMessages.map((message, index) => ( // Removed underscore from index for convention
                    <div key={index} className={styles.messageContainer}> {/* Added a class for styling and corrected key usage */}
                        <div className={styles.chatMessageHeader}> {/* Updated to use module CSS */}
                            <div className={styles.imgContainer}> {/* Updated to use module CSS */}
                                <img src={message.img} alt={`${message.first_name} profile`} className={styles.profileImg}/> {/* Updated to use module CSS */}
                            </div>
                            <p className={styles.chatMessage}>{message.message}</p> {/* Corrected class name and updated to use module CSS */}
                        </div>
                        <p className={styles.chatName}>{message.name}</p> {/* Updated to use module CSS */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Chat;