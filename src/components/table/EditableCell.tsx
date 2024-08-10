import React, { useContext, useEffect, useRef, useState } from 'react'
import type { GetRef, InputRef } from 'antd'
import { Form, Input } from 'antd'
import { Rule } from 'antd/es/form'

type FormInstance<T> = GetRef<typeof Form<T>>

export const EditableContext =
  React.createContext<FormInstance<unknown> | null>(null)

interface EditableRowProps {
  index: number
}

export const EditableRow: React.FC<EditableRowProps> = ({
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  index,
  ...props
}) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps<T> {
  title: React.ReactNode
  isNumber: boolean
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof T
  record: T
  // eslint-disable-next-line no-unused-vars
  handleSave: (record: T) => void
}

export function EditableCell<T>({
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  title,
  editable,
  children,
  dataIndex,
  record,
  isNumber,
  handleSave,
  ...restProps
}: EditableCellProps<Partial<T>>) {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...(values as object) })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex as string}
        rules={[
          { required: true, message: '' },
          ...(isNumber
            ? [
                {
                  type: 'number',
                  min: 0,
                  message: '',
                  transform(value) {
                    return Number(value)
                  }
                } as Rule
                // eslint-disable-next-line indent
              ]
            : [])
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}
