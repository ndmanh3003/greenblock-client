import { ConfigProvider, Form, Modal, Tooltip } from 'antd'
import { useState } from 'react'
import { ButtonC } from './ButtonC'
import { PlusOutlined } from '@ant-design/icons'
import {
  InputC,
  IValueSelectC,
  ruleNumber,
  ruleRequired,
  SelectC,
  SubmitC
} from './form'
import { useGetAllQuery } from '../service/store/auth'
import { useHandleError, useHandleRefetch, useHandleSuccess } from '../hooks'
import { useGetBatchQuery } from '../service/store/batch'
import {
  ICreateProductReq,
  useCreateProductMutation
} from '../service/store/product'
import { useForm } from 'antd/es/form/Form'
import { useQueryClient } from '@tanstack/react-query'

export const CreateProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inspectors, setInspectors] = useState<IValueSelectC[]>([])
  const [variaties, setVarieties] = useState<IValueSelectC[]>([])
  const [lands, setLands] = useState<IValueSelectC[]>([])
  const [form] = useForm()
  const queryClient = useQueryClient()

  const {
    data: dataInspectors,
    error: errorInspectors,
    isLoading: isLoadingInspectors,
    refetch: fetchInspectors
  } = useGetAllQuery({
    type: 'inspector'
  })
  useHandleSuccess(dataInspectors, false, (data) => {
    const value = data.map((item) => ({
      value: item._id,
      label: item.name
    })) as IValueSelectC[]
    setInspectors(value)
  })
  useHandleRefetch(fetchInspectors)

  const {
    data: dataLands,
    error: errorLands,
    isLoading: isLoadingLands,
    refetch: fetchLands
  } = useGetBatchQuery('land')
  useHandleRefetch(fetchLands)
  useHandleSuccess(dataLands, false, (data) => {
    const value = data.items.map((item) => ({
      value: item._id,
      label: item.name
    })) as IValueSelectC[]
    setLands(value)
  })

  const {
    data: dataVarieties,
    error: errorVarieties,
    isLoading: isLoadingVarieties,
    refetch: fetchVarieties
  } = useGetBatchQuery('variety')
  useHandleRefetch(fetchVarieties)
  useHandleSuccess(dataVarieties, false, (data) => {
    const value = data.items.map((item) => ({
      value: item._id,
      label: item.name
    })) as IValueSelectC[]
    setVarieties(value)
  })

  const {
    data: dataCreate,
    error,
    isPending,
    mutate
  } = useCreateProductMutation()
  useHandleSuccess(dataCreate, true, () => {
    form.resetFields()
    queryClient.invalidateQueries({ queryKey: ['allproduct'] })
  })

  const onFinish = (values: ICreateProductReq) => {
    mutate({ ...values })
  }

  useHandleError([errorInspectors, errorLands, errorVarieties, error])

  return (
    <ConfigProvider
      wave={{ disabled: true }}
      theme={{
        token: {
          colorText: 'black',
          colorTextDescription: 'black',
          colorIcon: 'black'
        },
        components: {
          Form: {
            labelColor: 'black',
            labelFontSize: 18,
            marginLG: 27
          },
          Select: {
            optionSelectedColor: '#21BA43',
            selectorBg: 'transparent',
            paddingContentHorizontal: 20,
            optionFontSize: 16,
            optionSelectedBg: 'rgba(218, 216, 216, 0.2)'
          }
        }
      }}
    >
      <Modal
        width={800}
        height={300}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={() => <></>}
      >
        <div className='text-black m-5 text-base'>
          <h1 className='text-2xl font-semibold text-green2 mb-5'>
            Create a new product
          </h1>
          <div className='max-h-[50vh] overflow-auto pr-2'>
            <Form
              layout='vertical'
              requiredMark={false}
              form={form}
              onFinish={onFinish}
            >
              <InputC
                name='name'
                isOutline
                label='Product Name'
                rules={ruleRequired}
              />
              <div className='grid grid-cols-2 gap-x-5'>
                <SelectC
                  label='Inspector'
                  name='inspector'
                  isOutline
                  colorDropdown='white'
                  className='!text-black !bg-white'
                  value={isLoadingInspectors ? [] : inspectors || []}
                  colorIcon='#acadad'
                  rules={ruleRequired}
                />
                <InputC
                  name='quantityIn'
                  isOutline
                  label='Quantity In'
                  rules={ruleNumber}
                />
                <SelectC
                  label='Planting Area'
                  name='land'
                  isOutline
                  colorDropdown='white'
                  className='!text-black !bg-white'
                  value={isLoadingLands ? [] : lands || []}
                  colorIcon='#acadad'
                  rules={ruleRequired}
                />
                <SelectC
                  label='Cultivated Variety'
                  name='variety'
                  isOutline
                  colorDropdown='white'
                  className='!text-black !bg-white'
                  value={isLoadingVarieties ? [] : variaties || []}
                  colorIcon='#acadad'
                  rules={ruleRequired}
                />
              </div>
              <SubmitC
                className='w-fit !text-base !font-medium rounded-xl'
                variant='primary'
                loading={isPending}
              >
                Create
              </SubmitC>
            </Form>
          </div>
        </div>
      </Modal>
      <Tooltip
        placement='top'
        title={'Create a new product'}
        className='!text-sm'
      >
        <ButtonC
          variant='outline'
          className='!text-base !text-gr !font-medium !text-primary !outline-primary !aspect-square group !delay-0 !duration-75 !p-0 !pr-1 !rounded-full'
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined />
        </ButtonC>
      </Tooltip>
    </ConfigProvider>
  )
}
