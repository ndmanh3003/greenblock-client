import { Modal } from 'antd'
import { useState } from 'react'
import { IAccount, useGetAllQuery } from '../service/store/auth'
import { useHandleError, useHandleSuccess } from '../hooks'
import { v4 as uuidv4 } from 'uuid'
import { useHandleRefetch } from '../hooks/useHandleRefetch'

interface IFooterModal {
  // eslint-disable-next-line no-unused-vars
  setModal: (value: string | number) => void
  modal: string | number
}

export const FooterModal = ({ modal, setModal }: IFooterModal) => {
  const [data, setData] = useState<IAccount[]>([])

  const {
    data: dataGetAll,
    error,
    refetch,
    isLoading
  } = useGetAllQuery({
    type: modal as 'business' | 'inspector'
  })
  useHandleError([error])
  useHandleSuccess(dataGetAll, false, (data) => setData(data))
  useHandleRefetch(refetch, [modal], () => modal === 0)

  return (
    <Modal
      width={1200}
      height={300}
      open={modal === 'business' || modal === 'inspector'}
      onCancel={() => setModal(0)}
      footer={() => <></>}
    >
      <div className='text-black lg:m-5 text-base'>
        <h1 className='text-2xl font-semibold text-green2 mb-5'>
          {typeof modal === 'string' && 'Our ' + modal}
        </h1>
        <div className='grid lg:grid-cols-2 gap-5 max-h-[350px] overflow-scroll pr-3'>
          {!isLoading &&
            data &&
            data.map((item) => (
              <div className='p-2 lg:p-4 rounded-xl border-2' key={uuidv4()}>
                <h2 className='font-semibold !mt-0 -mb-1 text-base lg:text-lg  line-clamp-1'>
                  {item.name}
                </h2>
                <div className='flex justify-between items-end mt-2 text-sm lg:text-base'>
                  <a href='mailto:dđ' className='line-clamp-1 '>
                    {item.email}
                  </a>
                  <a
                    href={`${import.meta.env.VITE_GETWAY_IPFS}${item.cert}`}
                    target='_blank'
                    className='line-clamp-1'
                  >
                    View certificate
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Modal>
  )
}
