import { Form } from 'antd'
import { useState } from 'react'

import {
  IValueSelectC,
  InputC,
  SelectC,
  SubmitC,
  ruleRequired
} from '@/components'
import {
  useAppDispatch,
  useAppSelector,
  useHandleRefetch,
  useHandleSuccess
} from '@/hooks'
import { useGetAllQuery } from '@/service/api/auth'
import { IHandleRecordReq } from '@/service/api/product'
import { selectState, setCurrent, setData } from '@/service/store/state'

export const Hr = () => {
  const state = useAppSelector(selectState)
  const dispatch = useAppDispatch()
  const [businessList, setBusinessList] = useState<IValueSelectC[]>()

  const { data, isLoading, refetch } = useGetAllQuery({ type: 'business' })
  useHandleSuccess(data, false, (data) => {
    const value = data.map((item) => ({
      value: item._id,
      label: item.name
    }))
    setBusinessList(value)
  })
  useHandleRefetch(refetch)

  const onFinish = async (values: IHandleRecordReq) => {
    dispatch(setCurrent(1))
    dispatch(setData(values))
  }

  return (
    <div>
      <Form
        className='mx-auto'
        colon={false}
        initialValues={state.data || {}}
        labelAlign='left'
        labelCol={{ span: 8 }}
        name='form'
        requiredMark={false}
        onFinish={onFinish}
      >
        <InputC
          label='Code'
          name='code'
          placeholder='Input your company code'
          rules={ruleRequired}
        />
        <SelectC
          label='Company'
          name='businessId'
          placeholder='Select your company'
          rules={ruleRequired}
          value={isLoading ? [] : businessList || []}
        />
        <Form.Item className='relative mt-8 flex flex-col items-center'>
          <SubmitC className='!w-fit mt-2'>Continue</SubmitC>
        </Form.Item>
      </Form>
    </div>
  )
}
