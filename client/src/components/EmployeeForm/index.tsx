import { Employee } from '@prisma/client'
import { Form, Card, Space } from 'antd'
import { CustomButton } from '../CustomButton'
import { CustomInput } from '../CustomInput'
import { ErrorMessage } from '../ErrorMessage'
import { useTranslation } from 'react-i18next'

type PropsEmployeeForm<T> = {
  onFinish: (values: T) => void
  btnText: string
  title: string
  error?: string
  employee?: T
}

export const EmployeeForm = ({
  onFinish,
  title,
  employee,
  btnText,
  error,
}: PropsEmployeeForm<Employee>) => {

  const { t, i18n } = useTranslation()

  return (
    <Card title={title} style={{ width: '30rem' }}>
      <Form name='add-employee' onFinish={onFinish} initialValues={employee}>
        <CustomInput type='text' name='firstName' placeholder={t('table.firstName')} />
        <CustomInput type='text' name='lastName' placeholder={t('table.lastName')} />
        <CustomInput type='number' name='age' placeholder={t('table.age')} />
        <CustomInput type='text' name='address' placeholder={t('table.adress')} />
        <Space direction='vertical' size='large'>
          <ErrorMessage message={error} />
          <CustomButton htmlType='submit'>{btnText}</CustomButton>
        </Space>
      </Form>
    </Card>
  )
}
