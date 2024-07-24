import { Affix, ConfigProvider, Menu, MenuProps } from 'antd'
import {
  AppstoreAddOutlined,
  UserOutlined,
  SnippetsOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import { useState } from 'react'

const Business = () => {
  const [current, setCurrent] = useState(0)
  console.log(current)

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(Number(e.key))
  }
  return (
    <div className='flex space-x-20 pt-5'>
      <Affix offsetTop={50}>
        <div className='w-[350px] h-fit rounded-2xl bg-white border-[1px] overflow-hidden py-[1px] px-[1px]'>
          <ConfigProvider
            theme={{
              token: {
                colorText: 'black',
                colorPrimary: '#21BA43',
                fontSize: 16
              }
            }}
          >
            <Menu
              onClick={onClick}
              style={{ width: 348 }}
              defaultSelectedKeys={['0']}
              defaultOpenKeys={['hr']}
              mode='inline'
              items={items}
            />
          </ConfigProvider>
        </div>
      </Affix>
      <div className='rounded-2xl pl-20 pr-10 pt-10 pb-8 w-full h-fit bg-red-500 bg-[url("bs-bg.png")] bg-bottom bg-no-repeat bg-cover'>
        <h1 className='font-bold text-3xl'>CSV Data Manager and Editor</h1>
        <div className='font-medium leading-normal'>
          Here's a quick guide on how to use our data management features:
          <div className='h-3' />
          Import Data: Add your data by uploading a CSV file.
          <br />
          Export Data: Download your current data as a CSV file anytime.
          <br />
          Drag and Reorder: Easily rearrange your data by dragging rows to new
          positions (except for the Promotion).
          <br />
          Edit in Table: Make changes directly in the table - it's fully
          editable!
          <div className='text-red-500 mt-3 flex space-x-2'>
            <ExclamationCircleFilled style={{ fontSize: 20 }} />
            <div>
              Remember to click the{' '}
              <span className='font-extrabold'>SAVE button</span> to keep your
              updates. Changes are not automatically saved!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Business

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'hr',
    label: 'Human Resources',
    icon: <UserOutlined />,
    children: [
      { key: '0', label: 'Farmer' },
      { key: '1', label: 'Processor' }
    ]
  },
  {
    key: 'ecosys',
    label: 'Ecosystem',
    icon: <AppstoreAddOutlined />,
    children: [
      { key: '2', label: 'Planting Area' },
      { key: '3', label: 'Variety' }
    ]
  },
  {
    key: '4',
    label: 'Promotion',
    icon: <SnippetsOutlined />
  }
]
