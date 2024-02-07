import logo from '../images/yingle-logo-white.png'
import colorLogo from '../images/yingle-logo-color.png'

const Nav = ({minimal}) => {



    return (
        <nav>
            <div className = "logo-container"> 
                <img className="logo" src={minimal ? colorLogo : logo }/>
                
                
            </div>
        </nav>
    )
}
export default Nav