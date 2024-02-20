import { useCookies } from 'react-cookie';
import styles from './ChatHeader.module.css'; // Import the CSS module

const ChatHeader = ({ user }) => {
    // Destructure the useCookies hook to get the cookies object and the removeCookie function
    const [cookies, setCookie, removeCookie] = useCookies(['UserId', 'AuthToken']);

    const logout = () => {
        // Correctly use removeCookie to remove 'UserId' and 'AuthToken'
        removeCookie('UserId');
        removeCookie('AuthToken');
        window.location.reload();
    };

    return (
        <div className={styles.chatHeaderContainer}> {/* Use the style from the CSS Module */}
            
            <div className={styles.profile}> {/* Use the style from the CSS Module */}
                <div className={styles.imgContainer}> {/* Use the style from the CSS Module */}
                    {user && <img src={user.url} alt={"photo of " + user.first_name}/>}
                    <h3>{user && user.first_name}</h3>   
                </div> 
                
            </div> 
            
            <h3 className={styles.logOutIcon} onClick={logout}>Log out</h3> {/* Use the style from the CSS Module */}
        </div>
    );
};

export default ChatHeader;
