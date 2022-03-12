import { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/About/About';
import Contact from './components/Contacts/Contact';
import Donate from './components/Donate/Donate';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import Login from './components/Login';
import Partners from './components/Partners/Partners';
import AuthContext from './context/authContext';
import { PostContextProvider } from './context/postContext';
import './App.css';
import Blogs from './components/Blog/Blogs';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';
import CreateBlogForm from './Admin/Blog/CreateBlogForm';


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
        <>
          <PostContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/:id" element={<Content />} />
              <Route path="/admin/blog/new" element={<CreateBlogForm />} />
            </Routes>
          </PostContextProvider>

          <Routes>
            <Route path="/partners" element={<Partners />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
