import React from 'react';
import TinderCard from 'react-tinder-card';
import { useState } from 'react';
import ChatContainer from '../components/ChatContainer'

const Dashboard = () => {
    const characters = [
        {
          name: 'Richard Hendricks',
          url: 'https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg'
        },
        {
          name: 'Erlich Bachman',
          url: 'https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg'
        },
        {
          name: 'Monica Hall',
          url: 'https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg'
        },
        {
          name: 'Jared Dunn',
          url: 'https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg'
        },
        {
          name: 'Dinesh Chugtai',
          url: 'https://upload.wikimedia.org/wikipedia/en/3/3b/SpongeBob_SquarePants_character.svg'
        }
      ]
      
   
        const [lastDirection, setLastDirection] = useState()
      
        const swiped = (direction, nameToDelete) => {
          console.log('removing: ' + nameToDelete)
          setLastDirection(direction)
        }
      
        const outOfFrame = (name) => {
          console.log(name + ' left the screen!')
        }
      
        return (
            <div className="dashboard">
                <ChatContainer/>
     
       
                <div className="swipe-container">
                    <div className='card-container'>
                        
                        {characters.map((character) =>
                            <TinderCard className='swipe' 
                            key={character.name} onSwipe={(dir) => swiped(dir, character.name)} 
                            onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} 
                            className='card'>
                            <h3>{character.name}</h3>
                            </div>
                            </TinderCard>
                        )}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                        
                    </div>
                </div>
            </div>
        )
      }


export default Dashboard;
