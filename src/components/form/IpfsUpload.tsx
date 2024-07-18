import cn from '../../utils/cn'
import UploadC from '../IpfsUpload/UploadC'
import { cnInput } from './constForm'
import { Form, Input, UploadFile } from 'antd'

interface IUploadC {
  // eslint-disable-next-line no-unused-vars
  setHash: (hash: string) => void
  fileList: UploadFile[]
  // eslint-disable-next-line no-unused-vars
  setFileList: (fileList: UploadFile[]) => void
}

const IpfsUpload = ({ setHash, fileList, setFileList }: IUploadC) => {
  return (
    <div className={cn(!fileList.length && 'relative')}>
      {!fileList.length && (
        <Form.Item
          name='imgCert'
          className={cn(!fileList.length && '!absolute top-0')}
          rules={[
            { required: true, message: 'Please upload your certificate' }
          ]}
        >
          <Input className={cn(cnInput, '!mt-[22px] !w-2 !h-2')} />
        </Form.Item>
      )}
      <Form.Item>
        <UploadC
          setHash={setHash}
          fileList={fileList}
          setFileList={setFileList}
        />
      </Form.Item>
    </div>
  )
}

export default IpfsUpload
