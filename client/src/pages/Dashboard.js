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

      } catch (error) {
        console.log(error)
      }
    }





    useEffect(() => {
      if (user) {
        getGenderedUsers()
      }
    }, [user])

    useEffect(() => {
      getUser()
    }, [])

    console.log('user', user)
    console.log('gendered-users', genderedUsers )

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

    

      
   
        
      
        const swiped = (direction, swipedUser) => {
          
          if(direction === 'right') {
            updateMatches(swipedUser)
          }
          setLastDirection(direction)
        }
      
        const outOfFrame = (name) => {
          console.log(name + ' left the screen!')
        }
      
        return (
          <>
          { user &&

            <div className="dashboard">
                
                 <ChatContainer user={user}/>
     
       
                <div className="swipe-container">
                    <div className='card-container'>
                        
                        {genderedUsers?.map((genderedUser) =>
                            <TinderCard className='swipe' 
                            key={genderedUser.first_name} onSwipe={(dir) => swiped(dir, genderedUser.name)} 
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
