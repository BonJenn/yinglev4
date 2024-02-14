import { useCookies } from 'react-cookie';

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
        <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    {user && <img src={user.url} alt={"photo of " + user.first_name}/>}
                </div> 
                <h3>{user && user.first_name}</h3>   
            </div> 
            {/* Fix the onClick event to be properly assigned to an element */}
            <i className="log-out-icon" onClick={logout}>Log out</i>
        </div>
    );
};

export default ChatHeader;
