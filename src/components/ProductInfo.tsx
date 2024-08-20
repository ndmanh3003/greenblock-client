import { ConfigProvider, Form, Image, message, Rate, UploadFile } from 'antd'
import { InputC, IpfsUpload, ruleRequired, TextAreaC } from './form'
import { useState } from 'react'
import { TagCurrent } from '.'

export const ProductInfo = ({
  id
  // isBusiness
}: {
  id: string
  isBusiness: boolean
}) => {
  const [hash, setHash] = useState<string[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
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
  return (
    <div className='w-full'>
      <div
        className='cursor-pointer block w-fit mb-5'
        onClick={copyToClipboard}
      >
        ID: {id}
      </div>
      <ConfigProvider
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
          <TagCurrent state='planting' />
        </div>
        <Form colon={false} layout='vertical'>
          <InputC
            label='Prouct Name'
            value={'jhhdjd'}
            onChange={() => console.log(111)}
            isOutline
            disabled
            className='!text-black'
          />
          <TextAreaC
            label='Description'
            value={'jhhdjd'}
            onChange={() => console.log(111)}
            isOutline
            disabled
            className='!text-black'
          />
          <div className='grid grid-cols-2 gap-x-5'>
            <InputC
              label='Planting Area'
              value={'jhhdjd'}
              isOutline
              disabled
              className='!text-black'
            />
            <InputC
              label='Cultivated Variety'
              value={'jhhdjd'}
              isOutline
              disabled
              className='!text-black'
            />
            <InputC
              label='Quantity In'
              value={30}
              isOutline
              disabled
              className='!text-black'
            />
            <InputC
              label='Quantity Out'
              value={30}
              isOutline
              disabled
              className='!text-black'
            />
          </div>
        </Form>
        <div className='text-2xl font-semibold'>Inspection</div>
        <Form colon={false} layout='vertical'>
          <div className='grid grid-cols-2 space-x-5'>
            <Form.Item name='rate' label='Rate'>
              <Rate allowClear />
            </Form.Item>
            <IpfsUpload
              setHash={setHash}
              fileList={fileList}
              setFileList={setFileList}
              hash={hash}
              name='cert'
              maxCount={1}
              rules={ruleRequired}
              className='!text-black hover:!text-black mt-1'
              label='Certification'
            >
              Upload
            </IpfsUpload>
          </div>
        </Form>
        <div className='text-2xl font-semibold mb-2'>History Record</div>
        <div className='mt-5 border-l-2 '>
          {_timeline.map((item, index) => (
            <div
              key={index}
              className='pl-5 my-5 relative grid grid-cols-2 gap-x-10'
            >
              <div className='w-full'>
                <div className='h-4 w-4 border-4 rounded-full border-green1 absolute -left-[9px] top-[5px] bg-white' />
                <div className='text-lg font-semibold flex justify-between'>
                  <span>{item.title}</span>
                  <span className='text-gray-800 text-base font-normal'>
                    {item.time}
                  </span>
                </div>
                <div className='text-base'>{item.content}</div>
              </div>
              <div className='w-full aspect-video rounded-2xl overflow-hidden'>
                <Image.PreviewGroup
                  items={[
                    'https://indigo-kind-manatee-688.mypinata.cloud/ipfs/QmQRk4AejgLP2jV6jmYU3m9maXe5Yv4gkYL9u1XkcX8qM2',
                    'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
                    'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
                  ]}
                >
                  <img
                    src='https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
                    className='h-full w-full object-cover'
                  />
                </Image.PreviewGroup>
              </div>
            </div>
          ))}
        </div>
      </ConfigProvider>
    </div>
  )
}

const _timeline = [
  {
    title: 'Create a services site',
    time: '2015-09-01',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    title: 'Create a services site',
    time: '2015-09-01',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  },
  {
    title: 'Create a services site',
    time: '2015-09-01',
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
  }
]
