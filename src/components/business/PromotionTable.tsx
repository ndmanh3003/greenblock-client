/* eslint-disable indent */
import React, { useRef, useState } from 'react'
import {
  SearchOutlined,
  ClearOutlined,
  CloseOutlined,
  FilterOutlined
} from '@ant-design/icons'
import type { InputRef, TableColumnsType, TableColumnType } from 'antd'
import { Button, Checkbox, ConfigProvider, Input, Space, Table } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words'
import { convertToClientTimezone } from '../../utils/date'

interface DataType {
  key: string
  name: string
  startDate: string
  endDate: string
}

type DataIndex = keyof DataType

const data: DataType[] = [
  {
    key: '1',
    name: 'Giảm giá 1212121212121',
    startDate: '2024-07-26T17:00:00.000Z',
    endDate: '2024-07-26T17:00:00.000Z'
  },
  {
    key: '2',
    name: 'Joe Black',
    startDate: '2024-06-26T17:00:00.000Z',
    endDate: '2024-08-26T17:00:00.000Z'
  }
]

export const PromotionTable: React.FC = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)
  const currentDate = new Date()

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div
        className='px-4 py-4 !rounded-xl'
        onKeyDown={(e) => e.stopPropagation()}
      >
        <ConfigProvider
          theme={{
            token: { fontSize: 14 }
          }}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            style={{ marginBottom: 12, display: 'block' }}
            className='!rounded-md'
          />
          <div className='flex justify-between'>
            <Button
              type='primary'
              onClick={() =>
                handleSearch(selectedKeys as string[], confirm, dataIndex)
              }
              icon={<SearchOutlined />}
              size='small'
              className='!w-fit'
            >
              Search
            </Button>
            <div className='flex space-x-1'>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size='small'
                icon={<ClearOutlined />}
              />
              <Button
                size='small'
                icon={<FilterOutlined />}
                onClick={() => {
                  confirm({ closeDropdown: false })
                  setSearchText((selectedKeys as string[])[0])
                  setSearchedColumn(dataIndex)
                }}
              />
              <Button
                size='small'
                icon={<CloseOutlined />}
                onClick={() => {
                  close()
                }}
              />
            </div>
          </div>
        </ConfigProvider>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#A1C038' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) setTimeout(() => searchInput.current?.select(), 100)
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#A1C038', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const getColumnFilterStatusProps = (): TableColumnType<DataType> => ({
    filterDropdown: ({
      confirm,
      clearFilters,
      filters,
      setSelectedKeys,
      selectedKeys
    }) => (
      <div
        className='px-4 py-4 !rounded-xl'
        onKeyDown={(e) => e.stopPropagation()}
      >
        <ConfigProvider
          theme={{
            token: { fontSize: 14 }
          }}
        >
          <Space className='flex flex-col items-start'>
            {filters &&
              filters?.map((filter) => (
                <Checkbox
                  checked={selectedKeys.includes(filter.value.toString())}
                  key={filter.value.toString()}
                  value={filter.value}
                  onChange={(e) => {
                    const newSelectedKeys = e.target.checked
                      ? [...selectedKeys, filter.value.toString()]
                      : selectedKeys.filter(
                          (key) => key !== filter.value.toString()
                        )
                    setSelectedKeys(newSelectedKeys)
                  }}
                >
                  {filter.text}
                </Checkbox>
              ))}
          </Space>
          <div className='flex justify-end space-x-2 mt-3'>
            <Button
              onClick={() => {
                setSelectedKeys([])
                clearFilters && clearFilters()
              }}
              size='small'
              icon={<ClearOutlined />}
            />
            <Button
              type='primary'
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size='small'
              className='!w-fit !aspect-square'
            />
          </div>
        </ConfigProvider>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <FilterOutlined style={{ color: filtered ? '#A1C038' : undefined }} />
    ),
    onFilter: (value, record) => {
      const startDate = new Date(record.startDate)
      const endDate = new Date(record.endDate)

      if (value === 'active')
        return currentDate >= startDate && currentDate <= endDate
      if (value === 'upcoming') return currentDate < startDate
      if (value === 'expired') return currentDate > endDate
      return false
    },
    // render:
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Upcoming', value: 'upcoming' },
      { text: 'Expired', value: 'expired' }
    ]
  })

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: '20%',
      render: (text) => convertToClientTimezone(text)
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      width: '20%',
      render: (text) => convertToClientTimezone(text)
    },
    {
      title: 'Status',
      key: 'status',
      width: '10%',
      ...getColumnFilterStatusProps()
    }
  ]

  return <Table columns={columns} dataSource={data} />
}
