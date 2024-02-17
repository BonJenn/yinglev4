import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Hero_Quotes from '../components/Hero_Quotes'
import Footer from '../components/Footer'
import AuthModal from "../components/AuthModal"
import { useState } from 'react'

const Home = () => {

    const [ showModal, setShowModal ] = useState(false)
    const [ isSignUp, setIsSignUp ] = useState(true)

    const authToken = false

    const handleClick = ()=> {
        console.log('clicked')
        setShowModal(true)
        setIsSignUp(true)
    }


    return (
        <div className={`overlay ${showModal ? 'active' : ''}`}>
            <Nav minimal={false} 
     
            setShowModal={ setShowModal } 
            showModal={showModal}
            setIsSignUp={ setIsSignUp }/>
            
            <div className="home">
                <h1 className="primary-title">The World's Most Sought-After Singles</h1>
                <button className ="primary-button" onClick={handleClick}>
                    {authToken ? 'Signout' : 'Create Account'}
                </button>

                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}

               
            </div>
            <Hero/>
            <Hero_Quotes/>
            <Footer/>
        </div>
    )
}
export default Home