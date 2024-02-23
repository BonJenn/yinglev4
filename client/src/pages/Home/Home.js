import Nav from '../../components/Nav'
import Hero from './Hero'
import Hero_Quotes from './Hero_Quotes'
import Home_Images from './Home_Images'
import Footer from '../../components/Footer'
import AuthModal from "../../components/AuthModal"
import styles from './Home.module.css'
import { useState, useEffect, useRef } from 'react' // Modified to import useEffect and useRef
import { useCookies } from 'react-cookie'
import homeImage from '../../images/yingle_home_image.jpeg'
import VanillaTilt from 'vanilla-tilt';

const Home = () => {

    const [ showModal, setShowModal ] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])


    const authToken = cookies.AuthToken

    const handleClick = ()=> {
        if (authToken) {
            removeCookie('UserId', cookies.UserId)
            removeCookie('AuthToken', cookies.AuthToken)
            window.location.reload()
            return
        }

        console.log('clicked')
        setShowModal(true)
        setIsSignUp(true)

        
    }

    const tiltRef = useRef(null); // Added useRef for the image tilt effect

    useEffect(() => {
        // Apply VanillaTilt to the element referenced by tiltRef
        VanillaTilt.init(tiltRef.current, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.5,
        });

        // Correct cleanup function
        return () => {
            if (tiltRef.current) {
                tiltRef.current.vanillaTilt.destroy();
            }
        };
    }, []);


    return (
        <div className={`overlay ${showModal ? 'active' : ''}`}>
            <Nav 
                authToken={authToken}
                minimal={false} 
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}/>
            
            <div className={styles.home}>
                <div className={styles.home_column1}>
                    <h1 className={styles.primaryTitle}>The World's Most Sought-After Singles</h1>
                    <button className={styles['primary-button']} onClick={handleClick}>

                        {authToken ? 'Signout' : 'Create Account'}
                    </button>
                </div>

                <div className={styles.home_column2}>
                    <div className={styles.homeFillerImg}>
                        {/* Added the ref to the img element */}
                        <img ref={tiltRef} src={homeImage} alt="Yingle home image" />

                    </div>
                </div>
             
                {showModal && (
                    <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
                )}

               
            </div>
            <Hero/>
            <Home_Images imageToShow="image1"/>
            <Hero_Quotes/>
            <Home_Images imageToShow="image2"/>
            <Footer/>
        </div>
    )
}
export default Home