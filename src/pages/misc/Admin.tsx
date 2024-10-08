import React, { useState } from 'react'
import { Button, ConfigProvider, Form, message, Popconfirm, Table } from 'antd'
import type { TableProps } from 'antd'
import { InputC } from '../../components'
import {
  IAccount,
  IGetAllReq,
  useGetAllQuery,
  useVerifyMutation
} from '../../service/store/auth'
import { useHandleError, useHandleRefetch, useHandleSuccess } from '../../hooks'
import { DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'

interface DataType extends IAccount {
  key: string
}

export const Admin: React.FC = () => {
  const [state, setState] = useState<IGetAllReq>({ type: 'business' })
  const [data, setData] = useState<DataType[]>()

  const {
    refetch,
    data: dataGetAll,
    error,
    isLoading
  } = useGetAllQuery({
    type: state.type,
    code: state.code
  })
  useHandleSuccess(dataGetAll, false, (data) =>
    setData(data.map((d) => ({ ...d, key: d._id })))
  )
  useHandleRefetch(refetch, [state], () => !state.type || !state.code)

  const {
    mutate,
    isPending,
    data: dataVerify,
    error: errorVerify
  } = useVerifyMutation()
  useHandleError([error, errorVerify])
  useHandleSuccess(dataVerify, true, () => refetch())

  const onFinish = (values: { token: string }) => {
    const { token } = values
    const [isBusiness, code] = token.split('@//')
    if (!isBusiness || !code) return message.error('Invalid code')

    setState({
      type: Number(isBusiness) ? 'business' : 'inspector',
      code
    } as IGetAllReq)
  }

  const handleVerify = (accountId: string, isVerified: boolean) => {
    mutate({ accountId, isVerified })
  }

  const columns: TableProps<IAccount>['columns'] = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => {
        const type = record.isBusiness ? 'Business' : 'Inspector'
        return type + ': ' + record.name
      }
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '5%',
      render: (_, record) => (
        <a href={`mailto:${record.email}`}>{record.email}</a>
      )
    },
    {
      title: 'Certification',
      dataIndex: 'cert',
      key: 'cert',
      align: 'center',
      width: '10%',
      render: (_, record) => {
        return (
          <a
            href={`${import.meta.env.VITE_GETWAY_IPFS}${record.cert}`}
            target='_blank'
          >
            View
          </a>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '10%',
      render: (_, record) => (
        <div className='mx-5 flex'>
          <Button
            type='link'
            disabled={isPending}
            onClick={() => handleVerify(record._id, true)}
          >
            Verify
          </Button>
          <Popconfirm
            title='Sure to delete?'
            style={{ fontSize: 14 }}
            cancelText={<CloseOutlined style={{ fontSize: 12 }} />}
            cancelButtonProps={{ className: '!aspect-square !p-0' }}
            okText={<CheckOutlined style={{ fontSize: 12 }} />}
            okButtonProps={{ className: '!aspect-square !p-0' }}
            onConfirm={() => handleVerify(record._id, false)}
          >
            <DeleteOutlined style={{ fontSize: 16, color: 'red' }} />
          </Popconfirm>
        </div>
      )
    }
  ]

  return (
    <div className='h-fit mt-10'>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
            colorText: 'black',
            colorTextPlaceholder: '#00000070',
            colorTextDescription: 'gray'
          }
        }}
      >
        <h1 className='text-4xl font-bold'>Admin Verification</h1>
        <Form onFinish={onFinish}>
          <InputC
            type='password'
            name='token'
            className='!border-gray-200 inline-block'
            placeholder='Enter your code'
          />
        </Form>
        <Table
          columns={columns}
          dataSource={!isLoading ? data : []}
          className='mt-1'
        />
      </ConfigProvider>
    </div>
  )
}
