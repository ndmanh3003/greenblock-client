/* eslint-disable indent */
import { ConfigProvider, Form, message, Rate, UploadFile } from 'antd'
import {
  InputC,
  IpfsUpload,
  ruleRequired,
  TextAreaC,
  TagCurrent,
  Timeline,
  SubmitC,
  ButtonC,
  BackTopC,
  SelectC,
  IValueSelectC,
  ruleNumber
} from '.'
import { useEffect, useState } from 'react'
import {
  allCurrent,
  IProduct,
  IStatus,
  IUpdateProductReq,
  roleCurrent,
  useGetProductDetailQuery,
  useUpdateProductMutation
} from '../service/store/product'
import { useHandleError, useHandleRefetch, useHandleSuccess } from '../hooks'
import { cn } from '../utils'
import { useNavigate, useParams } from 'react-router-dom'
import { Routes } from '../routes'
import { useGetAllQuery } from '../service/store/auth'
import { useQueryClient } from '@tanstack/react-query'

export const ProductInfo = () => {
  const queryClient = useQueryClient()
  const { id } = useParams() as { id: string }
  const [form] = Form.useForm()
  const [isBusiness, setIsBusiness] = useState<boolean>(true)
  const [hash, setHash] = useState<string[]>([])
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [product, setProduct] = useState<IProduct>()
  const [inspector, setInspector] = useState<IValueSelectC[]>()

  useEffect(() => {
    if (
      !window.location.pathname.includes(Routes.BUSINESS) &&
      !window.location.pathname.includes(Routes.INSPECTOR) &&
      product &&
      !roleCurrent.business.includes(product.current)
    ) {
      navigate(Routes.HOMEPAGE)
      return message.error('Product not ready for tracibility')
    }
    if (window.location.pathname.includes(Routes.BUSINESS)) setIsBusiness(true)
    else setIsBusiness(false)

    form.setFieldsValue({
      ...product,
      desc: product?.desc || '',
      inspector: product?.inspector?._id,
      business: product?.business?.name,
      inspectorName: product?.inspector?.name
    })
  }, [product, form, navigate])

  const {
    data,
    error,
    isLoading,
    refetch: fetchDetail
  } = useGetProductDetailQuery(id)
  useHandleRefetch(fetchDetail, [id], () => !id)
  useHandleError([error], () => {
    const newPath = window.location.pathname.replace(/\/[^/]+$/, '')
    navigate(newPath || '/')
  })
  useHandleSuccess(data, false, (data) => {
    if (Array.isArray(data.record)) {
      data.record.forEach((record: IStatus) => {
        if (Array.isArray(record.img))
          record.img = record.img.map(
            (imgi) => `${import.meta.env.VITE_GETWAY_IPFS}${imgi}`
          )
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

  const {
    mutate,
    data: dataUpdate,
    error: errorUpdate,
    isPending
  } = useUpdateProductMutation()
  useHandleSuccess(dataUpdate, true, () => {
    queryClient.invalidateQueries({ queryKey: ['allproduct'] })
    queryClient.invalidateQueries({ queryKey: ['detail'] })
  })

  const {
    data: dataInspectors,
    error: errorInspectors,
    isLoading: isLoadingInspectors,
    refetch
  } = useGetAllQuery({
    type: 'inspector'
  })
  useHandleError([errorUpdate, errorInspectors])
  useHandleSuccess(dataInspectors, false, (data) => {
    const value = data.map((item) => ({
      value: item._id,
      label: item.name
    })) as IValueSelectC[]
    setInspector(value)
  })
  useHandleRefetch(refetch)

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
    if (!values.quality || values.quality == 0)
      return message.error('Quality must be greater than 0')
    if (!hash[0]) return message.error('Please upload certification')
    mutate({
      productId: id,
      current: allCurrent.INSPECTED,
      quality: values.quality,
      cert: hash[0]
    })
  }

  const handleUpdate = async (_inputValues: unknown, isExport?: boolean) => {
    await form.validateFields()

    const values = form.getFieldsValue() as IUpdateProductReq
    const current = isExport ? allCurrent.EXPORTED : allCurrent.SOLD

    const update: IUpdateProductReq = {
      productId: id,
      ...(isExport !== undefined &&
        product?.current !== current && { current }),
      ...(values.name !== product?.name && { name: values.name }),
      ...(values.desc !== product?.desc && { desc: values.desc }),
      ...(values.quantityOut !== product?.quantityOut && {
        quantityOut: values.quantityOut
      }),
      ...(values.inspector !== product?.inspector._id && {
        inspector: values.inspector
      })
    }

    if (Object.keys(update).length === 1) return message.error('No change')
    mutate(update)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <ConfigProvider
      wave={{ disabled: true }}
      theme={{
        token: {
          colorText: 'black',
          colorTextDescription: 'black'
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
      <div className='w-full' key={id}>
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
              layout='vertical'
              requiredMark={false}
              form={form}
              onFinish={handleUpdate}
            >
              <InputC
                label='Prouct Name'
                name='name'
                isOutline
                disabled={!isBusiness}
                className='!text-black'
                rules={ruleRequired}
              />
              <TextAreaC
                label='Description'
                name='desc'
                isOutline
                disabled={!isBusiness}
                className='!text-black'
                {...(product?.current !== allCurrent.PLANTING && {
                  rules: ruleRequired
                })}
              />
              <div className='grid lg:grid-cols-2 gap-x-5'>
                <InputC
                  label='Business'
                  name='business'
                  isOutline
                  disabled
                  className='!text-black'
                />
                {roleCurrent.farmer.includes(product.current) ? (
                  <SelectC
                    label='Inspector'
                    name='inspector'
                    isOutline
                    colorDropdown='white'
                    className='!text-black'
                    value={isLoadingInspectors ? [] : inspector || []}
                    colorIcon='#acadad'
                  />
                ) : (
                  <InputC
                    label='Inspector'
                    name='inspectorName'
                    isOutline
                    disabled
                    className='!text-black'
                  />
                )}

                <InputC
                  label='Planting Area'
                  name='land'
                  isOutline
                  disabled
                  className='!text-black'
                />
                <InputC
                  label='Cultivated Variety'
                  name='variety'
                  isOutline
                  disabled
                  className='!text-black'
                />
                <InputC
                  label='Quantity In'
                  name='quantityIn'
                  isOutline
                  disabled
                  className='!text-black'
                />
                <InputC
                  label='Quantity Out'
                  name='quantityOut'
                  isOutline
                  disabled={
                    !isBusiness || product?.current === allCurrent.PLANTING
                  }
                  className='!text-black'
                  {...(product?.current !== allCurrent.PLANTING && {
                    rules: ruleNumber
                  })}
                />
              </div>
              <div
                className={cn('flex gap-x-5 items-start justify-start', {
                  hidden: !isBusiness
                })}
              >
                <ButtonC
                  disabled={isPending}
                  variant='outline'
                  className={cn(
                    'w-fit rounded-xl !text-base !font-medium !outline-primary mt-[2px] !text-primary !py-[18px]',
                    {
                      hidden: product?.current === allCurrent.PLANTING
                    }
                  )}
                  onClick={() => handleUpdate({}, true)}
                >
                  Export
                </ButtonC>
                <ButtonC
                  disabled={isPending}
                  variant='outline'
                  className={cn(
                    'w-fit rounded-xl !text-base !font-medium !outline-primary mt-[2px] !text-primary !py-[18px]',
                    {
                      hidden: product?.current === allCurrent.PLANTING
                    }
                  )}
                  onClick={() => handleUpdate({}, false)}
                >
                  Sold
                </ButtonC>
                <SubmitC
                  className='w-fit !text-base !font-medium rounded-xl'
                  variant='primary'
                  disabled={isPending}
                >
                  Update
                </SubmitC>
              </div>
            </Form>
            <div className='text-2xl font-semibold mt-10'>Inspection</div>
            {(isBusiness || roleCurrent.business.includes(product.current)) &&
            !product?.cert ? (
              <div className='mt-2'>
                The inspector has not uploaded the certification yet.
              </div>
            ) : (
              <Form
                colon={false}
                layout='vertical'
                onFinish={handleInspect}
                initialValues={{ quality: product?.quality }}
              >
                <div className='grid lg:grid-cols-2 gap-x-5'>
                  <Form.Item name='quality' label='Quality'>
                    <Rate
                      allowClear
                      allowHalf
                      disabled={
                        isBusiness ||
                        roleCurrent.business.includes(
                          product?.current as string
                        )
                      }
                    />
                  </Form.Item>
                  {isBusiness ||
                  roleCurrent.business.includes(product?.current as string) ? (
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
                      <IpfsUpload
                        setHash={setHash}
                        fileList={fileList}
                        setFileList={setFileList}
                        hash={hash}
                        name='cert'
                        maxCount={1}
                        rules={ruleRequired}
                        className={cn(
                          '!text-black hover:!text-black !bg-transparent !p-0 !mt-0 !shadow-none',
                          (isBusiness ||
                            roleCurrent.business.includes(
                              product?.current as string
                            )) &&
                            'hidden'
                        )}
                        label='Certification'
                      >
                        Upload
                      </IpfsUpload>
                      <div className='flex gap-x-5 items-start col-span-2 justify-start'>
                        <ButtonC
                          disabled={isPending}
                          variant='outline'
                          className={cn(
                            'w-fit rounded-xl !text-base !font-medium !outline-primary mt-[2px] !text-primary !py-[18px] hidden',
                            product?.current === allCurrent.HARVESTED && 'flex'
                          )}
                          onClick={() =>
                            mutate({
                              productId: id,
                              current: allCurrent.INSPECTING
                            })
                          }
                        >
                          Inspecting
                        </ButtonC>
                        <SubmitC
                          className='w-fit !text-base !font-medium rounded-xl'
                          variant='primary'
                          disabled={isPending}
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
