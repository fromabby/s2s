import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

//*protected routes
import SuperadminRoutes from './components/routes/SuperadminRoutes'
import AdminRoutes from './components/routes/AdminRoutes'

//*contexts
import AuthContext, { AuthContextProvider } from './context/authContext';
import { PasswordContextProvider } from './context/passwordContext';
import { CommentContextProvider } from './context/commentContext';
import { PostContextProvider } from './context/postContext';
import { AboutContextProvider } from './context/aboutContext';
import { BannerContextProvider } from './context/bannerContext';
import { DonationContextProvider } from './context/donationContext';
import { RegistrationContextProvider } from './context/registrationContext';

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
import ForgotPassword from './components/admin/ForgotPassword';
import ResetPassword from './components/admin/ResetPassword';


//*admin components
import Login from './components/admin/Login';
import MyProfile from './components/admin/MyProfile';
import UpdateProfile from './components/admin/UpdateProfile';
import UpdatePassword from './components/admin/UpdatePassword';

import Dashboard from './components/admin/Dashboard';

import CreateBlogForm from './components/admin/blog/CreateBlogForm';
import UpdateBlogForm from './components/admin/blog/UpdateBlogForm';
import BlogList from './components/admin/blog/BlogList';
import ArchiveBlogList from './components/admin/blog/ArchiveBlogList';

import AboutList from './components/admin/about/AboutList';
import CreateAboutForm from './components/admin/about/CreateAboutForm';
import UpdateAboutForm from './components/admin/about/UpdateAboutForm';

import BannerList from './components/admin/banner/BannerList';
import CreateBannerForm from './components/admin/banner/CreateBannerForm';
import UpdateBannerForm from './components/admin/banner/UpdateBannerForm';

import DonationList from './components/admin/donation/DonationList';
import CreateDonationForm from './components/admin/donation/CreateDonationForm';
import UpdateDonationForm from './components/admin/donation/UpdateDonationForm';

import RegistrationList from './components/admin/registration/RegistrationList';
import CreateRegistrationForm from './components/admin/registration/CreateRegistrationForm';
import UpdateRegistrationForm from './components/admin/registration/UpdateRegistrationForm';
import FeaturedBlogList from './components/admin/featured/FeaturedBlogList';

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
                <div className='set-bg'>
                    <Header />
                    {children}
                    <Footer />
                </div>
            }
        </>
    )
}

const App = () => {
    const { logout, loadUser } = useContext(AuthContext)

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
                                <CommentContextProvider>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/blog" element={<PublicBlogList />} />
                                        <Route path="/blog/:id" element={<PublicBlogDetails />} />
                                        <Route path="/verify/:slug" element={<OtpBox />} />

                                        <Route element={<AdminRoutes />}>
                                            <Route path="/admin/blog" element={<BlogList />} />
                                            <Route path="/admin/blog/archive" element={<ArchiveBlogList />} />
                                            <Route path="/admin/blog/featured" element={<FeaturedBlogList />} />
                                            <Route path="/admin/blog/new" element={<CreateBlogForm />} />
                                            <Route path="/admin/blog/edit/:id" element={<UpdateBlogForm />} />
                                        </Route>
                                    </Routes>
                                </CommentContextProvider>
                            </PostContextProvider>

                            <Routes>
                                <Route element={<AdminRoutes />}>
                                    <Route path="/me" element={<MyProfile />} />
                                    <Route path="/me/update" element={<UpdateProfile />} />
                                    <Route path="/password/update" element={<UpdatePassword />} />
                                </Route>
                            </Routes>

                            <AboutContextProvider>
                                <Routes>
                                    <Route element={<AdminRoutes />}>
                                        <Route path="/admin/about" element={<AboutList />} />
                                        <Route path="/admin/about/new" element={<CreateAboutForm />} />
                                        <Route path="/admin/about/:id" element={<UpdateAboutForm />} />
                                    </Route>
                                </Routes>
                            </AboutContextProvider>

                            <BannerContextProvider>
                                <Routes>
                                    <Route element={<AdminRoutes />}>
                                        <Route path="/admin/banner" element={<BannerList />} />
                                        <Route path="/admin/banner/new" element={<CreateBannerForm />} />
                                        <Route path="/admin/banner/:id" element={<UpdateBannerForm />} />
                                    </Route>
                                </Routes>
                            </BannerContextProvider>

                            <DonationContextProvider>
                                <Routes>
                                    <Route element={<AdminRoutes />}>
                                        <Route path="/admin/donation" element={<DonationList />} />
                                        <Route path="/admin/donation/new" element={<CreateDonationForm />} />
                                        <Route path="/admin/donation/:id" element={<UpdateDonationForm />} />
                                    </Route>
                                </Routes>
                            </DonationContextProvider>

                            <RegistrationContextProvider>
                                <Routes>
                                    <Route element={<AdminRoutes />}>
                                        <Route path="/admin/registration" element={<RegistrationList />} />
                                        <Route path="/admin/registration/new" element={<CreateRegistrationForm />} />
                                        <Route path="/admin/registration/:id" element={<UpdateRegistrationForm />} />
                                    </Route>
                                </Routes>
                            </RegistrationContextProvider>

                            <Routes>
                                <Route path="/partners" element={<Partners />} />
                                <Route path="/about-us" element={<About />} />
                                <Route path="/contact-us" element={<Contact />} />
                                <Route path="/donate" element={<Donate />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>

                            <PasswordContextProvider>
                                <Routes>
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/password/reset/:token" element={<ResetPassword />} />
                                </Routes>
                            </PasswordContextProvider>
                            <Routes>
                            </Routes>
                        </NavBar>
                    </AuthContextProvider>
                </ScrollToTop>
            </div>
        </Router >
    )
}

export default App
