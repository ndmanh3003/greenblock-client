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
import { useHandleError, useHandleSuccess } from '../../hooks'
import {
  IItem,
  useGetBatchQuery,
  useUpdateBatchMutation
} from '../../service/store/batch'
import { useHandleRefetch } from '../../hooks/useHandleRefetch'

interface LandTableItem extends Omit<IItem, '_id' | 'metadata'> {
  key: string
  _id?: string
}

export const LandTable: React.FC = () => {
  const [data, setData] = useState<LandTableItem[]>(
    keyGen([]) as LandTableItem[]
  )
  const [total, setTotal] = useState({ empty: 0, planting: 0 })

  const {
    data: dataItems,
    refetch,
    error,
    isLoading
  } = useGetBatchQuery('land')
  useHandleRefetch(refetch)
  useHandleSuccess(dataItems, false, (data) => {
    setData(keyGen(data.items) as LandTableItem[])
    setTotal({ empty: data.empty, planting: data.planting || 0 })
  })

  const {
    data: dataUpdate,
    mutate,
    error: errorUpdate,
    isPending
  } = useUpdateBatchMutation()
  useHandleError([error, errorUpdate])
  useHandleSuccess(dataUpdate, true, () => refetch())

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key))
  }

  const handleAdd = () => {
    if (data.some((item) => item.name === 'Add new item'))
      return message.warning('Please save the previous new item')

    const newData: LandTableItem = {
      name: 'Add new item',
      product: [],
      key: uuidv4()
    }
    setData([...data, newData])
  }

  const handleSave = (row: LandTableItem) => {
    const newData = [...data]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setData(newData)
  }

  const handleExport = () => {
    clear(data)

    if (data.length === 0) return message.warning('No data to export')

    const title = 'id,name\n'
    const csvContent = data.reduce((acc, item) => {
      return `${acc}${item._id},${item.name}\n`
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
          ...(id && { itemId: id }),
          ...(name && { name })
        }
      })
      mutate({ type: 'land', items: newData })
    }
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      width: '10%',
      editable: false,
      align: 'center',
      render: (_: unknown, record: LandTableItem) => {
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
      width: '15%',
      editable: false,
      align: 'center',
      render: (_: unknown, record: LandTableItem) => {
        return record.product.length
      },
      sorter: (a: LandTableItem, b: LandTableItem) =>
        a.product.length - b.product.length
    },

    {
      title: 'Operation',
      dataIndex: 'operation',
      align: 'center',
      width: '10%',
      render: (_: unknown, record: LandTableItem) => (
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
    onCell: (record: LandTableItem) => ({
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
          <span className='text-2xl font-semibold'>Landing Area</span>
          <div className='font-medium text-base mt-3 grid grid-cols-2 gap-x-5'>
            <span>- Total land</span>
            <span>: {total.empty + total.planting}</span>
            <span>- Total planting</span>
            <span>: {total.planting}</span>
            <span>- Total vacant</span>
            <span>: {total.empty}</span>
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
            onClick={() => {
              const items = clear(data).map((item) => ({
                name: item.name,
                itemId: item._id
              }))
              mutate({ type: 'land', items })
            }}
            variant='primary'
            className='!text-base !py-4 !px-3 !pr-4'
            loading={isPending}
          >
            Update
          </ButtonC>
        </div>
      </div>
      <Table
        showSorterTooltip={false}
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={!isLoading ? data : []}
        columns={columnsWithOnCell as ColumnType<LandTableItem>[]}
        pagination={{
          hideOnSinglePage: true,
          showSizeChanger: false
        }}
      />
    </div>
  )
}
