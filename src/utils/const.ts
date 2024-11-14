import { Routes } from '@/routes'

export const initQuery = {
  page: 1,
  limit: 10
}

export const responsiveScreen = [
  Routes.HOMEPAGE,
  Routes.LOGIN,
  Routes.RECORD,
  Routes.REGISTER,
  Routes.WAITLIST,
  import.meta.env.VITE_API_ERROR_PAGE,
  Routes.LOGOUT
]
