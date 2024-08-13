import { Form } from 'antd'
import {
  InputC,
  ruleRequired,
  SelectC,
  SubmitC,
  IStatus,
  IRecord,
  IValueSelectC
} from '../../components'
import { useGetAllQuery } from '../../service/store/auth'
import { useState } from 'react'
import { useHandleError, useHandleSuccess } from '../../hooks'
import { tokensStorage } from '../../service/localStorage'
import { useHandleRefetch } from '../../hooks/useHandleRefetch'

export const Hr = ({ dispatch, state }: IRecord) => {
  const [businessList, setBusinessList] = useState<IValueSelectC[]>()

  const {
    data: dataBusiness,
    error,
    isLoading,
    refetch
  } = useGetAllQuery({ type: 'business' })
  useHandleError([error])
  useHandleSuccess(dataBusiness, false, (data) => {
    const value = data.map((item) => ({
      value: item._id,
      label: item.name
    })) as IValueSelectC[]
    setBusinessList(value)
  })
  useHandleRefetch(refetch)

  const onFinish = async (values: IStatus) => {
    await tokensStorage.removeToken()
    dispatch({ type: 'UPDATE_DATA', payload: values })
    dispatch({ type: 'UPDATE_CURRENT', payload: 1 })
  }

  return (
    <div>
      <Form
        className='mx-auto'
        name='form'
        labelCol={{ span: 8 }}
        labelAlign='left'
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
        colon={false}
        initialValues={state.data || {}}
      >
        <InputC
          name='code'
          label='Code'
          rules={ruleRequired}
          placeholder='Input your company code'
        />
        <SelectC
          name='businessId'
          label='Company'
          placeholder='Select your company'
          rules={ruleRequired}
          value={isLoading ? [] : businessList || []}
        />
        <SubmitC className='!w-fit mt-2' wrapperCol={8}>
          Continue
        </SubmitC>
      </Form>
    </div>
  )
}
