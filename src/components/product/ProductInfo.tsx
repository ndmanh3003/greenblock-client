import { useQueryClient } from '@tanstack/react-query'
import { ConfigProvider, Form, Rate, UploadFile, message } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import {
  BackTopC,
  ButtonC,
  ImageUpload,
  InputC,
  SubmitC,
  TagCurrent,
  TextAreaC,
  Timeline,
  ruleRequired
} from '..'
import { _currents, _roleCurrents } from '@/assets/options'
import { formTableConfig } from '@/config'
import {
  useAppSelector,
  useHandleError,
  useHandleRefetch,
  useHandleSuccess
} from '@/hooks'
import {
  IProduct,
  IStatus,
  IUpdateProductReq,
  useGetProductDetailQuery,
  useUpdateProductMutation
} from '@/service/api/product'
import { selectRole } from '@/service/store/user'
import { cn } from '@/utils'

export const ProductInfo = () => {
  const queryClient = useQueryClient()
  const location = useLocation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams() as { id: string }

  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [hash, setHash] = useState<string[]>([])
  const [product, setProduct] = useState<IProduct>()

  const isBusiness = useAppSelector(selectRole)

  useEffect(() => {
    form.setFieldsValue({
      ...product,
      desc: product?.desc || '',
      inspector: product?.inspector?.name,
      business: product?.business?.name,
      land: product?.land?.name,
      variety: product?.variety?.name
    })
  }, [product, form, navigate, location.pathname])

  const { data, error, isLoading, refetch } = useGetProductDetailQuery(id)
  useHandleRefetch(refetch, [id], () => !id)
  useHandleError([error], () => {
    const newPath = window.location.pathname.replace(/\/[^/]+$/, '')
    navigate(newPath || '/')
  })
  useHandleSuccess(data, false, (data) => {
    if (Array.isArray(data.record)) {
      data.record.forEach((record: IStatus) => {
        if (Array.isArray(record.img)) {
          record.img = record.img.map(
            (imgi) => `${import.meta.env.VITE_GETWAY_IPFS}${imgi}`
          )
        }
      })
    }
    if (data.cert) {
      setFileList([
        {
          uid: '1',
          name: 'certificate',
          status: 'done'
        }
      ])
      setHash([data.cert])
    }
    setProduct(data)
  })

  const { mutate, data: dataUpdate, isPending } = useUpdateProductMutation()
  useHandleSuccess(dataUpdate, false, () => {
    queryClient.invalidateQueries({ queryKey: ['product', 'all'] })
    queryClient.invalidateQueries({ queryKey: ['product', 'detail'] })
  })

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        message.success('Copied to clipboard')
      })
      .catch(() => {
        message.error('Failed to copy!')
      })
  }

  const handleInspect = async (values: IUpdateProductReq) => {
    if (!values.quality || values.quality == 0) {
      return message.error('Quality must be greater than 0')
    }
    if (!hash[0]) {
      return message.error('Please upload certification')
    }
    mutate({
      productId: id,
      current: _currents.INSPECTED,
      quality: values.quality,
      cert: hash[0]
    })
  }

  const handleUpdate = async (_: unknown, isExport?: boolean) => {
    await form.validateFields()

    const values = form.getFieldsValue() as IUpdateProductReq
    const current = isExport ? _currents.EXPORTED : _currents.SOLD
    const update: IUpdateProductReq = {
      productId: id,
      ...(isExport !== undefined && product?.current != current && { current }),
      ...(values.name != product?.name && { name: values.name }),
      ...(values.desc && values.desc != product?.desc && { desc: values.desc })
    }
    if (Object.keys(update).length === 1) {
      return message.error('Do not change anything')
    }
    mutate(update)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ConfigProvider theme={formTableConfig.theme} wave={formTableConfig.wave}>
      <div key={id} className='w-full'>
        <BackTopC />
        {product && (
          <>
            <div
              className='cursor-pointer block w-fit mb-5'
              onClick={copyToClipboard}
            >
              ID: {id}
            </div>

            <div className='text-2xl font-semibold'>
              <span className='mr-2'>Information</span>
              <TagCurrent state={product?.current || 'planting'} />
            </div>
            <Form
              colon={false}
              form={form}
              layout='vertical'
              requiredMark={false}
              onFinish={handleUpdate}
            >
              <InputC
                isOutline
                className='!text-black'
                disabled={!isBusiness}
                label='Prouct Name'
                name='name'
                rules={ruleRequired}
              />
              <TextAreaC
                isOutline
                className='!text-black'
                disabled={!isBusiness}
                label='Description'
                name='desc'
                rules={ruleRequired}
              />
              <div className='grid lg:grid-cols-2 gap-x-5'>
                <InputC
                  disabled
                  isOutline
                  className='!text-black'
                  label='Business'
                  name='business'
                />
                <InputC
                  disabled
                  isOutline
                  className='!text-black'
                  label='Inspector'
                  name='inspector'
                />
                <InputC
                  disabled
                  isOutline
                  className='!text-black'
                  label='Planting Area'
                  name='land'
                />
                <InputC
                  disabled
                  isOutline
                  className='!text-black'
                  label='Cultivated Variety'
                  name='variety'
                />
              </div>
              <div
                className={cn('flex gap-x-5 items-start justify-start', {
                  hidden: !isBusiness
                })}
              >
                {['Export', 'Sold'].map((label, index) => (
                  <ButtonC
                    key={index}
                    className='w-fit rounded-xl !text-base !font-medium !outline-primary mt-[2px] !text-primary !py-[18px]'
                    disabled={isPending}
                    variant='outline'
                    onClick={() => handleUpdate({}, label === 'Export')}
                  >
                    {label}
                  </ButtonC>
                ))}
                <SubmitC
                  className='w-fit !text-base !font-medium rounded-xl'
                  disabled={isPending}
                  variant='primary'
                >
                  Update
                </SubmitC>
              </div>
            </Form>
            <div className='text-2xl font-semibold mt-10'>Inspection</div>
            {(isBusiness || _roleCurrents.business.includes(product.current)) &&
            !product?.cert ? (
              <div className='mt-2'>
                The inspector has not uploaded the certification yet.
              </div>
            ) : (
              <Form
                colon={false}
                initialValues={{ quality: product?.quality }}
                layout='vertical'
                onFinish={handleInspect}
              >
                <div className='grid lg:grid-cols-2 gap-x-5'>
                  <Form.Item label='Quality' name='quality'>
                    <Rate
                      allowClear
                      allowHalf
                      disabled={
                        isBusiness ||
                        _roleCurrents.business.includes(
                          product?.current as string
                        )
                      }
                    />
                  </Form.Item>
                  {isBusiness ||
                  _roleCurrents.business.includes(
                    product?.current as string
                  ) ? (
                    <Form.Item label='Certification'>
                      <div
                        className='cursor-pointer hover:text-primary'
                        onClick={() =>
                          window.open(
                            `${import.meta.env.VITE_GETWAY_IPFS}${hash[0]}`
                          )
                        }
                      >
                        View certification
                      </div>
                    </Form.Item>
                  ) : (
                    <>
                      <ImageUpload
                        className={cn(
                          '!text-black hover:!text-black !bg-transparent !p-0 !mt-0 !shadow-none',
                          (isBusiness ||
                            _roleCurrents.business.includes(
                              product?.current as string
                            )) &&
                            'hidden'
                        )}
                        fileList={fileList}
                        hash={hash}
                        label='Certification'
                        maxCount={1}
                        name='cert'
                        rules={ruleRequired}
                        setFileList={setFileList}
                        setHash={setHash}
                      >
                        Upload
                      </ImageUpload>
                      <div className='flex gap-x-5 items-start col-span-2 justify-start'>
                        <ButtonC
                          className={cn(
                            'w-fit rounded-xl !text-base !font-medium !outline-primary mt-[2px] !text-primary !py-[18px] hidden',
                            product?.current === _currents.HARVESTED && 'flex'
                          )}
                          disabled={isPending}
                          variant='outline'
                          onClick={() =>
                            mutate({
                              productId: id,
                              current: _currents.INSPECTING
                            })
                          }
                        >
                          Inspecting
                        </ButtonC>
                        <SubmitC
                          className='w-fit !text-base !font-medium rounded-xl'
                          disabled={isPending}
                          variant='primary'
                        >
                          Inspect
                        </SubmitC>
                      </div>
                    </>
                  )}
                </div>
              </Form>
            )}
            <div className='text-2xl font-semibold mt-10 mb-2'>
              History Record
            </div>
            {Array.isArray(product?.record) && product?.record.length === 0 ? (
              <div className='mt-2'>No record found for this product yet.</div>
            ) : (
              <Timeline timeline={product?.record as IStatus[]} />
            )}
          </>
        )}
      </div>
    </ConfigProvider>
  )
}
