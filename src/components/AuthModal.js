const AuthModal = ({setShowModal}) => {

    const handleClick = () => {
        setShowModal(false)

    }
    return (
        <div onClick={handleClick}>x</div>
    )
}
export default AuthModal