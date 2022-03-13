import { useContext, useState, useEffect, useLayoutEffect, Fragment } from 'react';
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
import UpdateBlogForm from './Admin/Blog/UpdateBlogForm';
import AdminBlog from './Admin/Blog/Blogs';
import Dashboard from './Admin/Dashboard/Dashboard';

const ScrollToTop = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

const NavBar = ({ children }) => {
    const location = useLocation()
    return (
        <>
            {
                location.pathname.includes('admin')
                    ?
                    <>
                        <Dashboard>
                            {children}
                        </Dashboard>

                    </>
                    :
                    <>
                        <Header />
                        {children}
                        <Footer />
                    </>
            }

        </>
    )
}

const App = () => {


    const { user } = useContext(AuthContext)


    return (
        <Router style={{ minHeight: "100vh" }}>
            <div >
                <ScrollToTop>
                    <NavBar>
                        <PostContextProvider>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/blog" element={<Blogs />} />
                                <Route path="/blog/:id" element={<Content />} />
                                <Route path="/admin/blog" element={<AdminBlog />} />
                                <Route path="/admin/blog/new" element={<CreateBlogForm />} />
                                <Route path="/admin/blog/edit/:id" element={<UpdateBlogForm />} />
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
                        <Routes>
                        </Routes>
                    </NavBar>
                </ScrollToTop>
            </div>
        </Router>
    )
}

export default App;
