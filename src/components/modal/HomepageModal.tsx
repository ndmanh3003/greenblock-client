import { Image, Modal } from 'antd'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import intro from '@/assets/content/intro.json'
import { _roles } from '@/assets/options'
import { useHandleSuccess } from '@/hooks'
import { IAccount, useGetAllQuery } from '@/service/api/auth'

interface IHomepageModal {
  modal: string | number
  setModal: (modal: string | number) => void
}

export const HomepageModal = ({ modal, setModal }: IHomepageModal) => {
  const [data, setData] = useState<IAccount[]>([])

  const { data: dataGetAll, isLoading } = useGetAllQuery({
    type: modal as (typeof _roles)[number]
  })
  useHandleSuccess(dataGetAll, false, (data) => setData(data))

  return (
    <Modal
      className='!overflow-y-auto'
      footer={() => <></>}
      open={modal !== 0}
      width={1200}
      zIndex={100000000}
      onCancel={() => setModal(0)}
    >
      <div className='text-black lg:m-5 text-base leading-loose'>
        <h1 className='text-2xl font-semibold text-green2 mb-5'>
          {_roles.includes(modal as (typeof _roles)[number]) || modal === 0
            ? 'Our ' + modal
            : modal}
        </h1>
        <div className='max-h-[50vh] overflow-auto pr-2'>
          {_roles.includes(modal as (typeof _roles)[number]) ? (
            <div className='grid lg:grid-cols-2 gap-5 pr-3'>
              {!isLoading &&
                data &&
                data.map((item) => (
                  <div
                    key={uuidv4()}
                    className='rounded-xl border-[1px] flex items-stretch overflow-hidden h-fit relative'
                  >
                    <div className='p-2 lg:p-4 flex-auto'>
                      <h2 className='font-semibold !mt-0 -mb-1 text-base lg:text-lg line-clamp-1'>
                        {item.name}
                      </h2>
                      <a
                        className='line-clamp-1  mt-2 text-sm lg:text-base hover:text-green1'
                        href={`mailto:${item.email}`}
                      >
                        {item.email}
                      </a>
                    </div>
                    <div className='h-full aspect-video absolute top-0 right-0'>
                      <Image
                        className='object-cover'
                        height='100%'
                        src={item.cert}
                        width='100%'
                      />
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html:
                  typeof modal === 'string' && modal in intro
                    ? intro[modal.toString() as keyof typeof intro]
                        .replace(/\n/g, '<br />')
                        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                    : ''
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
