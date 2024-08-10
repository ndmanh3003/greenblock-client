import React, { useState } from 'react'
import {
  ConfigProvider,
  message,
  Popconfirm,
  Table,
  Tooltip,
  Upload,
  UploadProps
} from 'antd'
import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { ColumnType } from 'antd/es/table'
import { EditableCell, EditableRow } from '.'
import { clear, keyGen } from '../../utils'
import { v4 as uuidv4 } from 'uuid'
import { ButtonC } from '../ButtonC'

interface PlantTableItem {
  id?: string
  name: string
  total: number
  key: string
}

export const PlantTable: React.FC = () => {
  const [data, setData] = useState<PlantTableItem[]>(
    keyGen(_data) as PlantTableItem[]
  )

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key))
  }

  const handleAdd = () => {
    if (data.some((item) => item.name === 'Add new item')) {
      message.warning('Please save the previous new item')
      return
    }

    const newData: PlantTableItem = {
      name: 'Add new item',
      total: 0,
      key: uuidv4()
    }
    setData([...data, newData])
  }

  const handleSave = (row: PlantTableItem) => {
    const newData = [...data]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setData(newData)
  }

  const handleExport = () => {
    clear(data)

    if (data.length === 0) {
      message.warning('No data to export')
      return
    }

    const title = 'id,name\n'
    const csvContent = data.reduce((acc, item) => {
      return `${acc}${item.id},${item.name}\n`
    }, title)

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'land.csv'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  const handleImport: UploadProps['onChange'] = async (info) => {
    const file = info.fileList[0]

    if (file) {
      const data = (await file.originFileObj?.text()) || ''
      const lines = data.trim().split('\n').slice(1)

      const newData = lines.map((line) => {
        const [id, name] = line.split(',')
        return {
          ...(id && { id }),
          ...(name && { name })
        }
      })
      console.log(newData)
    }
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      width: '10%',
      editable: false,
      align: 'center',
      //dont use index, use current index of data
      render: (_: unknown, record: PlantTableItem) => {
        return data.indexOf(record) + 1
      }
    },
    {
      title: (
        <>
          <EditOutlined className='!pr-2' />
          Name
        </>
      ),
      dataIndex: 'name',
      editable: true
    },
    {
      title: 'Total',
      dataIndex: 'total',
      width: '15%',
      editable: false,
      align: 'center',
      sorter: (a: PlantTableItem, b: PlantTableItem) => a.total - b.total
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      align: 'center',
      width: '10%',
      render: (_: unknown, record: PlantTableItem) => (
        <ConfigProvider theme={{ token: { fontSize: 14 } }}>
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => handleDelete(record.key)}
            style={{ fontSize: 14 }}
            cancelText={<CloseOutlined style={{ fontSize: 12 }} />}
            cancelButtonProps={{ className: '!aspect-square !p-0' }}
            okText={<CheckOutlined style={{ fontSize: 12 }} />}
            okButtonProps={{ className: '!aspect-square !p-0' }}
          >
            <DeleteOutlined style={{ fontSize: 16, color: 'red' }} />
          </Popconfirm>
        </ConfigProvider>
      )
    }
  ]

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const columnsWithOnCell = columns.map((col) => ({
    ...col,
    onCell: (record: PlantTableItem) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave
    })
  }))

  const _action = [
    {
      desc: 'Export data',
      icon: <ExportOutlined />,
      onClick: handleExport
    },
    {
      desc: 'Import data',
      icon: <ImportOutlined />
    },
    {
      desc: 'Add a new row',
      icon: <PlusOutlined />,
      onClick: handleAdd
    }
  ]

  return (
    <div>
      <div className='flex justify-between items-end mb-8'>
        <div>
          <span className='text-2xl font-semibold'>Planting Area</span>
          <div className='font-medium text-base mt-3 grid grid-cols-2 gap-x-5'>
            <span>- Total land</span>
            <span>: 3</span>
            <span>- Total planting</span>
            <span>: 2</span>
            <span>- Total vacant</span>
            <span>: 1</span>
          </div>
        </div>
        <div className='flex space-x-5'>
          {_action.map((item, index) => (
            <ConfigProvider theme={{ token: { fontSize: 14 } }}>
              <Upload
                name='file'
                disabled={index != 1}
                accept='.csv,.txt'
                showUploadList={false}
                maxCount={1}
                onChange={handleImport}
                beforeUpload={() => false}
              >
                <Tooltip placement='top' title={item.desc} className='!text-sm'>
                  <ButtonC
                    key={index}
                    onClick={item.onClick}
                    variant='outline'
                    className='!text-base !text-gr !font-medium hover:!text-[#c4d884] !outline-primary !aspect-square group hover:!bg-primary hover:!bg-opacity-100 !delay-0 !duration-75 !p-0 !pr-1'
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: 'group-hover:text-white text-primary'
                    })}
                  </ButtonC>
                </Tooltip>
              </Upload>
            </ConfigProvider>
          ))}

          <ButtonC
            onClick={() => console.log(clear(data))}
            variant='primary'
            className='!text-base !py-4 !px-3 !pr-4'
          >
            Update
          </ButtonC>
        </div>
      </div>
      <Table
        showSorterTooltip={false}
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={data}
        columns={columnsWithOnCell as ColumnType<PlantTableItem>[]}
        pagination={{
          hideOnSinglePage: true,
          showSizeChanger: false
        }}
      />
    </div>
  )
}

const _data = [
  { id: '111212qsd121', name: 'Item 1', total: 100 },
  { id: '2111212qsd12', name: 'Item 2', total: 200 }
]
