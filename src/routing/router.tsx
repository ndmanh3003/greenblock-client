import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import * as Routes from './paths'
import { Route } from 'react-router-dom'
import Layout from '../pages/Layout'
import Login from '../pages/auth/Login'
import LayoutAuth from '../pages/auth/Layout'
import LayoutWorkSpace from '../pages/workspace/Layout'
// import NotFound from '../pages/misc/NotFound'
import HomePage from '../pages/HomePage'
import Register from '../pages/auth/Register'
import Promotion from '../pages/workspace/Promotion'
import Inspector from '../pages/workspace/Inspector'
import Business from '../pages/workspace/Business'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Routes.HOMEPAGE} element={<Layout />}>
      <Route index element={<HomePage />} />

      <Route path='/' element={<LayoutAuth />}>
        <Route path={Routes.LOGIN} element={<Login />} />
        <Route path={Routes.REGISTER} element={<Register />} />
      </Route>

      <Route path='/' element={<LayoutWorkSpace />}>
        <Route path={Routes.PROMOTION} element={<Promotion />} />
        <Route path={Routes.INSPECTOR} element={<Inspector />} />
        <Route path={Routes.BUSINESS} element={<Business />} />
      </Route>
      {/* <Route path='error' element={<NotFound />} /> */}
    </Route>
  )
)

export default router
