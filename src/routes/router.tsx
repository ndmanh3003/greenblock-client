import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import * as Routes from './paths'
import { Route } from 'react-router-dom'
import * as Pages from '../pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Routes.HOMEPAGE} element={<Pages.Layout />}>
      <Route index element={<Pages.HomePage />} />
      <Route path='/' element={<Pages.LayoutAuth />}>
        <Route path={Routes.LOGIN} element={<Pages.Login />} />
        <Route path={Routes.REGISTER} element={<Pages.Register />} />
      </Route>
      <Route path='/' element={<Pages.LayoutWorkspace />}>
        <Route path={Routes.INSPECTOR} element={<Pages.Inspector />} />
        <Route path={Routes.BUSINESS} element={<Pages.Business />} />
      </Route>
      <Route path={Routes.RECORD} element={<Pages.Record />} />
    </Route>
  )
)

export default router
