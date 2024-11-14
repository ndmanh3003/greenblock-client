import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Form, Popconfirm, Table, message } from 'antd'
import type { TableProps } from 'antd'
import React, { useState } from 'react'

import { _roles } from '@/assets/options'
import { InputC } from '@/components'
import { useHandleRefetch, useHandleSuccess } from '@/hooks'
import {
  IAccount,
  IGetAllReq,
  useGetAllQuery,
  useVerifyMutation
} from '@/service/api/auth'

interface DataType extends IAccount {
  key: string
}

export const Admin: React.FC = () => {
  const [state, setState] = useState<IGetAllReq>({ type: _roles[0] })
  const [data, setData] = useState<DataType[]>()

  const {
    refetch,
    data: dataGetAll,
    isLoading
  } = useGetAllQuery({
    type: state.type,
    code: state?.code
  })
  useHandleSuccess(dataGetAll, false, (data) =>
    setData(data.map((d) => ({ ...d, key: d._id })))
  )
  useHandleRefetch(refetch, [state], () => !state.type || !state.code)

  const { mutate, isPending, data: dataVerify } = useVerifyMutation()
  useHandleSuccess(dataVerify, 'Verified', () => refetch())

  const onFinish = (values: { token: string }) => {
    const { token } = values
    const [isBusiness, code] = token.split('@//')
    if (!isBusiness || !code) {
      return message.error('Invalid code')
    }

    setState({
      type: _roles[Number(isBusiness)],
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
      render: (_, record) => (
        <a href={record.cert} rel='noreferrer' target='_blank'>
          View
        </a>
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '10%',
      render: (_, record) => (
        <div className='mx-5 flex'>
          <Button
            disabled={isPending}
            type='link'
            onClick={() => handleVerify(record._id, true)}
          >
            Verify
          </Button>
          <Popconfirm
            cancelButtonProps={{ className: '!aspect-square !p-0' }}
            cancelText={<CloseOutlined style={{ fontSize: 12 }} />}
            okButtonProps={{ className: '!aspect-square !p-0' }}
            okText={<CheckOutlined style={{ fontSize: 12 }} />}
            style={{ fontSize: 14 }}
            title='Sure to delete?'
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
            className='!border-gray-200 inline-block'
            name='token'
            placeholder='Enter your code'
            type='password'
          />
        </Form>
        <Table
          className='mt-1'
          columns={columns}
          dataSource={!isLoading && state?.code ? data : []}
        />
      </ConfigProvider>
    </div>
  )
}
