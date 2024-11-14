import { Form, message } from 'antd'
import { useEffect, useState } from 'react'

import { IValueSelectC, SelectC, SubmitC, ruleRequired } from '../form'
import { _currents } from '@/assets/options'
import {
  useAppDispatch,
  useAppSelector,
  useHandleError,
  useHandleSuccess
} from '@/hooks'
import { IHandleRecordReq, useGetAllProductQuery } from '@/service/api/product'
import { selectState, setCurrent, setData } from '@/service/store/state'

const _activities = {
  UPDATE: 'Record product update',
  HARVEST: 'Record product harvest',
  DELETE: 'Delete nearest status'
}

export const Product = () => {
  const state = useAppSelector(selectState)
  const dispatch = useAppDispatch()
  const [productList, setProductList] = useState<IValueSelectC[]>()

  const { data, isLoading, error } = useGetAllProductQuery({
    businessId: state.data!.businessId,
    code: state.data!.code
  })

  useHandleError([error], () => dispatch(setCurrent(0)))
  useHandleSuccess(data, false, (data) => {
    setProductList(
      data?.products.map((item) => ({
        value: item._id,
        label:
          item.name +
          (item.current === _currents.HARVESTED ? ' (harvested)' : '')
      }))
    )
  })

  useEffect(() => {
    if (productList && !productList.length) {
      message.error('No product found')
      dispatch(setCurrent(0))
    }
  }, [productList])

  const onFinish = (values: IHandleRecordReq & { type: string }) => {
    const { type, productId, ...rest } = values

    const isHarvested =
      productList
        ?.find((item) => item.value === productId)
        ?.label.split(' ')
        .at(-1) === '(harvested)'

    if (isHarvested) {
      if (type !== 'DELETE') {
        return message.error('This product is harvested')
      } else {
        message.warning('Delete resets to "Planting" and quantity to 0')
      }
    }

    if (type == 'DELETE') {
      rest.isHarvested = -1
    } else if (type == 'HARVEST') {
      rest.isHarvested = 1
    } else {
      rest.isHarvested = 0
    }

    dispatch(setData({ productId: productId.split(' ')[0], ...rest }))
    dispatch(setCurrent(2))
  }

  const handleData = () => {
    if (!state.data?.productId) {
      return
    }

    let type

    if (state.data?.isHarvested === -1) {
      type = 'DELETE'
    } else if (state.data?.isHarvested === 1) {
      type = 'HARVEST'
    } else {
      type = 'UPDATE'
    }

    return { type, productId: state.data?.productId }
  }

  return (
    <div>
      <Form
        className='mx-auto'
        colon={false}
        initialValues={handleData()}
        labelAlign='left'
        labelCol={{ span: 8 }}
        name='form'
        requiredMark={false}
        onFinish={onFinish}
      >
        <SelectC
          label='Activity'
          name='type'
          placeholder='Select your activity'
          rules={ruleRequired}
          value={Object.entries(_activities).map(([key, value]) => ({
            value: key,
            label: value
          }))}
        />
        <SelectC
          label='Product'
          name='productId'
          placeholder='Select your product'
          rules={ruleRequired}
          value={isLoading && !productList ? [] : productList || []}
        />
        <Form.Item className='relative mt-8 flex flex-col items-center'>
          <SubmitC className='!w-fit'>Continue</SubmitC>
          <div
            className='!w-full text-base font-medium !text-primary underline-offset-1 text-center underline cursor-pointer'
            onClick={() => {
              dispatch(setCurrent(0))
              dispatch(setData({ productId: '' } as IHandleRecordReq))
            }}
          >
            Previous
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
