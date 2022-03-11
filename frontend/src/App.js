import { useState } from 'react';
import { ToastContainer } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Donate from './components/Donate';
import Header from './components/Header'
import Home from './components/Home';
import Login from './components/Login';
import Partners from './components/Partners';
import { AuthContext } from './context/authContext';

function App() {

  const [user, setUser] = useState({
    first_name: "Denver",
    last_name: "Allam",
    email: "test@test.com",
    role: "Admin"
  })

  return (
    <div>
      <Router>
        <Header />
        <AuthContext.Provider value={user}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/partners-and-volunteers" element={<Partners />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthContext.Provider>
      </Router>

    </div>
  );
}

export default App;
