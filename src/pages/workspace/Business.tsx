import { Affix, ConfigProvider, Menu, MenuProps } from 'antd'
import {
  AppstoreAddOutlined,
  UserOutlined,
  SnippetsOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons'
import { useState } from 'react'
import { Editable1RowTable } from '../../components/business/Editable1RowTable'
import { arr2obj } from '../../utils'

const Business = () => {
  const [current, setCurrent] = useState(0)
  console.log(current)

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(Number(e.key))
  }
  return (
    <div className='flex space-x-10 pt-5'>
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
      <div className='w-full h-fit flex flex-col space-y-10'>
        <div className='rounded-2xl p-10 w-full h-fit bg-[url("bs-bg.png")] bg-bottom bg-no-repeat bg-cover'>
          <h1 className='font-bold text-3xl'>CSV Data Manager and Editor</h1>
          <div className='font-medium leading-normal'>
            Here's a quick guide on how to use our data management features:
            <div className='h-3' />- Make changes directly in the table -
            everything is editable! <br />
            - Any duplicated information will be automatically removed.
            <br />- You also can work with the file:
            <div className='pl-5'>
              • Import Data: You can add your data by uploading a CSV file
              (except for the Promotion table).
              <br />
              • Export Data: Download your current data as a CSV file whenever
              you need.
              <br />• Format File: Because there is ONLY ONE column, the first
              row will be included as data.
            </div>
            <div className='text-red-500 mt-3 flex space-x-2'>
              <ExclamationCircleFilled style={{ fontSize: 20 }} />
              <div>
                Click
                <span className='font-extrabold'> SAVE </span> to keep your
                updates and remove duplicates. Changes are
                <span className='font-extrabold'> NOT </span>
                automatically saved!
              </div>
            </div>
          </div>
        </div>
        <div className='border rounded-2xl overflow-hidden w-full h-fit p-10'>
          <ConfigProvider
            theme={{
              token: {
                colorText: 'black',
                fontSize: 16
              }
            }}
          >
            <Editable1RowTable
              data={arr2obj([112, 21211, 212])}
              title='Farmer Table'
            />
          </ConfigProvider>
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
    label: 'Human Resource',
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
      { key: '3', label: 'Cultivated Variety' }
    ]
  },
  {
    key: '4',
    label: 'Promotion',
    icon: <SnippetsOutlined />
  }
]
