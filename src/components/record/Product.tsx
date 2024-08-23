import { Form, message } from 'antd'
import { IValueSelectC, ruleRequired, SelectC, SubmitC } from '../form'
import { ButtonC, IRecord, IStatus } from '../../components'
import { useState } from 'react'
import { allCurrent, useGetAllProductQuery } from '../../service/store/product'
import { useHandleError, useHandleSuccess } from '../../hooks'

export const Product = ({ dispatch, state }: IRecord) => {
  const [productList, setProductList] = useState<IValueSelectC[]>()

  const {
    data: dataGetAll,
    // refetch,
    isLoading,
    error
  } = useGetAllProductQuery({
    businessId: state.data?.businessId,
    code: state.data?.code
  })
  useHandleError([error], () =>
    dispatch({ type: 'UPDATE_CURRENT', payload: 0 })
  )
  useHandleSuccess(dataGetAll, false, (data) => {
    if (data.length === 0) {
      dispatch({ type: 'UPDATE_CURRENT', payload: 0 })
      return message.info('No product to handle')
    }
    setProductList(
      data?.map((item) => ({
        value: item._id,
        label:
          item.name +
          (item.current === allCurrent.HARVESTED ? ' (harvested)' : '')
      }))
    )
  })

  const onFinish = (values: IStatus & { type: string }) => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { type, productId, ...rest } = values

    const isHarvested = productList
      ?.find((item) => item.value === productId)
      ?.label.includes('harvested')
    if (isHarvested)
      if (type !== 'DELETE') {
        return message.error('This product is harvested')
      } else message.warning('Delete resets to "Planting" and quantity to 0')

    rest.isHarvested = rest.isDelete = undefined

    if (type == 'DELETE') rest.isDelete = true
    else if (type == 'HARVEST') rest.isHarvested = true
    else rest.isHarvested = false

    dispatch({
      type: 'UPDATE_DATA',
      payload: { productId: productId.split(' ')[0], ...rest }
    })
    dispatch({ type: 'UPDATE_CURRENT', payload: 2 })
    setProductList(undefined)
  }

  const handleData = () => {
    let type = null
    if (state.data?.isDelete == null && state.data?.isHarvested == null)
      type = null
    else if (state.data?.isDelete) type = 'DELETE'
    else if (state.data?.isHarvested) type = 'HARVEST'
    else type = 'UPDATE'
    return {
      productId: state.data?.productId,
      type
    }
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
        initialValues={handleData()}
      >
        <SelectC
          name='type'
          label='Activity'
          placeholder='Select your activity'
          rules={ruleRequired}
          value={Object.entries(_activities).map(([key, value]) => ({
            value: key,
            label: value
          }))}
        />
        <SelectC
          name='productId'
          label='Product'
          placeholder='Select your product'
          rules={ruleRequired}
          value={isLoading ? [] : productList || []}
        />
        <Form.Item className='relative mt-16'>
          <SubmitC className='!w-fit' wrapperCol={8}>
            Continue
          </SubmitC>
          <ButtonC
            variant='primary'
            className='!rounded-xl !w-fit absolute top-0 !text-base !font-medium !text-white hover:!text-white'
            onClick={() => dispatch({ type: 'UPDATE_CURRENT', payload: 0 })}
          >
            Previous
          </ButtonC>
        </Form.Item>
      </Form>
    </div>
  )
}

const _activities = {
  UPDATE: 'Record product update',
  HARVEST: 'Record product harvest',
  DELETE: 'Delete nearest status'
}
