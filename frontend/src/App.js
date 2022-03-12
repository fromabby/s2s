import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

//*contexts
import AuthContext from './context/authContext';
import { PostContextProvider } from './context/postContext';

//*components
import About from './components/About/About';
import Contact from './components/Contacts/Contact';
import Donate from './components/Donate/Donate';
import Header from './components/Header/Header'
import Home from './components/Home/Home';
import Login from './components/Login';
import Partners from './components/Partners/Partners';
import Blogs from './components/Blog/Blogs';
import Footer from './components/Footer/Footer';
import Content from './components/Content/Content';
import CreateBlogForm from './Admin/Blog/CreateBlogForm';
import CommentBox from './components/Comments/CommentBox';
import OtpBox from './components/Comments/OtpBox';

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}


function App() {
    const [user, setUser] = useState({
        first_name: "Denver",
        last_name: "Allam",
        email: "test@test.com",
        role: "Admin"
    })

    //   const { loading } = useSelector(state => state.auth)
    //     // const { dashboard } = useSelector(state => state.dashboard)

    //     useEffect(() => {
    //         store.dispatch(loadUser())
    //     }, [])

    const { isLoggedIn, onLogin, onLogout } = useContext(AuthContext)

    return (
        <Router>
            <div>
                <ScrollToTop>
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
                            <Route path="/comment" element={<CommentBox />} />
                            <Route path="/verify/:slug" element={<OtpBox />} />
                        </Routes>
                    </>
                    <Footer />Î
                    </ScrollToTop>
            </div>
        </Router>
    )
}

export default App;
