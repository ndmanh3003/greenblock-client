import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Layout from './pages/Layout'
import LayoutAuth from './pages/auth/Layout'
import Login from './pages/auth/Login'
import NotFound from './pages/misc/NotFound'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout isHidden={true} />}>
      <Route path='auth' element={<LayoutAuth />}>
        <Route path='login' element={<Login />} />
      </Route>
      <Route path='error' element={<NotFound />} />
    </Route>
  )
)

export default router
