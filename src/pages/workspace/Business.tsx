import { ConfigProvider, Menu, MenuProps } from 'antd'
import {
  AppstoreAddOutlined,
  UserOutlined,
  SnippetsOutlined
} from '@ant-design/icons'
import { useState } from 'react'
import { arr2obj } from '../../utils'
import { PromotionTable, SimpleTable, Guide } from '../../components/business'

const Business = () => {
  const [current, setCurrent] = useState(0)
  console.log(current)

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(Number(e.key))
  }
  return (
    <>
      <Guide />
      <div className='flex space-x-10 pt-5'>
        <div>
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
        </div>
        <div className='w-full h-fit flex flex-col space-y-10'>
          <div className='border rounded-2xl overflow-hidden w-full h-fit p-10'>
            <ConfigProvider
              theme={{
                token: {
                  colorText: 'black',
                  fontSize: 16,
                  colorTextDescription: 'gray'
                }
              }}
            >
              {current !== 4 ? (
                <SimpleTable
                  key={current}
                  data={arr2obj(_table[current].data)}
                  title={_table[current].title}
                />
              ) : (
                <PromotionTable />
              )}
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
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

const _table = [
  {
    title: 'Farmer Table',
    data: [112, 21211, 212]
  },
  {
    title: 'Processor Table',
    data: [112, 21211, 212]
  },
  {
    title: 'Planting Area Table',
    data: [112, 21211, 212]
  },
  {
    title: 'Cultivated Variety Table',
    data: [112, 21211, 212]
  },
  {
    title: 'Promotion Table',
    data: [
      {
        index: '0928392938917391',
        name: 'Name 1',
        desc: 'Description 1',
        link: 'Link 1',
        startDay: '2021-09-01',
        endDay: '2021-09-10'
      }
    ]
  }
]
