import { PlusOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { ConfigProvider, Form, Modal, Tooltip } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useState } from 'react'

import { _types } from '@/assets/options'
import { ButtonC } from '@/components/ButtonC'
import {
  IValueSelectC,
  InputC,
  SelectC,
  SubmitC,
  ruleRequired
} from '@/components/form'
import { formTableConfig } from '@/config'
import { useHandleSuccess } from '@/hooks'
import { useGetAllQuery } from '@/service/api/auth'
import { useGetBatchQuery } from '@/service/api/batch'
import {
  ICreateProductReq,
  useCreateProductMutation
} from '@/service/api/product'

const arr2select = (arr: { _id: string; name: string }[]) =>
  arr.map((item) => ({ value: item._id, label: item.name }))

export const CreateProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectOptions, setSelectOptions] = useState<{
    inspectors: IValueSelectC[]
    variaties: IValueSelectC[]
    lands: IValueSelectC[]
  }>({
    inspectors: [],
    variaties: [],
    lands: []
  })

  const [form] = useForm()
  const queryClient = useQueryClient()

  const { data: dataInspectors, isLoading: isLoadingInspectors } =
    useGetAllQuery({ type: 'inspector' })
  useHandleSuccess(dataInspectors, false, (data) => {
    setSelectOptions((prev) => ({ ...prev, inspectors: arr2select(data) }))
  })

  const { data: dataLands, isLoading: isLoadingLands } = useGetBatchQuery({
    type: _types[0]
  })
  useHandleSuccess(dataLands, false, (data) => {
    setSelectOptions((prev) => ({ ...prev, lands: arr2select(data.items) }))
  })

  const { data: dataVarieties, isLoading: isLoadingVarieties } =
    useGetBatchQuery({ type: _types[1] })
  useHandleSuccess(dataVarieties, false, (data) => {
    setSelectOptions((prev) => ({ ...prev, variaties: arr2select(data.items) }))
  })

  const { data: dataCreate, isPending, mutate } = useCreateProductMutation()
  useHandleSuccess(dataCreate, false, () => {
    form.resetFields()
    queryClient.invalidateQueries({ queryKey: ['product', 'all'] })
  })

  const onFinish = (values: ICreateProductReq) => {
    mutate({ ...values })
  }

  return (
    <ConfigProvider theme={formTableConfig.theme} wave={formTableConfig.wave}>
      <Modal
        footer={() => <></>}
        height={300}
        open={isModalOpen}
        width={800}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className='text-black m-5 text-base'>
          <h1 className='text-2xl font-semibold text-green2 mb-5'>
            Create a new product
          </h1>
          <div className='max-h-[50vh] overflow-auto pr-2'>
            <Form
              form={form}
              layout='vertical'
              requiredMark={false}
              onFinish={onFinish}
            >
              <InputC
                isOutline
                label='Product Name'
                name='name'
                rules={ruleRequired}
              />
              <div className='grid grid-cols-2 gap-x-5'>
                <SelectC
                  isOutline
                  className='!text-black !bg-white'
                  colorDropdown='white'
                  colorIcon='#acadad'
                  label='Planting Area'
                  name='landId'
                  rules={ruleRequired}
                  value={isLoadingLands ? [] : selectOptions.lands || []}
                />
                <SelectC
                  isOutline
                  className='!text-black !bg-white'
                  colorDropdown='white'
                  colorIcon='#acadad'
                  label='Cultivated Variety'
                  name='varietyId'
                  rules={ruleRequired}
                  value={
                    isLoadingVarieties ? [] : selectOptions.variaties || []
                  }
                />
                <SelectC
                  isOutline
                  className='!text-black !bg-white'
                  colorDropdown='white'
                  colorIcon='#acadad'
                  label='Inspector'
                  name='inspectorId'
                  rules={ruleRequired}
                  value={
                    isLoadingInspectors ? [] : selectOptions.inspectors || []
                  }
                />
              </div>
              <SubmitC
                className='w-fit !text-base !font-medium rounded-xl'
                loading={isPending}
                variant='primary'
              >
                Create
              </SubmitC>
            </Form>
          </div>
        </div>
      </Modal>
      <Tooltip
        className='!text-sm'
        placement='top'
        title={'Create a new product'}
      >
        <ButtonC
          className='!text-base !text-gr !font-medium !text-primary !outline-primary !aspect-square group !delay-0 !duration-75 !p-0 !pr-1 !rounded-full'
          variant='outline'
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined />
        </ButtonC>
      </Tooltip>
    </ConfigProvider>
  )
}
