import React from 'react';
import TinderCard from 'react-tinder-card';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'


const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers ] = useState([])
    const [lastDirection, setLastDirection] = useState()
    const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
    const [shuffledUsers, setShuffledUsers] = useState([]);


    const userId = cookies['UserId']

    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user', {
          params: { userId }
        })
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }


    const getGenderedUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/gendered-users', {
          params: { gender: user?.gender_interest}
        })
        setGenderedUsers(response.data)
        const matchedUserIds = user?.matches || [];
        const filtered = response.data.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id));
        setShuffledUsers(shuffleArray(filtered));

      } catch (error) {
        console.log(error)
      }
    }





    useEffect(() => {
      getUser()
      
    }, [])

    useEffect(() => {
    if (user && shuffledUsers.length === 0) {
      getGenderedUsers()
    }
    }, [user, shuffledUsers.length])
      


  
    const updateMatches = async (matchedUserId) => {
      try {
        await axios.put('http://localhost:8000/addmatch', {
          userId,
          matchedUserId
        })
        getUser()
      } catch (error) {
        console.log(error)
      }
    }

    console.log(user)

    

      
   
        
      
        const swiped = (direction, swipedUserId) => {
          
          if(direction === 'right') {
            updateMatches(swipedUserId)
          }
          setLastDirection(direction)
        }
      
        const outOfFrame = (name) => {
          console.log(name + ' left the screen!')
        }

        const matchedUserIds = user?.matches || [];

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
            return array;
        }

        
      
        return (
          <>
          { user &&

            <div className="dashboard">
                
                 <ChatContainer user={user}/>
     
       
                <div className="swipe-container">
                    <div className='card-container'>
                        
                        {shuffledUsers?.map((genderedUser) =>
                            <TinderCard className='swipe' 
                            key={genderedUser.user_id} onSwipe={(dir) => swiped(dir, genderedUser.user_id)} 
                            onCardLeftScreen={() => outOfFrame(genderedUser.user_id)}>
                            <div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }} 
                            className='card'>
                            <h3>{genderedUser.first_name}</h3>
                            </div>
                            </TinderCard>
                        )}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                        
                    </div>
                </div> 
            </div>}
            </>
        )
      }


export default Dashboard;
