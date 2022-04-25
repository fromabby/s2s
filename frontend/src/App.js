import React, { useContext, useEffect, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";

//*protected routes
import ContributorRoutes from "./components/routes/ContributorRoutes";
import AdminRoutes from "./components/routes/AdminRoutes";

//*contexts
import AuthContext, { AuthContextProvider } from "./context/authContext";
import { PasswordContextProvider } from "./context/passwordContext";
import { CommentContextProvider } from "./context/commentContext";
import { PostContextProvider } from "./context/postContext";
import { AboutContextProvider } from "./context/aboutContext";
import { BannerContextProvider } from "./context/bannerContext";
import { DonationContextProvider } from "./context/donationContext";
import { RegistrationContextProvider } from "./context/registrationContext";
import { UserContextProvider } from "./context/userContext";
import { RecordContextProvider } from "./context/recordContext";

//*layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

//*public components
import About from "./components/homepage/About";
import Contact from "./components/homepage/Contact";
import Donate from "./components/homepage/Donate";
import Home from "./components/homepage/Home";
import Partners from "./components/homepage/Partners";
import PublicBlogList from "./components/homepage/PublicBlogList";
import PublicBlogDetails from "./components/homepage/PublicBlogDetails";
import OtpBox from "./components/homepage/blog/comments/OtpBox";
import ForgotPassword from "./components/admin/ForgotPassword";
import ResetPassword from "./components/admin/ResetPassword";

//*contributor components
import Login from "./components/admin/Login";
import MyProfile from "./components/admin/MyProfile";
import UpdateProfile from "./components/admin/UpdateProfile";
import UpdatePassword from "./components/admin/UpdatePassword";

import Dashboard from "./components/admin/Dashboard";

import CreateBlogForm from "./components/admin/blog/CreateBlogForm";
import UpdateBlogForm from "./components/admin/blog/UpdateBlogForm";
import BlogList from "./components/admin/blog/BlogList";
import ArchiveBlogList from "./components/admin/blog/ArchiveBlogList";

import AboutList from "./components/admin/about/AboutList";
import CreateAboutForm from "./components/admin/about/CreateAboutForm";
import UpdateAboutForm from "./components/admin/about/UpdateAboutForm";

import BannerList from "./components/admin/banner/BannerList";
import CreateBannerForm from "./components/admin/banner/CreateBannerForm";
import UpdateBannerForm from "./components/admin/banner/UpdateBannerForm";

import DonationList from "./components/admin/donation/DonationList";
import CreateDonationForm from "./components/admin/donation/CreateDonationForm";
import UpdateDonationForm from "./components/admin/donation/UpdateDonationForm";

import RegistrationList from "./components/admin/registration/RegistrationList";
import CreateRegistrationForm from "./components/admin/registration/CreateRegistrationForm";
import UpdateRegistrationForm from "./components/admin/registration/UpdateRegistrationForm";

import RecordList from "./components/admin/record/RecordList";
import CreateRecordForm from "./components/admin/record/CreateRecordForm";
import UpdateRecordForm from "./components/admin/record/UpdateRecordForm";

//*admin components
import UserList from "./components/admin/user/UserList";
import CreateUserForm from "./components/admin/user/CreateUserForm";
import UpdateUserForm from "./components/admin/user/UpdateUserForm";
import CommentList from "./components/admin/comment/CommentList";
import Load from "./components/layout/Load";
import FrequentlyAskedQuestions from "./components/homepage/FAQ";
import ErrorPage from "./components/ErrorPage";
import ApprovedCommentList from "./components/admin/comment/ApprovedCommentList";
import ErrorBoundary from "./components/ErrorBoundary";

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const NavBar = ({ children }) => {
  const location = useLocation();
  return (
    <>
      {location.pathname.includes("admin") ? (
        <Dashboard>{children}</Dashboard>
      ) : location.pathname.includes("login") ||
        location.pathname.includes("forgot-password") ? (
        <div>{children}</div>
      ) : (
        <div className="set-bg">
          <Header />
          <section>{children}</section>
          <Footer />
        </div>
      )}
    </>
  );
};

const App = () => {
  const { loadUser } = useContext(AuthContext);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <ErrorBoundary>
      <Router style={{ minHeight: "100vh" }}>
        <div>
          <ScrollToTop>
            <AuthContextProvider>
              <NavBar>
                <PostContextProvider>
                  <CommentContextProvider>
                    <Routes>
                      <Route path="/" element={<Home title={`Home`} />} />
                      <Route path="/load" element={<Load title={`Home`} />} />
                      <Route
                        path="/blog"
                        element={<PublicBlogList title={`Blogs`} />}
                      />
                      <Route
                        path="/blog/:id"
                        element={<PublicBlogDetails title={"Blogs"} />}
                      />
                      <Route
                        path="/verify/:slug"
                        element={<OtpBox title={`Verify your account`} />}
                      />

                      <Route element={<ContributorRoutes />}>
                        <Route
                          path="/admin/blog"
                          element={<BlogList title={`Manage Blogs`} />}
                        />
                        <Route
                          path="/admin/blog/archive"
                          element={
                            <ArchiveBlogList title={`Manage Archived Blogs`} />
                          }
                        />
                        <Route
                          path="/admin/blog/new"
                          element={<CreateBlogForm title={`Add New Blog`} />}
                        />
                        <Route
                          path="/admin/blog/edit/:id"
                          element={<UpdateBlogForm title={`Update Blog`} />}
                        />
                        <Route
                          path="/admin/comment"
                          element={<CommentList title={"Manage Comments"} />}
                        />
                        <Route
                          path="/admin/approved-comment"
                          element={
                            <ApprovedCommentList
                              title={"Manage Approved Comments"}
                            />
                          }
                        />
                      </Route>
                    </Routes>
                  </CommentContextProvider>
                </PostContextProvider>

                <Routes>
                  <Route element={<ContributorRoutes />}>
                    <Route
                      path="/admin/me"
                      element={<MyProfile title={`My Profile`} />}
                    />
                    <Route
                      path="/admin/me/update"
                      element={<UpdateProfile title={`Update Profile`} />}
                    />
                    <Route
                      path="/admin/password/update"
                      element={<UpdatePassword title={`Change Password`} />}
                    />
                  </Route>
                </Routes>

                <AboutContextProvider>
                  <Routes>
                    <Route element={<ContributorRoutes />}>
                      <Route
                        path="/admin/about"
                        element={
                          <AboutList title={`Manage Awards and Recognitions`} />
                        }
                      />
                      <Route
                        path="/admin/about/new"
                        element={
                          <CreateAboutForm
                            title={`Add New Awards and Recognition`}
                          />
                        }
                      />
                      <Route
                        path="/admin/about/:id"
                        element={
                          <UpdateAboutForm
                            title={`Update Awards and Recognitions`}
                          />
                        }
                      />
                    </Route>
                  </Routes>
                </AboutContextProvider>

                <BannerContextProvider>
                  <Routes>
                    <Route element={<ContributorRoutes />}>
                      <Route
                        path="/admin/banner"
                        element={<BannerList title={`Manage Banners`} />}
                      />
                      <Route
                        path="/admin/banner/new"
                        element={<CreateBannerForm title={`Add New Banner`} />}
                      />
                      <Route
                        path="/admin/banner/:id"
                        element={<UpdateBannerForm title={`Update Banner`} />}
                      />
                    </Route>
                  </Routes>
                </BannerContextProvider>

                <DonationContextProvider>
                  <Routes>
                    <Route element={<ContributorRoutes />}>
                      <Route
                        path="/admin/donation"
                        element={
                          <DonationList title={`Manage Donation Links`} />
                        }
                      />
                      <Route
                        path="/admin/donation/new"
                        element={
                          <CreateDonationForm title={`Add New Donation Link`} />
                        }
                      />
                      <Route
                        path="/admin/donation/:id"
                        element={
                          <UpdateDonationForm title={`Update Donation Link`} />
                        }
                      />
                    </Route>
                  </Routes>
                </DonationContextProvider>

                <RegistrationContextProvider>
                  <Routes>
                    <Route element={<ContributorRoutes />}>
                      <Route
                        path="/admin/registration"
                        element={
                          <RegistrationList
                            title={`Manage Registration Links`}
                          />
                        }
                      />
                      <Route
                        path="/admin/registration/new"
                        element={
                          <CreateRegistrationForm
                            title={`Add New Registration Link`}
                          />
                        }
                      />
                      <Route
                        path="/admin/registration/:id"
                        element={
                          <UpdateRegistrationForm
                            title={`Update Registration Link`}
                          />
                        }
                      />
                    </Route>
                  </Routes>
                </RegistrationContextProvider>

                <RecordContextProvider>
                  <Routes>
                    <Route element={<ContributorRoutes />}>
                      <Route
                        path="/admin/record"
                        element={<RecordList title={`Manage Records`} />}
                      />
                      <Route
                        path="/admin/record/new"
                        element={<CreateRecordForm title={`Add New Record`} />}
                      />
                      <Route
                        path="/admin/record/:id"
                        element={<UpdateRecordForm title={`Update Record`} />}
                      />
                    </Route>
                  </Routes>
                </RecordContextProvider>

                <UserContextProvider>
                  <Routes>
                    <Route element={<AdminRoutes />}>
                      <Route
                        path="/admin/user"
                        element={<UserList title={`Manage Users`} />}
                      />
                      <Route
                        path="/admin/user/new"
                        element={<CreateUserForm title={`Add New User`} />}
                      />
                      <Route
                        path="/admin/user/:id"
                        element={<UpdateUserForm title={`Update User`} />}
                      />
                    </Route>
                  </Routes>
                </UserContextProvider>

                <Routes>
                  <Route
                    path="/partners"
                    element={<Partners title={`Partners and Volunteers`} />}
                  />
                  <Route
                    path="/about-us"
                    element={<About title={`About Us`} />}
                  />
                  <Route
                    path="/contact-us"
                    element={<Contact title={`Contact Us`} />}
                  />
                  <Route
                    path="/faqs"
                    element={
                      <FrequentlyAskedQuestions
                        title={`Frequently Asked Questions`}
                      />
                    }
                  />
                  <Route path="/donate" element={<Donate title={`Donate`} />} />
                  <Route path="/login" element={<Login title={`Login`} />} />
                </Routes>

                <PasswordContextProvider>
                  <Routes>
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword title={`Forgot password?`} />}
                    />
                    <Route
                      path="/password/reset/:token"
                      element={<ResetPassword title={`Reset your password`} />}
                    />
                  </Routes>
                </PasswordContextProvider>
              </NavBar>
            </AuthContextProvider>
          </ScrollToTop>
        </div>
        {/* <Routes>
        <Route path="*" element={<ErrorPage />} />
      </Routes> */}
      </Router>
    </ErrorBoundary>
  );
};

export default App;
