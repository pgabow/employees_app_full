import React from 'react'
import { Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'

type PropsCustomInput = {
  name: string
  placeholder: string
  type?: string
}

export const CustomInput = ({ type = 'text', name, placeholder }: PropsCustomInput) => {
  const { t, i18n } = useTranslation()

  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: t("notice.required") as string }]}
      shouldUpdate={true}
    >
      <Input placeholder={placeholder} type={type} size='large' />
    </Form.Item>
  )
}
