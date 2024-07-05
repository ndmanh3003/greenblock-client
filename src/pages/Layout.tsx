import { Outlet } from 'react-router-dom'
import cn from '../utils/cn'
import { Tooltip } from 'antd'
import styled from 'styled-components'
import 'antd/dist/reset.css'

const Styled = styled.div`
  .ant-tooltip-inner {
    background-color: #21ba43;
    font-weight: 500;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    margin: 10px;
  }
`

export default function Layout({ isHidden }: { isHidden?: boolean }) {
  return (
    <div className='min-h-screen w-full'>
      <Outlet />
      <div
        className={cn(
          'fixed bottom-10 right-10 cursor-pointer w-14 h-14',
          isHidden ? 'hidden' : ''
        )}
      >
        <Styled>
          <Tooltip
            zIndex={9999}
            title='Return to Home'
            getPopupContainer={(triggerNode) => triggerNode}
            arrow={false}
            placement='left'
          >
            <div className='bg-transparent text-transparent absolute z-10 w-full h-full'>
              sample
            </div>
          </Tooltip>
        </Styled>
        <img src='/logo.svg' className='absolute w-full h-full z-0' />
      </div>
    </div>
  )
}
