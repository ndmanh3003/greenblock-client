import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import * as Routes from './paths'
import { Route } from 'react-router-dom'
import Layout from '../pages/Layout'
import LayoutAuth from '../pages/auth/Layout'
import Login from '../pages/auth/Login'
import NotFound from '../pages/misc/NotFound'
import HomePage from '../pages/HomePage'
import Register from '../pages/auth/Register'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Routes.HOMEPAGE} element={<Layout />}>
      <Route index element={<HomePage />} />

      <Route path='/' element={<LayoutAuth />}>
        <Route path={Routes.LOGIN} element={<Login />} />
        <Route path={Routes.REGISTER} element={<Register />} />
      </Route>

      <Route path='error' element={<NotFound />} />
    </Route>
  )
)

export default router
