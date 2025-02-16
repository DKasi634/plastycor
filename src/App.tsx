
import './App.css'
import { Route, Routes } from 'react-router-dom'
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
import { setCurrentUser } from './store/auth/auth.actions'
import { useDispatch } from 'react-redux'
import UserProfileNavigation from './routes/user-navigation/user-navigation.route'
import AuthProtectedRoute from './routes/auth-protected.route'
import PostProductPage from './pages/user/post-product.page'
import SingleProductPage from './pages/single-product.page'
import NotFoundPage from './pages/errors/not-found.page'
import EditProductPage from './pages/user/edit-product.page'

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = () => {
      try {
        onAuthStateChangedListener(async (userAuth) => {
          if (userAuth && userAuth.email) { dispatch(setCurrentUser(userAuth.email)) }
        })
      } catch (error) { }
    }; return unsubscribe;
  })

  return (
    <>
      <Routes>
        <Route path='/' element={<MainNavigation />}>
          <Route index element={<LandingPage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='blog' element={<BlogPage />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='activities' element={<ActivitiesPage />} />
          <Route path='shop' element={<ProductsPage />} />
          <Route path='network' element={<NetworkPage />} />
          <Route path='univartize' element={<UnivartizePage />} />
          <Route path='signin' element={<SignInPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='product/:productId' element={<SingleProductPage />} />
          
        </Route>
        <Route path='/me' element={<AuthProtectedRoute> <UserProfileNavigation /></AuthProtectedRoute>}>
          <Route index element={<ProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='post' element={<PostProductPage />} />
          <Route path='edit-product/:productId' element={<EditProductPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Toast />
    </>
  )
}

export default App
