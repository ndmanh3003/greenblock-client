import { ConfigProvider, Menu, MenuProps } from 'antd'
import { AppstoreAddOutlined, SnippetsOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { TableGuide } from '../../components'
import { PlantTable } from './../../components/table/PlantTable'
import { VarietyTable } from '../../components/table/VarietyTable'

export const Business = () => {
  const [current, setCurrent] = useState<number>(0)

  return (
    <>
      <TableGuide />
      <div className='flex space-x-10 pt-5'>
        <div>
          <div className='w-[350px] h-fit rounded-2xl bg-white border-[1px] overflow-hidden py-[1px] px-[1px]'>
            <ConfigProvider
              theme={{
                token: {
                  colorText: 'black',
                  fontSize: 16,
                  colorPrimary: '#A1C038'
                }
              }}
            >
              <Menu
                onClick={(e) => setCurrent(Number(e.key))}
                style={{ width: 348 }}
                defaultSelectedKeys={['0']}
                defaultOpenKeys={['batch']}
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
              {_table[current]}
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  )
}

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
  {
    key: 'batch',
    label: 'Batch',
    icon: <AppstoreAddOutlined />,
    children: [
      { key: '0', label: 'Planting Area' },
      { key: '1', label: 'Cultivated Variety' }
    ]
  },
  {
    key: '2',
    label: 'Production',
    icon: <SnippetsOutlined />
  }
]

const _table = [<PlantTable />, <VarietyTable />, <div>Table 3</div>]
