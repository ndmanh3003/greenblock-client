import {
  FormOutlined,
  LoginOutlined,
  MailFilled,
  PhoneFilled,
  UnorderedListOutlined
} from '@ant-design/icons'
import { ConfigProvider, Drawer } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import homepage from '@/assets/content/homepage.json'
import { ButtonC, HomepageModal, InfoProductModal, Line } from '@/components'
import { useAppSelector } from '@/hooks'
import { Routes } from '@/routes'
import { selectRole } from '@/service/store/user'

const _productInfo = ['About Us', 'Our Solution', 'Process & Usage Guide']

export const HomePage = () => {
  const navigate = useNavigate()
  const [modal, setModal] = useState<string | number>(0)
  const [time, setTime] = useState<'morning' | 'afternoon' | 'evening'>()
  const [open, setOpen] = useState(false)
  const isBusiness = useAppSelector(selectRole)

  const parentRef = useRef<HTMLDivElement | null>(null)
  const [childWidth, setChildWidth] = useState(0)

  useEffect(() => {
    if (parentRef.current) {
      setChildWidth(parentRef.current.offsetWidth)
    }
    const handleResize = () => {
      if (parentRef.current) {
        setChildWidth(parentRef.current.offsetWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const _nav = [
    { name: 'Our Businesses', key: 'business' },
    { name: 'Our Inspectors', key: 'inspector' },
    { name: 'Registration', link: Routes.REGISTER },
    {
      name: 'Workspace',
      link:
        isBusiness === undefined
          ? Routes.LOGIN
          : isBusiness
            ? Routes.BUSINESS
            : Routes.INSPECTOR
    },
    { name: 'Record Management', link: Routes.RECORD }
  ]

  useEffect(() => {
    const hours = new Date().getHours()
    if (hours >= 5 && hours <= 11) {
      setTime('morning')
    } else if (hours >= 12 && hours <= 17) {
      setTime('afternoon')
    } else {
      setTime('evening')
    }
  }, [])

  return (
    <div ref={parentRef} className='w-full'>
      <div
        className='h-dvh w-full pt-2 lg:pb-10 flex flex-col justify-between items-stretch fixed'
        style={{ width: `${childWidth}px` }}
      >
        <HomepageModal modal={modal} setModal={setModal} />
        <header className='w-full px-5 lg:px-0'>
          <div className='flex w-fit ml-auto gap-5'>
            <div className='w-fit px-2 py-1 rounded-md flex gap-1 ml-auto'>
              <PhoneFilled className='text-xl' rotate={90} />
              <span className='font-medium'>
                <a href='tel:19005555'>1900 5555</a>
              </span>
            </div>
            <div className='bg-white bg-opacity-50 w-fit px-2 py-1 rounded-md flex gap-1 ml-auto'>
              <MailFilled className='text-xl' />
              <span className='font-medium'>
                <a href='mailto:ndmanh3003@gmail.com'>ndmanh3003</a>
              </span>
            </div>
          </div>

          <Line theme='dark' />

          <div className='flex items-center justify-between'>
            <div className='flex items-end text-white font-medium gap-10'>
              <Link className='h-14 mb-[14px]' to='/'>
                <img alt='Logo' className='h-full' src='/logo-vertical.svg' />
              </Link>
              {_productInfo.map((item) => (
                <div
                  key={item}
                  className='group w-fit cursor-pointer hidden lg:block'
                  onClick={() => setModal(item)}
                >
                  <span>{item}</span>
                  <div className='h-1 w-full bg-green1 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition ease-in-out delay-100 duration-300 ' />
                </div>
              ))}
            </div>

            <ButtonC
              className='hidden lg:flex'
              icon={<LoginOutlined />}
              variant='primary'
              onClick={() => navigate(Routes.LOGIN)}
            >
              Login
            </ButtonC>
            <ButtonC
              className='lg:hidden !aspect-square !p-0 !pr-1 !rounded-full h-10 w-10'
              variant='outline'
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
              closable={true}
              height={500}
              open={open}
              placement='top'
              style={{
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem'
              }}
              title={
                <img
                  className='h-10 mx-auto'
                  src='/logo-horizontal-green.svg'
                />
              }
              onClose={() => setOpen(false)}
            >
              <div className='text-base font-medium'>
                <div>{homepage.noti}</div>
                <br />
                Tap to explore more information about GreenBlock!
                {_productInfo.map((item) => (
                  <div
                    key={item}
                    className='w-fit cursor-pointer my-2 '
                    onClick={() => setModal(item)}
                  >
                    -{' '}
                    <span className='text-green2 underline underline-offset-4'>
                      {' '}
                      {item}
                    </span>
                  </div>
                ))}
                <br />
                <div>Join with us now!</div>
                <div className='flex gap-5 items-end mt-2'>
                  <ButtonC
                    className='!text-base !font-semibold'
                    icon={<FormOutlined />}
                    variant='primary'
                    onClick={() => navigate(Routes.REGISTER)}
                  >
                    Register
                  </ButtonC>
                  <ButtonC
                    className='!text-base !font-semibold'
                    icon={<LoginOutlined />}
                    variant='primary'
                    onClick={() => navigate(Routes.LOGIN)}
                  >
                    Login
                  </ButtonC>
                </div>
              </div>
            </Drawer>
          </ConfigProvider>
        </header>

        <section className='hidden lg:block'>
          <div className='flex gap-4 items-center'>
            <img
              className='w-20 h-20'
              src={time === 'evening' ? 'moon-evening.svg' : 'sun-morning.svg'}
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
          <div className='block lg:hidden'>
            <div className='flex gap-4 items-center'>
              <img
                className='w-20 h-20'
                src={
                  time === 'evening' ? 'moon-evening.svg' : 'sun-morning.svg'
                }
              />
              <div className='flex flex-col text-white gap-1'>
                <span className='font-semibold text-3xl'>{`Good ${time}`}</span>
                <span className='text-base font-light'>
                  What are you looking for today?
                </span>
              </div>
            </div>
            <div className='w-full h-[48px]'>
              <InfoProductModal />
            </div>
          </div>
          <footer className='self-center lg:rounded-full w-full max-w-6xl h-fit lg:h-20 bg-white flex justify-between divide-x-2 overflow-hidden mx-auto'>
            {_nav.map((item, index) => (
              <Link
                key={item.name}
                className='group w-full text-center flex flex-col items-center lg:justify-center justify-start gap-1 px-1 cursor-pointer hover:bg-linear1 text-xs lg:text-base'
                to={item?.link || ''}
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
    </div>
  )
}
