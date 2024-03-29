import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import style from './MatchesDisplay.module.css';

const MatchesDisplay = ({ setClickedUser }) => {
    const [potentialMatches, setPotentialMatches] = useState([]);
    const [cookies] = useCookies(['UserId']);
    const userId = cookies.UserId; // Assuming you store the user's ID in a cookie named 'UserId'

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/users/matches`, {
                    params: { userId }
                });
                setPotentialMatches(response.data); // Assuming potentialMatches should be renamed to something like matchedUsers
            } catch (error) {
                console.error("Error fetching matches:", error);
            }
        };
        const intervalId = setInterval(fetchMatches, 100); // Poll every 5000 milliseconds (5 seconds)

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [userId]);
    
    

    return (
        <div className={style.matchesDisplay}>
            {potentialMatches.length > 0 ? (
                potentialMatches.map((match, index) => (
                    <div key={index} className={style.matchCard} onClick={() => setClickedUser(match)}>
                        <div className={style.imgContainer}>
                            <img src={match.url} alt={`${match.first_name} profile`} />
                        </div>
                        <h3>{match.first_name}</h3>
                    </div>
                ))
            ) : (
                <p>No potential matches found.</p>
            )}
        </div>
    );
};

export default MatchesDisplay;
