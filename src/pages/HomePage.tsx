import { PhoneFilled, LoginOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import ButtonC from '../../src/components/ButtonC'
import { Input } from 'antd'
import * as Routes from '../../src/routing/paths'
import Line from '../../src/components/layout/Line'

const _prouductInfo = ['About us', 'Our solution', 'Process & Usage Guide']
const _nav = [
  { name: 'Our Partners', link: '/' },
  { name: 'Promotions', link: Routes.PROMOTION },
  { name: 'Inspector Workpace', link: Routes.INSPECTOR },
  { name: 'Business Workpace', link: Routes.BUSINESS },
  { name: 'Employee Workpace', link: Routes.HR }
]

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <div className='h-screen w-full pt-2 pb-10 flex flex-col justify-between items-stretch'>
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
        <Input
          prefix={<SearchOutlined className='mr-3 text-2xl' />}
          className='text-lg rounded-full py-3 px-5 w-[450px] mt-5'
          placeholder='ID Product'
        />
      </section>

      <footer className='self-center rounded-full w-full max-w-6xl h-20 bg-white flex justify-between divide-x-2 overflow-hidden'>
        {_nav.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className='group w-full text-center flex flex-col items-center justify-center gap-1 px-auto cursor-pointer hover:bg-linear1'
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

export default HomePage
