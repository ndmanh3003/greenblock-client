import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { IAccount, useGetAllQuery } from '../service/store/auth'
import { useHandleError, useHandleSuccess } from '../hooks'

interface IFooterModal {
  // eslint-disable-next-line no-unused-vars
  setModal: (value: string | number) => void
  modal: string | number
}

export const FooterModal = ({ modal, setModal }: IFooterModal) => {
  const [src, setSrc] = useState<IAccount[]>([])

  const { data, error, refetch } = useGetAllQuery({
    type: modal as 'business' | 'inspector'
  })
  useHandleError([error])
  useHandleSuccess(data, false, (data) => setSrc(data))

  useEffect(() => {
    if (!modal) return
    refetch()
  }, [modal, refetch])

  return (
    <Modal
      width={1200}
      height={300}
      open={modal === 'business' || modal === 'inspector'}
      onCancel={() => setModal(0)}
      footer={() => <></>}
    >
      <div className='text-black m-5 text-base'>
        <h1 className='text-2xl font-semibold text-green2 mb-5'>
          {typeof modal === 'string' && 'Our ' + modal}
        </h1>
        <div className='grid grid-cols-2 gap-5 max-h-[350px] overflow-scroll pr-3'>
          {src &&
            src.map((item) => (
              <div className='flex justify-between p-4 rounded-xl border-2'>
                <div>
                  <h2 className='font-semibold -mb-1 text-lg'>{item.name}</h2>
                  <a href='mailto:dđ' className='!text-base'>
                    {item.email}
                  </a>
                </div>
                <a
                  href={`${import.meta.env.VITE_GETWAY_IPFS}${item.cert}`}
                  target='_blank'
                >
                  View certification
                </a>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  )
}
