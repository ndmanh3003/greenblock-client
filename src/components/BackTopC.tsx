import { VerticalAlignTopOutlined } from '@ant-design/icons'
import { BackTop } from 'antd'
import { useEffect, useState } from 'react'

export const BackTopC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      {visible && (
        <BackTop>
          <div className='fixed left-1/2 bottom-1 transform -translate-x-1/2 -translate-y-1/2 h-9 w-9 border-2 border-primary rounded-full flex items-center justify-center z-50 bg-white'>
            <VerticalAlignTopOutlined className='!text-xl !text-primary' />
          </div>
        </BackTop>
      )}
    </>
  )
}
