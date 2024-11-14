import { UploadOutlined } from '@ant-design/icons'
import { Form, Input, Upload, UploadFile, UploadProps, message } from 'antd'
import React from 'react'

import { ButtonC, IFormItem, cnInput } from '@/components'
import { ipfs, server } from '@/service/image-upload'
import { cn } from '@/utils'

interface IImageUploadC {
  setHash: (data: string[]) => void
  setFileList: (data: UploadFile[]) => void
  fileList: UploadFile[]
  hash: string[] | undefined
  listType?: 'picture' | 'picture-card'
  isIpfs?: boolean
}

export const ImageUpload: React.FC<IImageUploadC & IFormItem & UploadProps> = ({
  name,
  rules,
  wrapperCol,
  className,
  setHash,
  setFileList,
  fileList,
  hash,
  children,
  label,
  isIpfs,
  ...props
}) => {
  const handleChange: UploadProps['onChange'] = async (info) => {
    const { fileList: newFileList } = info
    const oldHashes = hash

    setFileList(newFileList)

    const newHashes: string[] = []

    for (let i = 0; i < newFileList.length; i++) {
      const file = newFileList[i]
      const oldFile = fileList?.find((f) => f.uid === file.uid)

      if (!oldFile) {
        try {
          const updatedFileList = [...newFileList]
          updatedFileList[i] = {
            ...updatedFileList[i],
            percent: 33,
            status: 'uploading'
          }
          setFileList(updatedFileList)

          let ipfsHash
          if (isIpfs) {
            ipfsHash = await ipfs(file.originFileObj as File)
          } else {
            ipfsHash = await server(file.originFileObj as File)
          }

          if (ipfsHash) {
            newHashes[i] = ipfsHash

            const completedFileList = [...updatedFileList]
            completedFileList[i] = {
              ...completedFileList[i],
              status: 'done',
              percent: 100
            }
            setFileList(completedFileList)
          }
        } catch (error) {
          newHashes.splice(i, 1)
          newFileList.splice(i, 1)
          setFileList(newFileList)
          message.error('Upload failed')
        }
      } else {
        const oldIndex = fileList!.findIndex((f) => f.uid === file.uid)
        newHashes[i] = oldHashes![oldIndex] ?? ''
      }
    }

    setHash(newHashes)
  }

  return (
    <div className={cn(!fileList.length && 'relative')}>
      <Form.Item label={label} wrapperCol={{ offset: wrapperCol }}>
        {!fileList.length && (
          <Form.Item
            className={cn(
              !fileList.length && '!absolute !-bottom-2 translate-y-1/2'
            )}
            name={name}
            rules={rules}
          >
            <Input className={cn(cnInput, '!mt-[22px] !w-2 !h-2 !border-0')} />
          </Form.Item>
        )}
        <Upload
          accept='image/png, image/jpeg, image/jpg'
          beforeUpload={() => false}
          disabled={fileList.some((f) => f.status !== 'done')}
          fileList={fileList}
          multiple={false}
          onChange={async (info) => await handleChange(info)}
          onPreview={async (file) => {
            const imageUrl = URL.createObjectURL(file.originFileObj as Blob)
            window.open(imageUrl)
          }}
          {...props}
        >
          {props.listType === 'picture' || !props.listType ? (
            <ButtonC
              className={cn(
                '!text-white hover:!text-white !font-medium !text-base',
                className
              )}
              icon={<UploadOutlined className={cn('text-white', className)} />}
              variant='primary'
            >
              {children}
            </ButtonC>
          ) : fileList.length >= (props.maxCount || 1) ? null : (
            <div className='h-full w-full flex flex-col items-center justify-center m-1 backdrop-blur-sm !overflow-hidden'>
              <UploadOutlined
                className={className}
                style={{
                  fontSize: '20px'
                }}
              />
              <div className='mt-2 text-base'>{children}</div>
            </div>
          )}
        </Upload>
      </Form.Item>
    </div>
  )
}
