import { ConfigProvider, Form, Input, message, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProductInfo } from './ProductInfo'

export const InfoProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const [form] = Form.useForm()
  const formRef = useRef(form)
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
        <Form onFinish={onFinish} form={form} ref={formRef}>
          <Form.Item name='id'>
            <Input
              prefix={
                <SearchOutlined
                  className='mr-3 text-2xl'
                  onClick={() => formRef.current.submit()}
                />
              }
              className='text-sm lg:text-lg rounded-t-2xl lg:rounded-full py-3 px-5 w-full lg:w-[450px] mt-5 !my-0 lg:!mt-5 rounded-none !border-none'
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
          style={{ bottom: 20 }}
          onCancel={() => {
            setIsModalOpen(false)
            navigate('/')
          }}
          footer={() => <></>}
        >
          <div className='text-black lg:m-5 text-base'>
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
