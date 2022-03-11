import { useContext, useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Donate from './components/Donate';
import Header from './components/Header'
import Home from './components/Home';
import Login from './components/Login';
import Partners from './components/Partners';
import AuthContext from './context/authContext';
import { PostContextProvider } from './context/postContext';

function App() {

  const [user, setUser] = useState({
    first_name: "Denver",
    last_name: "Allam",
    email: "test@test.com",
    role: "Admin"
  })

  const { isLoggedIn, onLogin, onLogout } = useContext(AuthContext)

  return (
    <div>
      <Router>
        <Header />
        {
          isLoggedIn ?
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog" element={
                  <PostContextProvider>
                    <Blogs />
                  </PostContextProvider>
                } />

              </Routes>
            </>
            :
            <>
              <h1>Login</h1>
              <button onClick={() => onLogin()}>Login</button>
            </>
        }
      </Router>

    </div>
  );
}

export default App;
