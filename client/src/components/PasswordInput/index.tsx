import { Form, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'
import { useTranslation } from 'react-i18next'

type PropsPasswordInput = {
  name: string
  placeholder: string
  dependencies?: NamePath[]
}

export const PasswordInput = ({ name, placeholder, dependencies }: PropsPasswordInput) => {
  const { t, i18n } = useTranslation()

  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: t('notice.required') as string,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve()
            }

            if (name === 'confirmPassword') {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(t('notice.passAlarmCheck') as string))
            } else {
              if (value.length < 6) {
                return Promise.reject(new Error(t('notice.passAlarm6') as string))
              }

              return Promise.resolve()
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size='large' />
    </Form.Item>
  )
}
