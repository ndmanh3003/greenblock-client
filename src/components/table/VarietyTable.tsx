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
import {
  IItem,
  useGetBatchQuery,
  useUpdateBatchMutation
} from '../../service/store/batch'
import { useHandleError, useHandleSuccess } from '../../hooks'

interface VarietyTableItem extends Omit<IItem, '_id' | 'metadata'> {
  key: string
  _id?: string
  quantity: number
}

export const VarietyTable: React.FC = () => {
  const [data, setData] = useState<VarietyTableItem[]>(
    keyGen([]) as VarietyTableItem[]
  )
  const [total, setTotal] = useState({ empty: 0, available: 0 })

  const {
    data: dataItems,
    refetch,
    error,
    isLoading
  } = useGetBatchQuery('variety')
  useHandleSuccess(dataItems, false, (data) => {
    const update = data.items.map((item) => {
      return {
        ...item,
        quantity: item.metadata.quantity || 0
      }
    })
    setData(keyGen(update) as VarietyTableItem[])
    setTotal({ empty: data.empty, available: data.available || 0 })
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

    const newData: VarietyTableItem = {
      name: 'Add new item',
      quantity: 0,
      product: [],
      key: uuidv4()
    }
    setData([...data, newData])
  }

  const handleSave = (row: VarietyTableItem) => {
    const newData = [...data]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, { ...item, ...row })
    setData(newData)
  }

  const handleExport = () => {
    clear(data)

    if (data.length === 0) return message.warning('No data to export')

    const title = 'id,name,quantity\n'
    const csvContent = data.reduce((acc, item) => {
      return `${acc}${item._id},${item.name},${item.quantity}\n`
    }, title)

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'variety.csv'

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
        const [id, name, quantity] = line.split(',')
        return {
          ...(id && { itemId: id }),
          ...(name && { name }),
          ...(quantity && { quantity: Number(quantity) })
        }
      })
      mutate({ type: 'variety', items: newData })
    }
  }

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      width: '10%',
      editable: false,
      align: 'center',
      render: (_: unknown, record: VarietyTableItem) => {
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
      title: (
        <>
          <EditOutlined className='!pr-2' />
          Quantity
        </>
      ),
      dataIndex: 'quantity',
      width: '18%',
      editable: true,
      isNumber: true,
      align: 'center',
      sorter: (a: VarietyTableItem, b: VarietyTableItem) =>
        a.quantity - b.quantity
    },
    {
      title: 'Total',
      width: '15%',
      editable: false,
      align: 'center',
      render: (_: unknown, record: VarietyTableItem) => {
        return record.product.length
      },
      sorter: (a: VarietyTableItem, b: VarietyTableItem) =>
        a.product.length - b.product.length
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      align: 'center',
      width: '10%',
      render: (_: unknown, record: VarietyTableItem) => (
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
    onCell: (record: VarietyTableItem) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      isNumber: col.isNumber,
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
          <span className='text-2xl font-semibold'>Cultivated Variety</span>
          <div className='font-medium text-base mt-3 grid grid-cols-2 gap-x-5'>
            <span>- Total variety</span>
            <span>: {total.empty + total.available}</span>
            <span>- Total available</span>
            <span>: {total.available}</span>
            <span>- Total out of stock</span>
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
                itemId: item._id,
                quantity: item.quantity
              }))
              mutate({ type: 'variety', items })
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
        columns={columnsWithOnCell as ColumnType<VarietyTableItem>[]}
        pagination={{
          hideOnSinglePage: true,
          showSizeChanger: false
        }}
      />
    </div>
  )
}
