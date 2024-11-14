import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Routes } from '@/routes'

const Styled = styled.div`
  .ant-tooltip-inner {
    background-color: #21ba43;
    font-weight: 500;
    border-radius: 9999px;
    padding: 0.5rem 1rem;
    margin: 10px;
  }
`

export const Float = () => {
  return (
    <div className='fixed bottom-10 right-10 cursor-pointer w-14 h-14 z-[100]'>
      <Link to={Routes.HOMEPAGE}>
        <Styled>
          <Tooltip
            arrow={false}
            getPopupContainer={(triggerNode) => triggerNode}
            placement='left'
            title='Return to Home'
            zIndex={9999}
          >
            <div className='bg-transparent text-transparent absolute z-10 w-full h-full'>
              Sample
            </div>
          </Tooltip>
        </Styled>
      </Link>
      <img className='absolute w-full h-full z-0' src='/logo.svg' />
    </div>
  )
}
