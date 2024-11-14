import { CloseOutlined, EditOutlined } from '@ant-design/icons'
import { Form, Popconfirm } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ButtonC } from '../ButtonC'
import { InputC, ruleRequired } from '../form'
import { _currents } from '@/assets/options'
import { useHandleSuccess } from '@/hooks'
import { useChangeCodeMutation } from '@/service/api/batch'
import {
  IGetStatisticsProductRes,
  useGetStatisticsProduct
} from '@/service/api/product'

export const ProductStatic = () => {
  const [data, setData] = useState<IGetStatisticsProductRes>()

  const navigate = useNavigate()

  const { data: dataStatistics, isLoading, refetch } = useGetStatisticsProduct()
  useHandleSuccess(dataStatistics, false, (data) => setData(data))

  const { mutate, isPending, data: dataChangeCode } = useChangeCodeMutation()
  useHandleSuccess(dataChangeCode, false, () => refetch())

  return (
    <div>
      <h1 className='text-2xl font-semibold'>System Management</h1>
      <h2 className='text-lg font-semibold mt-5'>Secret Code</h2>
      {!isLoading && data && (
        <>
          <Form>
            <InputC
              className='!border-gray-200 w-[500px] !rounded-full'
              defaultValue={data?.code}
              disabled={isPending}
              name='code'
              rules={ruleRequired}
              suffix={
                <Popconfirm
                  cancelButtonProps={{ className: '!aspect-square !p-0' }}
                  cancelText={<CloseOutlined style={{ fontSize: 12 }} />}
                  disabled={isPending || !data.code}
                  okButtonProps={{ className: '!aspect-square !p-0' }}
                  okText={<EditOutlined style={{ fontSize: 12 }} />}
                  style={{ fontSize: 14 }}
                  title='Sure to update?'
                  onConfirm={() => mutate(data.code)}
                >
                  <EditOutlined className='mr-3 text-2xl cursor-pointer hover:!text-primary' />
                </Popconfirm>
              }
              onChange={(e) => setData({ ...data, code: e.target.value })}
            />
          </Form>
          <h2 className='text-lg font-semibold mt-10'>Static Product</h2>
          <div className='font-medium text-base mt-3 grid grid-cols-2 gap-x-5 w-fit'>
            <span className='mb-2'>Total</span>
            <span>: {data.total}</span>
            {Object.values(_currents).map((key) => {
              return (
                <>
                  <span key={key + 'in'}>- In {key}</span>
                  <span key={key}>
                    : {data[key as keyof IGetStatisticsProductRes]}
                  </span>
                </>
              )
            })}
          </div>
        </>
      )}

      <ButtonC
        className='!text-0lg rounded-full !font-medium mt-5'
        variant='primary'
        onClick={() => navigate('product')}
      >
        View and manage product
      </ButtonC>
    </div>
  )
}
