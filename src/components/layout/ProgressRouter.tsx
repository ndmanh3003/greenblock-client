import { ReactNode, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const ProgressRouter = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    const handleStart = () => NProgress.start()
    const handleStop = () => NProgress.done()

    window.addEventListener('routeChangeStart', handleStart)
    window.addEventListener('routeChangeComplete', handleStop)
    window.addEventListener('routeChangeError', handleStop)

    return () => {
      window.removeEventListener('routeChangeStart', handleStart)
      window.removeEventListener('routeChangeComplete', handleStop)
      window.removeEventListener('routeChangeError', handleStop)
    }
  }, [])

  return <Router>{children}</Router>
}
