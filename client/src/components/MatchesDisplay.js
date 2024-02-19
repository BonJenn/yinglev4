import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

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
        if (userId) {
            fetchMatches();
        }
    }, [userId]);
    
    

    return (
        <div className="matches-display">
            {potentialMatches.length > 0 ? (
                potentialMatches.map((match, index) => (
                    <div key={index} className="match-card" onClick={() => setClickedUser(match)}>
                        <div className="img-container">
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
