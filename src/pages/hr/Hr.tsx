import { ConfigProvider, Steps } from 'antd'
import {
  ProductOutlined,
  CloudUploadOutlined,
  UserOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import React, { useState } from 'react'
import Upload from '../../components/hr/Upload'
import Product from '../../components/hr/Product'
import HrForm from '../../components/hr/Hr'

interface IStep {
  title: string
  status?: 'finish' | 'process' | 'wait'
  icon: React.ReactNode
  form: React.ReactNode
}

export interface IStatus {
  businessId: string
  isFarmer: boolean
  phone: string
  productId: number
  desc: string
  img: string[]
  type: 0 | 1 | 2 | 3
}

const Hr = () => {
  const [current, setCurrent] = useState(0)
  const [data, setData] = useState<IStatus>()
  console.log(data)

  const _steps: IStep[] = [
    {
      title: 'HR Information',
      icon: <UserOutlined />,
      form: <HrForm setData={setData} setCurrent={setCurrent} />
    },
    {
      title: 'Product Information',
      icon: <ProductOutlined />,
      form: <Product />
    },
    {
      title: 'Upload Information',
      icon: <CloudUploadOutlined />,
      form: <Upload />
    }
  ]
  return (
    <div className='m-auto w-[1000px]'>
      <div className='px-10 py-5 w-full rounded-full overflow-hidden bg-black bg-opacity-30 backdrop-blur-xl'>
        <ConfigProvider
          theme={{
            token: { colorPrimary: 'white', fontSize: 16 }
          }}
        >
          <Steps className='cursor-default'>
            {_steps.map((s, i) => (
              <Steps.Step
                key={i}
                title={s.title}
                status={
                  i == current ? 'process' : i > current ? 'wait' : 'finish'
                }
                icon={
                  i < current ? (
                    <CheckCircleOutlined />
                  ) : i == current ? (
                    s.icon
                  ) : (
                    React.cloneElement(s.icon as React.ReactElement, {
                      style: { color: 'rgba(255, 255, 255, 0.5)' }
                    })
                  )
                }
              />
            ))}
          </Steps>
        </ConfigProvider>
      </div>

      <div className='mt-10 w-[600px] mx-auto'>{_steps[current].form}</div>
    </div>
  )
}

export default Hr
