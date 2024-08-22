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
  ButtonC
} from '.'
import { useState } from 'react'
import {
  allCurrent,
  IProduct,
  IStatus,
  roleCurrent,
  useGetProductDetailQuery
} from '../service/store/product'
import { useHandleError, useHandleSuccess } from '../hooks'
import { cn } from '../utils'
import { useNavigate } from 'react-router-dom'

export const ProductInfo = ({
  id,
  isBusiness
}: {
  id: string
  isBusiness: boolean
}) => {
  const [hash, setHash] = useState<string[]>([])
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [product, setProduct] = useState<IProduct>()

  const { data, error, isLoading } = useGetProductDetailQuery(id)
  useHandleError([error], () => navigate(0))
  useHandleSuccess(data, false, (data) => {
    if (Array.isArray(data.record)) {
      data.record.forEach((record: IStatus) => {
        if (Array.isArray(record.img))
          record.img = record.img.map(
            (imgi) => `${import.meta.env.VITE_GETWAY_IPFS}${imgi}`
          )
      })
    }
    setProduct(data)
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

  if (isLoading) return <div>Loading...</div>

  return (
    <div className='w-full'>
      <div
        className='cursor-pointer block w-fit mb-5'
        onClick={copyToClipboard}
      >
        ID: {id}
      </div>
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
            }
          }
        }}
      >
        <div className='text-2xl font-semibold'>
          <span className='mr-2'>Information</span>
          <TagCurrent state={product?.current || 'planting'} />
        </div>
        <Form colon={false} layout='vertical'>
          <InputC
            label='Prouct Name'
            value={product?.name}
            onChange={() => console.log(111)}
            isOutline
            disabled={!isBusiness}
            className='!text-black'
          />
          <TextAreaC
            label='Description'
            value={product?.desc || 'NULL'}
            onChange={() => console.log(111)}
            isOutline
            disabled={!isBusiness}
            className='!text-black'
          />
          <div className='grid grid-cols-2 gap-x-5'>
            <InputC
              label='Business'
              value={product?.business.name}
              isOutline
              disabled
              className='!text-black'
            />
            <InputC
              label='Inspector'
              value={product?.inspector.name}
              isOutline
              disabled={!isBusiness}
              className='!text-black'
            />
            <InputC
              label='Planting Area'
              value={product?.land}
              isOutline
              disabled
              className='!text-black'
            />
            <InputC
              label='Cultivated Variety'
              value={product?.variety}
              isOutline
              disabled
              className='!text-black'
            />
            <InputC
              label='Quantity In'
              value={product?.quantityIn}
              isOutline
              disabled
              className='!text-black'
            />
            <InputC
              label='Quantity Out'
              value={product?.quantityOut || 'NULL'}
              isOutline
              disabled={!isBusiness}
              className='!text-black'
            />
          </div>
        </Form>
        <div className='text-2xl font-semibold mt-10'>Inspection</div>
        {(!isBusiness || (isBusiness && product?.cert)) && (
          <Form colon={false} layout='vertical'>
            <div className='grid grid-cols-2 gap-x-5'>
              <Form.Item name='rate' label='Rate'>
                <Rate
                  allowClear
                  allowHalf
                  value={product?.quality}
                  disabled={
                    isBusiness ||
                    roleCurrent.business.includes(product?.current as string)
                  }
                />
              </Form.Item>
              {isBusiness ||
              roleCurrent.business.includes(product?.current as string) ? (
                <div>View certification</div>
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
                      variant='outline'
                      className={cn(
                        'w-fit rounded-xl !text-base !font-medium !outline-primary mt-[2px] !text-primary !py-[18px]',
                        product?.current === allCurrent.INSPECTING && 'hidden'
                      )}
                    >
                      Inspecting
                    </ButtonC>
                    <SubmitC
                      className='w-fit !text-base !font-medium rounded-xl'
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
        <div className='text-2xl font-semibold mt-10 mb-2'>History Record</div>
        <Timeline timeline={product?.record as IStatus[]} />
      </ConfigProvider>
    </div>
  )
}
