import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Layout from '../pages/Layout'
import LayoutAuth from '../pages/auth/Layout'
import Login from '../pages/auth/Login'
import NotFound from '../pages/misc/NotFound'
import HomePage from '../pages/HomePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<HomePage />} />
      <Route path='/' element={<Layout isHidden={false} />}>
        <Route path='auth' element={<LayoutAuth />}>
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='error' element={<NotFound />} />
      </Route>
    </Route>
  )
)

export default router
