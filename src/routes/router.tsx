import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom'
import * as Routes from './paths'
import * as Pages from '../pages'
import { ProtectedPage, RetrictedPage } from '../components'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={Routes.HOMEPAGE}
      element={<Pages.Layout />}
      errorElement={<Pages.Error />}
    >
      <Route index element={<Pages.HomePage />} />

      <Route path='/' element={<RetrictedPage />}>
        <Route path='/' element={<Pages.LayoutAuth />}>
          <Route path={Routes.LOGIN} element={<Pages.Login />} />
          <Route path={Routes.REGISTER} element={<Pages.Register />} />
        </Route>
      </Route>

      <Route path='/' element={<ProtectedPage />}>
        <Route path='/' element={<Pages.LayoutWorkspace />}>
          <Route path={Routes.INSPECTOR} element={<Pages.Inspector />} />
          <Route path={Routes.BUSINESS} element={<Pages.Business />} />
        </Route>
      </Route>

      <Route path={Routes.RECORD} element={<Pages.Record />} />
      <Route path={Routes.WAITLIST} element={<Pages.Waitlist />} />
      <Route path={Routes.ADMIN} element={<Pages.Admin />} />
      <Route
        path={import.meta.env.VITE_API_ERROR_PAGE}
        element={<Pages.Error />}
      />
    </Route>
  )
)

export default router
