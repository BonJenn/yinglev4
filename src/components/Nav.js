import whiteLogo from '../images/yingle-logo-white.png'
import colorLogo from '../images/yingle-logo-color.png'

const Nav = ({minimal, authToken, setShowModal, showModal }) => {

    const handleClick = () => {
        setShowModal(true)
    }


    return (
        <nav>
            <div className = "logo-container"> 
                <img className="logo" src={minimal ? colorLogo : whiteLogo }/>
                
                
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