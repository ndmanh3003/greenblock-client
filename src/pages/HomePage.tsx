import {
  PhoneFilled,
  LoginOutlined,
  UnorderedListOutlined
} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { ButtonC, InfoProductModal, Line } from '../components'
import { Routes } from '../routes'
import { useEffect, useState } from 'react'
import { FooterModal } from '../components/FooterModal'
import { ConfigProvider, Drawer } from 'antd'

export const HomePage = () => {
  const navigate = useNavigate()
  const [modal, setModal] = useState<number | string>(0)
  const [time, setTime] = useState<'morning' | 'afternoon' | 'evening'>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const hours = new Date().getHours()
    if (hours >= 5 && hours <= 11) setTime('morning')
    else if (hours >= 12 && hours <= 17) setTime('afternoon')
    else setTime('evening')
  }, [])

  return (
    <div className='h-screen w-full pt-2 lg:pb-10 flex flex-col justify-between items-stretch'>
      <FooterModal modal={modal} setModal={setModal} />
      <header className='w-full px-5 lg:px-0'>
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
              <div
                key={index}
                className='group w-fit cursor-pointer hidden lg:block'
              >
                <span>{item}</span>
                <div className='h-1 w-full bg-green1 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition ease-in-out delay-100 duration-300 ' />
              </div>
            ))}
          </div>

          <ButtonC
            variant='primary'
            className='hidden lg:flex'
            icon={<LoginOutlined />}
            onClick={() => navigate(Routes.LOGIN)}
          >
            Login
          </ButtonC>
          <ButtonC
            variant='outline'
            className='lg:hidden !aspect-square !p-0 !pr-1 !rounded-full h-10 w-10'
            onClick={() => setOpen(true)}
          >
            <UnorderedListOutlined className='!text-xl' />
          </ButtonC>
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorText: 'black'
            }
          }}
        >
          <Drawer
            placement='top'
            closable={true}
            onClose={() => setOpen(false)}
            open={open}
            title={
              <img src='/logo-horizontal-green.svg' className='h-10 mx-auto' />
            }
            height={500}
            style={{
              borderBottomLeftRadius: '1rem',
              borderBottomRightRadius: '1rem'
            }}
          >
            <div className='text-base font-medium'>
              <div>
                GreenBlock is designed to be fully accessible across all
                devices, including smartphones and tablets. However, for the
                optimal experience, we recommend using a laptop or desktop
                computer. This will ensure you benefit from the full range of
                features and functionalities that GreenBlock has to offer.
              </div>
              <br />
              Tap to explore more information about GreenBlock!
              {_prouductInfo.map((item, index) => (
                <div key={index} className='w-fit cursor-pointer my-2'>
                  - {item}
                </div>
              ))}
              <br />
              <div className='flex gap-5 items-end'>
                <div>Join with us now!</div>
                <ButtonC
                  variant='primary'
                  icon={<LoginOutlined />}
                  onClick={() => navigate(Routes.REGISTER)}
                  className='!text-base !font-semibold'
                >
                  Register
                </ButtonC>
              </div>
            </div>
          </Drawer>
        </ConfigProvider>
      </header>

      <section className='hidden lg:block'>
        <div className='flex gap-4 items-center'>
          <img
            src={time === 'evening' ? 'moon-evening.svg' : 'sun-morning.svg'}
            className='w-20 h-20'
          />
          <div className='flex flex-col text-white gap-1'>
            <span className='font-semibold text-3xl'>{`Good ${time}`}</span>
            <span className='text-base font-light'>
              What are you looking for today?
            </span>
          </div>
        </div>
        <InfoProductModal />
      </section>

      <div className='w-full flex flex-col divide-y-2'>
        <div className='w-full h-[48px] block lg:hidden'>
          <InfoProductModal />
        </div>
        <footer className='self-center lg:rounded-full w-full max-w-6xl h-fit lg:h-20 bg-white flex justify-between divide-x-2 overflow-hidden mx-auto'>
          {_nav.map((item, index) => (
            <Link
              key={item.name}
              to={item?.link || ''}
              className='group w-full text-center flex flex-col items-center lg:justify-center justify-start gap-1 px-1 cursor-pointer hover:bg-linear1 text-xs lg:text-base'
              onClick={() => setModal(item?.key || 0)}
            >
              <img
                className='w-8 group-hover:-translate-y-1.5 transition-all ease-in-out delay-75 duration-200 lg:my-0 mt-3'
                src={`/hp${index + 1}.svg`}
              />
              <span className='font-medium group-hover:font-semibold pb-3 lg:pb-0'>
                {item.name}
              </span>
            </Link>
          ))}
        </footer>
      </div>
    </div>
  )
}

const _prouductInfo = ['About us', 'Our solution', 'Process & Usage Guide']

const _nav = [
  { name: 'Our Partners', key: 'business' },
  { name: 'Our Inspector', key: 'inspector' },
  { name: 'Registration', link: Routes.REGISTER },
  { name: 'Workspace', link: Routes.INSPECTOR },
  { name: 'Record Management', link: Routes.RECORD }
]
