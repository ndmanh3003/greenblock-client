import {
  CheckCircleOutlined,
  CloudUploadOutlined,
  ProductOutlined,
  UserOutlined
} from '@ant-design/icons'
import { ConfigProvider, StepProps, Steps } from 'antd'
import React from 'react'

import { Hr, Product, Upload } from '@/components'
import { useAppSelector } from '@/hooks'
import { selectState } from '@/service/store/state'

const _steps: (StepProps & { form: React.ReactNode })[] = [
  {
    title: 'HR Information',
    icon: <UserOutlined />,
    form: <Hr />
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
export const Record = () => {
  const state = useAppSelector(selectState)

  return (
    <div className='lg:mx-auto mx-5 lg:w-full max-w-[800px] my-auto'>
      <div className='px-10 py-5 rounded-full bg-black bg-opacity-30 backdrop-blur-xl w-fit mx-auto'>
        <div className='font-medium text-xl text-white lg:hidden'>
          <span className='mr-5'>{_steps[state.current].icon}</span>
          {_steps[state.current].title}
        </div>
        <ConfigProvider
          theme={{
            token: { colorPrimary: 'white', fontSize: 16 }
          }}
        >
          <Steps
            className='cursor-default'
            responsive={false}
            rootClassName='w-[750px] hidden lg:flex'
          >
            {_steps.map((s, i) => (
              <Steps.Step
                key={i}
                icon={
                  i < state.current ? (
                    <CheckCircleOutlined />
                  ) : i == state.current ? (
                    s.icon
                  ) : (
                    React.cloneElement(s.icon as React.ReactElement, {
                      style: { color: 'rgba(255, 255, 255, 0.5)' }
                    })
                  )
                }
                status={
                  i == state.current
                    ? 'process'
                    : i > state.current
                      ? 'wait'
                      : 'finish'
                }
                title={s.title}
              />
            ))}
          </Steps>
        </ConfigProvider>
      </div>

      <div className='mt-10 mx-auto lg:max-w-[600px] h-[400px]'>
        {_steps[state.current].form}
      </div>
    </div>
  )
}
