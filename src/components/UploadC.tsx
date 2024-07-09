import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'
import { Upload } from 'antd'
import ButtonC from './ButtonC'
import axios from 'axios'

interface IUploadC {
  // eslint-disable-next-line no-unused-vars
  setHash: (data: string) => void
  // eslint-disable-next-line no-unused-vars
  setFileList: (data: UploadFile[]) => void
  fileList?: UploadFile[]
}

export default function UploadC({ setHash, setFileList, fileList }: IUploadC) {
  const handleChange: UploadProps['onChange'] = async (info) => {
    const newFileList = [...info.fileList]
    if (!newFileList.length || !newFileList[0].type?.includes('image')) {
      setFileList([])
      setHash('')
      return
    }

    setFileList([
      {
        ...newFileList[0],
        status: 'uploading',
        percent: 33
      }
    ])

    try {
      const fileData = new FormData()
      fileData.append('file', newFileList[0].originFileObj as File)
      const responseData = await axios({
        method: 'POST',
        url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        data: fileData,
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_KEY
        }
      })

      setHash(responseData.data.IpfsHash)
      setFileList([
        {
          ...newFileList[0],
          status: 'done'
        }
      ])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Upload
      multiple={false}
      maxCount={1}
      fileList={fileList}
      listType='picture'
      accept='image/*'
      beforeUpload={() => false}
      onChange={handleChange}
    >
      <ButtonC
        variant='primary'
        icon={<UploadOutlined />}
        className='!text-white hover:!text-white !font-medium !text-base'
      >
        Upload certificate
      </ButtonC>
    </Upload>
  )
}
