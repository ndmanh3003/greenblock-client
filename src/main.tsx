import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import router from './routes/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Manrope',
            colorPrimary: '#A1C038',
            colorText: '#ffffff',
            colorTextPlaceholder: '#ffffffa2',
            colorTextDescription: '#ffffff'
          },
          components: {
            Form: {
              labelColor: 'white',
              labelFontSize: 18,
              marginLG: 27
            },
            Select: {
              optionSelectedColor: '#21BA43',
              selectorBg: 'transparent',
              paddingContentHorizontal: 20,
              optionFontSize: 16,
              optionSelectedBg: 'rgba(0, 0, 0, 0.2)'
            },
            Message: { fontSize: 30 }
          }
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
