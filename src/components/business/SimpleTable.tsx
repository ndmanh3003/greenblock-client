import React, { useContext, useEffect, useRef, useState } from 'react'
import type { GetRef, InputRef, UploadProps } from 'antd'
import {
  ConfigProvider,
  Form,
  Input,
  Popconfirm,
  Table,
  Tooltip,
  Upload
} from 'antd'
import ButtonC from '../ButtonC'
import {
  DeleteOutlined,
  ImportOutlined,
  ExportOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { arr2obj, obj2arr } from '../../utils'

type FormInstance<T> = GetRef<typeof Form<T>>

const EditableContext = React.createContext<FormInstance<unknown> | null>(null)

export interface Item {
  index: number
  data: unknown
}

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form} key={index}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  dataIndex: keyof Item
  record: Item
  // eslint-disable-next-line no-unused-vars
  handleSave: (record: Item) => void
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...(values as object) })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

interface Editable1RowTableProps {
  data: Item[]
  title: string
}

export const SimpleTable: React.FC<Editable1RowTableProps> = ({
  data,
  title
}) => {
  const [dataSource, setDataSource] = useState<Item[]>(data)

  const [count, setCount] = useState(dataSource.length)

  const handleDelete = (index: number | string) => {
    const newData = dataSource.filter((item) => item.index != index)
    setDataSource(arr2obj(obj2arr(newData)))
  }

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean
    dataIndex: string
  })[] = [
    {
      title: 'No.',
      dataIndex: 'index',
      width: '10%'
    },
    {
      title: 'Data',
      dataIndex: 'data',
      editable: true
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      align: 'center',
      width: '10%',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title='Sure to delete?'
            onConfirm={() => handleDelete(record.index)}
            style={{ fontSize: 14 }}
          >
            <DeleteOutlined style={{ fontSize: 16, color: 'red' }} />
          </Popconfirm>
        ) : null
    }
  ]

  const handleAdd = () => {
    const newData: Item = {
      index: count,
      data: 'Input data'
    }
    setDataSource([...dataSource, newData])
    setCount(count + 1)
  }

  const handleSave = (row: Item) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.index === item.index)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })

  const handleImport: UploadProps['onChange'] = async (info) => {
    const file = info.fileList[0]

    if (file) {
      const data = (await file.originFileObj?.text()) || ''

      const _newdataSource = data?.split('\r\n').filter((item) => item !== '')
      const newdataSource = arr2obj(_newdataSource)
      setDataSource(newdataSource)
    }
  }

  const handleExport = () => {
    const csvContent = obj2arr(dataSource).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const formattedTitle = title.toLocaleLowerCase().replace(/ /g, '_')

    const link = document.createElement('a')
    link.href = url
    link.download = `${formattedTitle}.csv`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

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
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-3xl font-semibold'>{title}</h1>
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
                    className='!text-base !text-primary !font-medium hover:!text-[#c4d884] !outline-primary !aspect-square group hover:!bg-primary hover:!bg-opacity-100 !delay-0 !duration-75 !p-0 !pr-1'
                  >
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: 'group-hover:text-white'
                    })}
                  </ButtonC>
                </Tooltip>
              </Upload>
            </ConfigProvider>
          ))}

          <ButtonC
            onClick={() => console.log(obj2arr(dataSource))}
            variant='primary'
            className='!text-base !font-medium !text-white hover:!text-white !p-2 !px-3 !pr-4'
          >
            Save
          </ButtonC>
        </div>
      </div>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        tableLayout='auto'
        style={{ width: 'auto' }}
        pagination={{
          hideOnSinglePage: true,
          showSizeChanger: false
        }}
      />
    </div>
  )
}
