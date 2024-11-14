import { AppstoreAddOutlined, SnippetsOutlined } from '@ant-design/icons'
import { ConfigProvider, Menu, MenuProps } from 'antd'
import { useState } from 'react'

import { ItemsTable, ProductStatic, TableGuide } from '@/components'

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'batch',
    label: 'Batch',
    icon: <AppstoreAddOutlined />,
    children: [
      { key: '0', label: 'Landing Area' },
      { key: '1', label: 'Cultivated Variety' }
    ]
  },
  {
    key: '2',
    label: 'Production',
    icon: <SnippetsOutlined />
  }
]

const _table = [
  <ItemsTable key='land' name='Landing Area' type='land' />,
  <ItemsTable key='variety' name='Cultivated Variety' type='variety' />,
  <ProductStatic key='static' />
]

export const Business = () => {
  const [current, setCurrent] = useState<number>(0)

  return (
    <>
      <TableGuide />
      <ConfigProvider
        theme={{
          token: {
            colorText: 'black',
            fontSize: 16,
            colorPrimary: '#A1C038',
            colorTextDescription: 'gray'
          }
        }}
      >
        <div className='flex space-x-10 pt-5'>
          <div>
            <div className='w-[350px] h-fit rounded-2xl bg-white border-[1px] overflow-hidden py-[1px] px-[1px]'>
              <Menu
                defaultOpenKeys={['batch']}
                defaultSelectedKeys={['0']}
                items={items}
                mode='inline'
                style={{ width: 348 }}
                onClick={(e) => setCurrent(Number(e.key))}
              />
            </div>
          </div>
          <div className='w-full h-fit'>
            <div className='border rounded-2xl overflow-hidden w-full h-fit p-10'>
              {_table[current]}
            </div>
          </div>
        </div>
      </ConfigProvider>
    </>
  )
}
