import Nav from '../../components/Nav'
import Hero from './Hero'
import Hero_Quotes from './Hero_Quotes'
import Footer from '../../components/Footer'
import AuthModal from "../../components/AuthModal"
import styles from './Home.module.css'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import homeImage from '../../images/yingle_home_image.jpeg'

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
                    <div className={styles.home_filler_img}>
                        <img src={homeImage} alt="Yingle home image" />

                    </div>
                </div>
             
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