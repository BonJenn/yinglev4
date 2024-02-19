import whiteLogo from '../images/yingle-logo-white.png'
import colorLogo from '../images/yingle-logo-color.png'

const Nav = ({minimal, setShowModal, showModal, setIsSignUp, authToken }) => {

    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }


    return (
        <nav>
            <div className = "logo-container"> 
                {/* <img className="logo" src={minimal ? colorLogo : whiteLogo }/> */}
                <h1 className={minimal ? 'logo-gradient' : 'logo'}>yingle</h1> 
                
                
            </div>

            {!authToken && !minimal && <button 
            className="nav-button"
            onClick={handleClick}
            disabled={showModal}
            >Log in</button>}
        </nav>
    )
}
export default Nav