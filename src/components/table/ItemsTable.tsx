import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined
} from '@ant-design/icons'
import {
  ConfigProvider,
  Popconfirm,
  Table,
  Tooltip,
  Upload,
  UploadProps,
  message
} from 'antd'
import { ColumnType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'

import { ButtonC } from '../ButtonC'
import { EditableCell, EditableRow } from '.'
import { _types } from '@/assets/options'
import { useHandleRefetch, useHandleSuccess } from '@/hooks'
import {
  IGetItemReq,
  IItem,
  useGetBatchQuery,
  useUpdateBatchMutation
} from '@/service/api/batch'
import { convertToClientTimezone, initQuery } from '@/utils'

interface IItemsTable {
  name: string
  type: (typeof _types)[number]
}

export const ItemsTable: React.FC<IItemsTable> = (table) => {
  const [query, setQuery] = useState<IGetItemReq>({
    type: table.type,
    ...initQuery
  })
  const [data, setData] = useState<IItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setQuery({
      ...query,
      type: table.type
    })
  }, [table])

  const { data: dataItems, refetch, isLoading } = useGetBatchQuery(query)
  useHandleRefetch(refetch, [query])
  useHandleSuccess(dataItems, false, (data) => {
    setData(data.items)
    setTotal(data.totalItems)
  })

  const { data: dataUpdate, mutate } = useUpdateBatchMutation()
  useHandleSuccess(dataUpdate, false, () => refetch())

  const handleDelete = (_id: string) => {
    mutate({ type: table.type, _id })
  }

  const handleAdd = () => {
    if (data.some((item) => item.name === 'Add new item')) {
      return message.warning('Please save the previous new item')
    }

    const newData: IItem = {
      name: 'Add new item',
      _id: 'new',
      updatedAt: convertToClientTimezone(new Date().toISOString(), 'yyyy-MM-dd')
    }
    setData([...data, newData])
  }

  const handleSave = (row: IItem) => {
    if (row.name === 'Add new item') {
      return
    }

    mutate({
      type: table.type,
      name: row.name,
      ...(row._id !== 'new' ? { _id: row._id } : {})
    })
  }

  const handleExport = () => {
    if (data.length === 0) {
      return message.warning('No data to export')
    }

    const title = 'id,name,updatedAt\n'
    const csvContent = data.reduce((acc, item) => {
      return `${acc}${item._id},${item.name},${item.updatedAt}\n`
    }, title)

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${table.name}.csv`

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

      lines.forEach((line) => {
        const [_id, name] = line.split(',')

        if (!name) {
          return message.error('Invalid data format')
        }
        mutate({
          type: table.type,
          name,
          ...(_id ? { _id } : {})
        })
      })
    }
  }

  const columns = [
    {
      title: 'No.',
      width: '10%',
      editable: false,
      align: 'center',
      render: (_: string, _record: IItem, index: number) =>
        10 * (query?.page ?? 1) + index - 9
    },
    {
      title: 'ID',
      dataIndex: '_id',
      width: '10%',
      editable: false,
      align: 'center',
      render: (_: unknown, record: IItem) => record._id.slice(-5)
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
      title: 'Last Updated',
      width: '20%',
      editable: false,
      align: 'center',
      render: (_: unknown, record: IItem) => {
        return convertToClientTimezone(record.updatedAt, 'yyyy-MM-dd')
      },
      sorter: true,
      onHeaderCell: () => ({
        onClick: () => {
          setQuery({
            ...query,
            order: query.order === 'asc' ? 'desc' : 'asc',
            sortBy: 'updatedAt'
          })
          refetch()
        }
      })
    },

    {
      title: 'Operation',
      dataIndex: 'operation',
      align: 'center',
      width: '10%',
      render: (_: unknown, record: IItem) => (
        <ConfigProvider theme={{ token: { fontSize: 14 } }}>
          <Popconfirm
            cancelButtonProps={{ className: '!aspect-square !p-0' }}
            cancelText={<CloseOutlined style={{ fontSize: 12 }} />}
            okButtonProps={{ className: '!aspect-square !p-0' }}
            okText={<CheckOutlined style={{ fontSize: 12 }} />}
            style={{ fontSize: 14 }}
            title='Sure to delete?'
            onConfirm={() => handleDelete(record._id)}
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
    onCell: (record: IItem) => ({
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
        <div className='text-2xl font-semibold'>{table.name}</div>
        <div className='flex space-x-5'>
          {_action.map((item, index) => (
            <ConfigProvider key={index} theme={{ token: { fontSize: 14 } }}>
              <Upload
                accept='.csv,.txt'
                beforeUpload={() => false}
                disabled={index != 1}
                maxCount={1}
                name='file'
                showUploadList={false}
                onChange={handleImport}
              >
                <Tooltip className='!text-sm' placement='top' title={item.desc}>
                  <ButtonC
                    className='!text-base !text-gr !font-medium hover:!text-[#c4d884] !outline-primary !aspect-square group hover:!bg-primary hover:!bg-opacity-100 !delay-0 !duration-75 !p-0 !pr-1'
                    variant='outline'
                    onClick={item.onClick}
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: 'group-hover:text-white text-primary'
                    })}
                  </ButtonC>
                </Tooltip>
              </Upload>
            </ConfigProvider>
          ))}
        </div>
      </div>
      <div className='text-base mb-2'>Total: {total}</div>
      <Table
        columns={columnsWithOnCell as ColumnType<IItem>[]}
        components={components}
        dataSource={!isLoading ? data : []}
        pagination={{
          showSizeChanger: false,
          total: total,
          onChange: (page) => {
            setQuery({
              ...query,
              page
            })
          }
        }}
        rowClassName={() => 'editable-row'}
        rowKey='_id'
        showSorterTooltip={false}
      />
    </div>
  )
}
