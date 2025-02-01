
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainNavigation from './routes/main-navigation/main-navigation.route'
import LandingPage from './pages/landing.page'
import BlogPage from './pages/blog.page'

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<MainNavigation />}>
      <Route index element={<LandingPage/>} />
      <Route path='blog' element={<BlogPage/>} />
      </Route>
    </Routes>
  )
}

export default App
