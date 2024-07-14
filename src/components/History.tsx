import { Image, Modal, Pagination } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import ButtonC from './ButtonC'
import { useState } from 'react'

interface IHistory {
  isModalOpen: boolean
  // eslint-disable-next-line no-unused-vars
  setIsModalOpen: (value: boolean) => void
}

const History = ({ isModalOpen, setIsModalOpen }: IHistory) => {
  const [index, setIndex] = useState(0)
  const [isPreviewVisible, setPreviewVisible] = useState(false)
  return (
    <Modal
      className='!text-lg'
      width={1200}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={() => (
        <div className='flex justify-between'>
          <Pagination
            simple
            defaultCurrent={2}
            total={70}
            pageSize={1}
            hideOnSinglePage
            showSizeChanger={false}
            className='!inline'
            onChange={(page) => setIndex(page - 1)}
          />
          <div>
            <ButtonC
              className='!text-base !font-medium !py-0 mr-3'
              variant='primary'
            >
              Upload certificate
            </ButtonC>
            <ButtonC
              onClick={() => setIsModalOpen(false)}
              className='!text-base !font-medium !py-0 border-gray-200 hover:border-primary hover:!text-primary !text-gray-700 !delay-0 mr-3'
              variant='outline'
            >
              Close
            </ButtonC>
          </div>
        </div>
      )}
    >
      <div className='w-full !grid !grid-cols-3 gap-x-5 px-5 mt-5'>
        <div className='w-full aspect-square relative rounded-lg overflow-hidden'>
          <img
            src={`rand-pic/${(index % 10) + 1}.jpg`}
            className='absolute top-0 right-0 object-cover h-full w-full'
          />
          <img
            src='illus/mask-green.svg'
            className='absolute top-0 right-0 object-cover z-0'
          />
          <div className='absolute top-0 right-0 font-bold text-lg z-20 p-7 text-white'>
            <span className='line-clamp-1'>ID Product: 0x1223...576f89</span>
            <span className='line-clamp-1'>Date: 03/03/24</span>
            <span
              className='bottom-1 right-1 text-sm bg-linear1 px-2 rounded-lg z-50 mt-2 inline-block text-green3 hover:text-green1 font-semibold cursor-pointer transition ease-in-out delay-75'
              onClick={() => setPreviewVisible(!isPreviewVisible)}
            >
              Total image: 2
            </span>
            <p className='text-sm mt-5 font-medium'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tempus non neque a auctor.
            </p>
          </div>
        </div>
        <div
          className='h-full w-full col-span-2 relative rounded-lg overflow-hidden group cursor-pointer'
          onClick={() => setPreviewVisible(!isPreviewVisible)}
        >
          <img
            src='https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp'
            className='w-full h-full object-cover absolute top-0 right-0 group-hover:scale-110 transition ease-in-out delay-75'
          />
          <div className='absolute w-full h-full bg-gray-900 bg-opacity-0 hover:bg-opacity-30 transition ease-in-out delay-75 text-transparent hover:text-white flex justify-center items-center text-base space-x-1'>
            <EyeOutlined />
            <span>Watch all</span>
          </div>
        </div>

        <Image.PreviewGroup
          items={[
            'https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp',
            'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
            'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp'
          ]}
          preview={{
            visible: isPreviewVisible,
            onVisibleChange: (visible) => setPreviewVisible(visible)
          }}
        />
      </div>
    </Modal>
  )
}

export default History
