import ipfs from '../../service/ipfs'
import cn from '../../utils/cn'
import ButtonC from '../ButtonC'
import { cnInput } from '../classNames'
import { Form, Input, Upload, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { IUploadC } from '.'

export const IpfsUpload = ({
  setHash,
  setFileList,
  fileList,
  hash,
  ...props
}: IUploadC) => {
  const handleChange: UploadProps['onChange'] = async (info) => {
    const { fileList: newFileList } = info
    console.log(newFileList)
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

          const ipfsHash = await ipfs(file.originFileObj as File)

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
          console.error(error)
          const errorFileList = [...newFileList]
          errorFileList[i] = { ...errorFileList[i], status: 'error' }
          setFileList(errorFileList)
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
      <Form.Item wrapperCol={{ offset: props.wrapperCol }} label={props.label}>
        {!fileList.length && (
          <Form.Item
            name={props.name}
            className={cn(
              !fileList.length && '!absolute !-bottom-2 translate-y-1/2'
            )}
            rules={props.rules}
          >
            <Input className={cn(cnInput, '!mt-[22px] !w-2 !h-2 !border-0')} />
          </Form.Item>
        )}
        <Upload
          disabled={props.disabled}
          multiple={false}
          maxCount={props.maxCount}
          fileList={fileList}
          listType={props.listType}
          accept='image/*'
          beforeUpload={() => false}
          onChange={handleChange}
          onPreview={async (file) => {
            const index = fileList.findIndex((f) => f.uid === file.uid)
            const ipfsHash = hash![index]
            window.open(`https://ipfs.io/ipfs/${ipfsHash}`)
          }}
        >
          {props.listType === 'picture' ? (
            <ButtonC
              variant='primary'
              icon={<UploadOutlined />}
              className={cn(
                '!text-white hover:!text-white !font-medium !text-base',
                props.className
              )}
            >
              {props.placeholder}
            </ButtonC>
          ) : fileList.length >= props.maxCount ? null : (
            <div className='h-full w-full flex flex-col items-center justify-center m-1 backdrop-blur-sm !overflow-hidden'>
              <UploadOutlined
                style={{
                  fontSize: '20px'
                }}
              />
              <div className='mt-2 text-base'>{props.placeholder}</div>
            </div>
          )}
        </Upload>
      </Form.Item>
    </div>
  )
}
