import { ExclamationCircleFilled, CaretRightOutlined } from '@ant-design/icons'
import { Collapse, ConfigProvider } from 'antd'

export const Guide = () => {
  return (
    <div className='rounded-2xl w-full h-fit overflow-hidden p-10 pb-3 px-10 relative'>
      <img
        src='bs-guide.svg'
        className='absolute h-full right-10 bottom-0 -z-10'
      />
      <div className='w-full h-full bg-linear1 absolute -z-20 top-0 right-0' />
      <h1 className='font-bold text-3xl'>File Data Manager and Editor</h1>
      <div className='font-medium leading-normal'>
        Here's a quick guide on how to use our data management features:
        <ConfigProvider theme={{ token: { colorText: 'black', fontSize: 16 } }}>
          <Collapse
            bordered={false}
            accordion
            items={items}
            className='!bg-transparent !mt-2 w-[800px]'
            expandIcon={({ isActive }) => (
              <CaretRightOutlined
                className='!text-green3'
                rotate={isActive ? 90 : 0}
              />
            )}
          />
        </ConfigProvider>
      </div>
    </div>
  )
}

const items = [
  {
    key: '1',
    label: 'Human Resource and Ecosystem',
    children: (
      <div>
        - Make changes directly in the table - everything is editable! <br />
        - Any duplicated information will be automatically removed.
        <br />- You also can work with the file:
        <div className='pl-8'>
          • Import Data: Upload a text file to add your own data.
          <br />
          • Export Data: Download your current data as a CSV file anytime.
          <br />• Format File: Single column format - first row included as
          data.
        </div>
        <div className='text-red-500 mt-3 flex space-x-2'>
          <ExclamationCircleFilled style={{ fontSize: 20 }} />
          <div>
            Click
            <span className='font-extrabold'> SAVE </span> to keep your updates
            and remove duplicates. Changes are
            <span className='font-extrabold'> NOT </span>
            automatically saved!
          </div>
        </div>
      </div>
    )
  },
  {
    key: '2',
    label: 'Promotion and Product',
    children: (
      <div>
        - All changes are updated automatically - no need for manual saving!
        <br />
        - Search, sort, and filter options available in the header row (or the
        frist list).
        <br />- Filters and sorts reset when you navigate away from the table.
        <div className='text-red-500 mt-3 flex space-x-2'>
          <ExclamationCircleFilled style={{ fontSize: 20 }} />
          <div>
            Changes take effect immediately.
            <span className='font-extrabold'> NO DUPLICATED </span> entries will
            be stored.
          </div>
        </div>
      </div>
    )
  }
]
