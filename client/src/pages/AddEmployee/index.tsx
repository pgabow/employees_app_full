import { Row } from 'antd'
import { useState } from 'react'
import { EmployeeForm } from '../../components/EmployeeForm'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../../components/Layout'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import { useAddEmployeeMutation } from '../../app/serivices/employees'
import { Employee } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { Paths } from '../../pathsRoutes/paths'
import { useTranslation } from 'react-i18next'

export const AddEmployee = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [error, setError] = useState('')
  const [addEmployee] = useAddEmployeeMutation()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()

      navigate(`${Paths.status}/created`)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)

      if (maybeError) {
        setError(err.data.message)
      } else {
        setError('Неизвестная ошибка')
      }
    }
  }

  return (
    <Layout>
      <Row align='middle' justify='center'>
        <EmployeeForm
          onFinish={handleAddEmployee}
          title={t('addEmployee.title')}
          btnText={t('addEmployee.button')}
          error={error}
        />
      </Row>
    </Layout>
  )
}
