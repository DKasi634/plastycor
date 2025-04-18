
import './App.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import MainNavigation from './routes/main-navigation/main-navigation.route'
import LandingPage from './pages/landing.page'
import BlogPage from './pages/blog.page'
import ContactPage from './pages/contact.page'
import ActivitiesPage from './pages/activities.page'
import ProductsPage from './pages/products.page'
import NetworkPage from './pages/network.page'
import UnivartizePage from './pages/univartize.page'
import SignInPage from './pages/auth/signin.page'
import SignUpPage from './pages/auth/signup.page'
import Toast from './components/toast/toast.component'
import ProfilePage from './pages/user/profile.page'
import { useEffect } from 'react'
import { onAuthStateChangedListener } from './utils/firebase/firebase.auth'
import {  setCurrentUser } from './store/auth/auth.actions'
import { useDispatch } from 'react-redux'
import UserProfileNavigation from './routes/user-navigation/user-navigation.route'
import AuthProtectedRoute from './routes/auth-protected.route'
import PostProductPage from './pages/user/post-product.page'
import SingleProductPage from './pages/single-product.page'
import NotFoundPage from './pages/errors/not-found.page'
import EditProductPage from './pages/user/edit-product.page'
import AdminProtectedRoute from './routes/admin-protected.route'
import { ADMIN_STATUS } from './api/types'
import ManageCategoriesPage from './pages/admin-pages/manage-categories.page'
import { fetchCategoriesStart } from './store/categories/categories.actions'
import DashboardPage from './pages/admin-pages/dashboard.page'
import ManageUsersPage from './pages/admin-pages/manage-users.page'
import ManageProductsPage from './pages/admin-pages/manage-products.page'
import BlogNavigation from './routes/blog.route'
import CreateEditBlogPage from './pages/create-edit-blog.page'
import SingleBlogPage from './pages/single-blog.page'
import UnivartizeNavigation from './routes/univartize.route'
import PostInnovationPage from './pages/user/post-innovation.page'
import EditInnovationPage from './pages/user/edit-innovation.page'
import SingleInnovationPage from './pages/single-innovation.page'
import EditProfilePage from './pages/user/edit-profile.page'
import MyInnovationsPage from './pages/user/my-innovations.page'
import ManageInnovationsPage from './pages/admin-pages/manage-innovations.page'
import VerificationEmailSentPage from './pages/auth/verification-email-sent.page'
import VerifyEmailPage from './pages/auth/verify-email.page'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = () => {
      try {
        onAuthStateChangedListener(async (userAuth) => {
          // console.log("\nAuth state changed : ", userAuth)
          if (userAuth && userAuth.email && userAuth.emailVerified) { 
            dispatch(setCurrentUser(userAuth.email)); return }
        })
      } catch (error) { }
    }; return unsubscribe;
  })

  // Fetch categories when the component mounts.
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);



  return (
    <>
      <Routes>
        <Route path='/' element={<MainNavigation />}>
          <Route index element={<LandingPage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='blogs' element={<BlogNavigation />} >
            <Route index element={<BlogPage />} />
            <Route path='create' element={<CreateEditBlogPage />} />
            <Route path='edit/:blogId' element={<CreateEditBlogPage />} />
            <Route path=':blogId' element={<SingleBlogPage />} />
          </Route>
          <Route path='contact' element={<ContactPage />} />
          <Route path='activities' element={<ActivitiesPage />} />
          <Route path='shop' element={<ProductsPage />} />
          <Route path='network' element={<NetworkPage />} />
          <Route path='univartize' element={<UnivartizeNavigation />}>
            <Route index element={<UnivartizePage />} />
            <Route path='create' element={<PostInnovationPage />} />
            <Route path='edit/:innovationId' element={<EditInnovationPage />} />
            <Route path=':innovationId' element={<SingleInnovationPage />} />
          </Route>
          <Route path='signin' element={<SignInPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='verification-email-sent' element={<VerificationEmailSentPage />} />
          <Route path='auth/action' element={<VerifyEmailPage />} />
          <Route path='product/:productId' element={<SingleProductPage />} />

        </Route>
        <Route path='/me' element={<AuthProtectedRoute> <UserProfileNavigation /></AuthProtectedRoute>}>
          <Route index element={<ProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='innovations' element={<MyInnovationsPage />} />
          <Route path='profile' element={<Outlet />}>
            <Route index element={<ProfilePage />} />
            <Route path='edit' element={<EditProfilePage />} />
          </Route>
          <Route path='post' element={<AdminProtectedRoute adminStatus={ADMIN_STATUS.CO_ADMIN}> <PostProductPage /> </AdminProtectedRoute>} />
          <Route path='edit-product/:productId' element={<AdminProtectedRoute adminStatus={ADMIN_STATUS.CO_ADMIN}><EditProductPage /></AdminProtectedRoute>} />
          <Route path='admin' element={<AdminProtectedRoute adminStatus={ADMIN_STATUS.MAIN_ADMIN}><DashboardPage /></AdminProtectedRoute>} />
          <Route path='manage-categories' element={<AdminProtectedRoute adminStatus={ADMIN_STATUS.MAIN_ADMIN}><ManageCategoriesPage /></AdminProtectedRoute>} />
          <Route path='manage-users' element={<AdminProtectedRoute adminStatus={ADMIN_STATUS.MAIN_ADMIN}><ManageUsersPage /></AdminProtectedRoute>} />
          <Route path='manage-products' element={<AdminProtectedRoute adminStatus={ADMIN_STATUS.MAIN_ADMIN}><ManageProductsPage /></AdminProtectedRoute>} />
          <Route path='manage-innovations' element={<AdminProtectedRoute adminStatus={ADMIN_STATUS.MAIN_ADMIN}><ManageInnovationsPage /></AdminProtectedRoute>} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Toast />
    </>
  )
}

export default App
