import { SearchOutlined } from '@ant-design/icons'
import { ConfigProvider, Form, Input, Modal, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ProductInfo } from '@/components/product/ProductInfo'
import { formTableConfig } from '@/config'

export const InfoProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const [form] = Form.useForm()
  const formRef = useRef(form)

  const onFinish = (values: { id: string }) => {
    const { id } = values
    if (!id) {
      return message.error('Please enter product ID')
    }
    navigate(id)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (location.pathname === '/') {
      setIsModalOpen(false)
    }
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
        <Form ref={formRef} form={form} onFinish={onFinish}>
          <Form.Item name='id'>
            <Input
              className='text-sm lg:text-lg rounded-t-2xl lg:rounded-full py-3 px-5 w-full lg:w-[450px] mt-5 !my-0 lg:!mt-5 rounded-none !border-none'
              placeholder='ID Product'
              prefix={
                <SearchOutlined
                  className='mr-3 text-2xl'
                  onClick={() => formRef.current.submit()}
                />
              }
            />
          </Form.Item>
        </Form>
      </ConfigProvider>
      <ConfigProvider theme={formTableConfig.theme} wave={formTableConfig.wave}>
        <Modal
          footer={() => <></>}
          height={300}
          open={isModalOpen}
          style={{ bottom: 20 }}
          width={1000}
          onCancel={() => {
            setIsModalOpen(false)
            navigate('/')
          }}
        >
          <div className='text-black lg:m-5 text-base'>
            <h1 className='text-2xl font-semibold text-green2 mb-5'>
              GreenBlock Traceability
            </h1>
            <div className='max-h-[50vh] overflow-auto pr-2'>
              <ProductInfo />
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  )
}
