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
      message.info('No product to handle')
      return
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
        message.error('This product is harvested')
        return
      } else message.warning('Delete resets to "Planting" and quantity to 0')

    rest.isHarvested = rest.isDeleted = undefined

    if (type == 'DELETE') rest.isDeleted = true
    else if (type == 'HARVEST') rest.isHarvested = true
    else rest.isHarvested = false

    dispatch({
      type: 'UPDATE_DATA',
      payload: { productId: productId.split(' ')[0], ...rest }
    })
    dispatch({ type: 'UPDATE_CURRENT', payload: 2 })
    setProductList(undefined)
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
        <SelectC
          name='type'
          label='Activity'
          placeholder='Select your activity'
          rules={ruleRequired}
          value={Object.entries(_activities).map(([key, value]) => ({
            value: key,
            label: value
          }))}
          defaultValue={() => {
            if (
              state.data?.isDeleted == null &&
              state.data?.isHarvested == null
            )
              return null
            if (state.data?.isDeleted) return 2
            if (state.data?.isHarvested) return 1
            return 0
          }}
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
