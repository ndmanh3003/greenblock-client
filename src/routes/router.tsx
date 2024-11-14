import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import * as Routes from './paths'
import { ProductList, ProtectedPage, RetrictedPage } from '@/components'
import * as Pages from '@/pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<Pages.Layout />}
      errorElement={<Pages.Error />}
      path={Routes.HOMEPAGE}
    >
      <Route element={<Pages.HomePage />} path='/:id?' />

      <Route element={<RetrictedPage />} path='/'>
        <Route element={<Pages.LayoutAuth />} path='/'>
          <Route element={<Pages.Login />} path={Routes.LOGIN} />
          <Route element={<Pages.Register />} path={Routes.REGISTER} />
        </Route>
      </Route>

      <Route element={<ProtectedPage />} path='/'>
        <Route element={<Pages.LayoutWorkspace />} path='/'>
          <Route
            element={<Pages.Inspector />}
            path={Routes.INSPECTOR + '/:id?'}
          />
          <Route element={<Pages.Business />} path={Routes.BUSINESS} />
          <Route
            element={<ProductList />}
            path={Routes.BUSINESS + '/product/:id?'}
          />
        </Route>
      </Route>

      <Route element={<Pages.Waitlist />} path={Routes.WAITLIST} />
      <Route
        element={<Pages.Error />}
        path={import.meta.env.VITE_API_ERROR_PAGE}
      />
      <Route element={<Pages.Logout />} path={Routes.LOGOUT} />

      <Route element={<Pages.Admin />} path={Routes.ADMIN} />
      <Route element={<Pages.Record />} path={Routes.RECORD} />
    </Route>
  )
)

export default router
