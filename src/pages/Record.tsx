import { ConfigProvider, StepProps, Steps } from 'antd'
import {
  ProductOutlined,
  CloudUploadOutlined,
  UserOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import React, { useReducer } from 'react'
import { Action, Hr, IState, Product, Upload } from '../components'

const reducer = (state: IState, action: Action): IState => {
  switch (action.type) {
  case 'UPDATE_CURRENT':
    return { ...state, current: action.payload }
  case 'UPDATE_DATA':
    return { ...state, data: { ...state.data, ...action.payload } }
  default:
    return state
  }
}

export const Record = () => {
  const [state, dispatch] = useReducer(reducer, { current: 0 })

  const _steps: (StepProps & { form: React.ReactNode })[] = [
    {
      title: 'HR Information',
      icon: <UserOutlined />,
      form: <Hr state={state} dispatch={dispatch} />
    },
    {
      title: 'Product Information',
      icon: <ProductOutlined />,
      form: <Product state={state} dispatch={dispatch} />
    },
    {
      title: 'Upload Information',
      icon: <CloudUploadOutlined />,
      form: <Upload state={state} dispatch={dispatch} />
    }
  ]
  return (
    <div className='m-auto w-[900px]'>
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
                  i == state.current
                    ? 'process'
                    : i > state.current
                      ? 'wait'
                      : 'finish'
                }
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
              />
            ))}
          </Steps>
        </ConfigProvider>
      </div>

      <div className='mt-10 w-[600px] mx-auto'>
        {_steps[state.current].form}
      </div>
    </div>
  )
}
