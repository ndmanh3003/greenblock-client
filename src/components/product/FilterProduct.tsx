import { FilterOutlined } from '@ant-design/icons'
import { Checkbox, ConfigProvider, Input, Popconfirm } from 'antd'
import { ButtonC } from '../ButtonC'
import { TagCurrent } from '../TagCurrent'
import { _currents } from '@/assets/options'
import { useDebounce } from '@/hooks'
import { IGetAllProductReq } from '@/service/api/product'
import { initQuery } from '@/utils'

interface IFilterProduct {
  query: IGetAllProductReq
  setQuery: (value: React.SetStateAction<IGetAllProductReq>) => void
}

export const FilterProduct = ({ query, setQuery }: IFilterProduct) => {
  const debounceName = useDebounce((value: string) => {
    setQuery((prev) => ({
      ...prev,
      ...initQuery,
      ...(value ? { searchValue: value } : { searchValue: undefined })
    }))
  }, 300)

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 14,
          colorText: 'black',
          colorTextPlaceholder: 'gray'
        }
      }}
    >
      <Popconfirm
        description={
          <div className='w-60'>
            <div className='font-semibold text-base'>Filter products by:</div>
            <div className='mt-2'>Product name</div>
            <Input
              placeholder='Enter ID or name'
              onChange={(e) => debounceName(e.target.value.toLowerCase())}
            />
            <div className='mt-2'>Current</div>
            {Object.values(_currents).map((current) => (
              <Checkbox
                key={current}
                checked={(query.filterCurrent || []).includes(current)}
                className='!text-base'
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    ...initQuery,
                    filterCurrent: e.target.checked
                      ? [...(prev.filterCurrent || []), current]
                      : (prev.filterCurrent || []).filter(
                          (item) => item !== current
                        )
                  }))
                }
              >
                <TagCurrent className='!my-1' state={current} />
              </Checkbox>
            ))}
          </div>
        }
        icon={null}
        okButtonProps={{ className: 'p-1 px-2' }}
        placement='bottomRight'
        showCancel={false}
        style={{ fontSize: 14 }}
        title={null}
      >
        <ButtonC
          className='!text-base !text-gr !font-medium !text-primary !outline-primary !aspect-square group !delay-0 !duration-75 !p-0 !pr-1 !rounded-full'
          variant='outline'
        >
          <FilterOutlined />
        </ButtonC>
      </Popconfirm>
    </ConfigProvider>
  )
}
