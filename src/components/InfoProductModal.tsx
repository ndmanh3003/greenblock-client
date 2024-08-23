import { ConfigProvider, Form, Input, message, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProductInfo } from './ProductInfo'

export const InfoProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const onFinish = (values: { id: string }) => {
    const { id } = values
    if (!id) return message.error('Please enter product ID')
    navigate(id)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (location.pathname === '/') setIsModalOpen(false)
  }, [location.pathname])

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorText: 'black',
            colorTextPlaceholder: '#00000063'
          }
        }}
      >
        <Form onFinish={onFinish}>
          <Form.Item name='id'>
            <Input
              prefix={<SearchOutlined className='mr-3 text-2xl' />}
              className='text-lg rounded-full py-3 px-5 w-[450px] mt-5'
              placeholder='ID Product'
            />
          </Form.Item>
        </Form>
      </ConfigProvider>
      <ConfigProvider
        wave={{ disabled: true }}
        theme={{
          token: {
            colorText: 'black',
            colorTextDescription: 'black',
            colorIcon: 'black'
          },
          components: {
            Form: {
              labelColor: 'black',
              labelFontSize: 18,
              marginLG: 27
            },
            Select: {
              optionSelectedColor: '#21BA43',
              selectorBg: 'transparent',
              paddingContentHorizontal: 20,
              optionFontSize: 16,
              optionSelectedBg: 'rgba(218, 216, 216, 0.2)'
            }
          }
        }}
      >
        <Modal
          width={1000}
          height={300}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            navigate('/')
          }}
          footer={() => <></>}
        >
          <div className='text-black m-5 text-base'>
            <h1 className='text-2xl font-semibold text-green2 mb-5'>
              GreenBlock Traceability
            </h1>
            <ProductInfo />
          </div>
        </Modal>
      </ConfigProvider>
    </>
  )
}
