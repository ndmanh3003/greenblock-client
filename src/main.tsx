import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import router from './routing/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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
          }
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)
