import Home from './pages/Home/Home'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie';



const App = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])

  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<Onboarding />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App
