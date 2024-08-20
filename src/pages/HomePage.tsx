import { PhoneFilled, LoginOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ConfigProvider, Input } from 'antd'
import { ButtonC, Line } from '../components'
import { Routes } from '../routes'
import { useState } from 'react'
import { FooterModal } from '../components/FooterModal'

export const HomePage = () => {
  const navigate = useNavigate()
  const [modal, setModal] = useState<number | string>(0)

  return (
    <div className='h-screen w-full pt-2 pb-10 flex flex-col justify-between items-stretch'>
      <FooterModal modal={modal} setModal={setModal} />
      <header className='w-full'>
        <div className='bg-white bg-opacity-50 w-fit px-2 py-1 rounded-md flex gap-1 items-center ml-auto'>
          <PhoneFilled rotate={90} className='text-xl' />
          <span className='font-medium'>
            <a href='tel:19005555'>1900 5555</a>
          </span>
        </div>

        <Line theme='dark' />

        <div className='flex items-center justify-between'>
          <div className='flex items-end text-white font-medium gap-10'>
            <Link to='/' className='h-14 mb-[14px]'>
              <img src='/logo-vertical.svg' className='h-full' alt='Logo' />
            </Link>
            {_prouductInfo.map((item, index) => (
              <div key={index} className='group w-fit cursor-pointer'>
                <span>{item}</span>
                <div className='h-1 w-full bg-green1 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition ease-in-out delay-100 duration-300 ' />
              </div>
            ))}
          </div>

          <ButtonC
            variant='primary'
            icon={<LoginOutlined />}
            onClick={() => navigate(Routes.LOGIN)}
          >
            Login
          </ButtonC>
        </div>
      </header>

      <section>
        <div className='flex gap-4 items-center'>
          <img src='moon-evening.svg' className='w-20 h-20' />
          <div className='flex flex-col text-white gap-1'>
            <span className='font-semibold text-3xl'>Good evening</span>
            <span className='text-base font-light'>
              What are you looking for today?
            </span>
          </div>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorText: 'black',
              colorTextPlaceholder: '#00000063'
            }
          }}
        >
          <Input
            prefix={<SearchOutlined className='mr-3 text-2xl' />}
            className='text-lg rounded-full py-3 px-5 w-[450px] mt-5'
            placeholder='ID Product'
          />
        </ConfigProvider>
      </section>

      <footer className='self-center rounded-full w-full max-w-6xl h-20 bg-white flex justify-between divide-x-2 overflow-hidden'>
        {_nav.map((item, index) => (
          <Link
            key={item.name}
            to={item?.link || ''}
            className='group w-full text-center flex flex-col items-center justify-center gap-1 px-auto cursor-pointer hover:bg-linear1'
            onClick={() => setModal(item?.key || 0)}
          >
            <img
              className='w-8 group-hover:-translate-y-1.5 transition-all ease-in-out delay-75 duration-200'
              src={`/hp${index + 1}.svg`}
            />
            <span className='font-medium group-hover:font-semibold'>
              {item.name}
            </span>
          </Link>
        ))}
      </footer>
    </div>
  )
}

const _prouductInfo = ['About us', 'Our solution', 'Process & Usage Guide']

const _nav = [
  { name: 'Our Partners', key: 'business' },
  { name: 'Our Inspector', key: 'inspector' },
  { name: 'Registration', link: Routes.REGISTER },
  { name: 'Workspace', link: Routes.BUSINESS },
  { name: 'Record Management', link: Routes.RECORD }
]
