import type { GetRef, InputRef } from 'antd'
import { Form, Input } from 'antd'
import { Rule } from 'antd/es/form'
import React, { useContext, useEffect, useRef, useState } from 'react'

type FormInstance<T> = GetRef<typeof Form<T>>

export const EditableContext =
  React.createContext<FormInstance<unknown> | null>(null)

interface EditableRowProps {
  index: number
}

export const EditableRow: React.FC<EditableRowProps> = ({
  index: _,
  ...props
}) => {
  const [form] = Form.useForm()
  return (
    <Form component={false} form={form}>
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
  handleSave: (record: T) => void
}

export function EditableCell<T>({
  title: _,
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
              ]
            : [])
        ]}
        style={{ margin: 0 }}
      >
        <Input ref={inputRef} onBlur={save} onPressEnter={save} />
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
