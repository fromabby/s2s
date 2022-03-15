import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

//*protected routes
import SuperadminRoutes from './components/routes/SuperadminRoutes'
import AdminRoutes from './components/routes/AdminRoutes'

//*contexts
import AuthContext, { AuthContextProvider } from './context/authContext';
import { PostContextProvider } from './context/postContext';

//*layout components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer';

//*public components
import About from './components/homepage/About';
import Contact from './components/homepage/Contact';
import Donate from './components/homepage/Donate';
import Home from './components/homepage/Home';
import Partners from './components/homepage/Partners';
import PublicBlogList from './components/homepage/PublicBlogList';
import PublicBlogDetails from './components/homepage/PublicBlogDetails';
import OtpBox from './components/homepage/blog/comments/OtpBox'

//*admin components
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import CreateBlogForm from './components/admin/blog/CreateBlogForm';
import UpdateBlogForm from './components/admin/blog/UpdateBlogForm';
import BlogList from './components/admin/blog/BlogList';
import ArchiveBlogList from './components/admin/blog/ArchiveBlogList';

import MyProfile from './components/admin/MyProfile';
import UpdateProfile from './components/admin/UpdateProfile';
import UpdatePassword from './components/admin/UpdatePassword';

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
            {location.pathname.includes('admin') ?
                <Dashboard>{children}</Dashboard> :
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
    const { auth, logout, loadUser } = useContext(AuthContext)

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <Router style={{ minHeight: "100vh" }}>
            <div>
                <ScrollToTop>
                    <AuthContextProvider>
                        <NavBar>
                            <PostContextProvider>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/blog" element={<PublicBlogList />} />
                                    <Route path="/blog/:id" element={<PublicBlogDetails />} />
                                    <Route element={<AdminRoutes />}>
                                        <Route path="/admin/blog" element={<BlogList />} />
                                        <Route path="/admin/blog/archive" element={<ArchiveBlogList />} />
                                        <Route path="/admin/blog/new" element={<CreateBlogForm />} />
                                        <Route path="/admin/blog/edit/:id" element={<UpdateBlogForm />} />
                                    </Route>
                                </Routes>
                            </PostContextProvider>

                            <Routes>
                                <Route element={<AdminRoutes />}>
                                    <Route path="/me" element={<MyProfile />} />
                                    <Route path="/me/update" element={<UpdateProfile />} />
                                    <Route path="/password/update" element={<UpdatePassword />} />
                                </Route>
                            </Routes>

                            {/* <Route element={<SuperadminRoutes />}>
                                    <Route path="/admin/blog/new" element={<CreateBlogForm />} />
                                    <Route path="/admin/blog/edit/:id" element={<UpdateBlogForm />} />
                            </Route> */}

                            <Routes>
                                <Route path="/partners" element={<Partners />} />
                                <Route path="/about-us" element={<About />} />
                                <Route path="/contact-us" element={<Contact />} />
                                <Route path="/donate" element={<Donate />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/verify/:slug" element={<OtpBox />} />
                            </Routes>
                            <Routes>
                            </Routes>
                        </NavBar>
                    </AuthContextProvider>
                </ScrollToTop>
                <button onClick={() => logout()}>logout</button>
            </div>
        </Router >
    )
}

export default App
