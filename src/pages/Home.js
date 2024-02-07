import Nav from '../components/Nav';


const Home = () => {

    const authToken = true

    const handleClick = ()=> {
        console.log('clicked')
    }


    return (
        <>
        <Nav minimal={false}/>
        <div className="home">
            <h1>The World's Most Sought-After Singles</h1>
            <button className ="primary-button" onClick={handleClick}>
                {authToken ? 'Signout' : 'Create Account'}
            </button>
        </div>
        </>
    )
}
export default Home