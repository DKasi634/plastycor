
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

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<MainNavigation />}>
      <Route index element={<LandingPage/>} />
      <Route path='blog' element={<BlogPage/>} />
      <Route path='contact' element={<ContactPage/>} />
      <Route path='activities' element={<ActivitiesPage/>} />
      <Route path='shop' element={<ProductsPage/>} />
      <Route path='network' element={<NetworkPage/>} />
      <Route path='univartize' element={<UnivartizePage/>} />
      </Route>
    </Routes>
  )
}

export default App
