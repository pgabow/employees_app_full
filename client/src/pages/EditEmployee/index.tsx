import { Employee } from '@prisma/client'
import { Row } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditEmployeeMutation, useGetEmployeeQuery } from '../../app/serivices/employees'
import { EmployeeForm } from '../../components/EmployeeForm'
import { Layout } from '../../components/Layout'
import { Paths } from '../../pathsRoutes/paths'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { Spinner } from '../../components/Spinner'
import { useTranslation } from 'react-i18next'

export const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [error, setError] = useState('')
  const { data, isLoading } = useGetEmployeeQuery(params.id || '')
  const [editEmployee] = useEditEmployeeMutation()
  const { t, i18n } = useTranslation()

  if (isLoading) {
    // return <span>Загрузка</span>
    return <Spinner />
  }

  const handleEditUser = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      }

      await editEmployee(editedEmployee).unwrap()

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
          onFinish={handleEditUser}
          title={t('editEmployee.title')}
          employee={data}
          btnText={t('editEmployee.button')}
          error={error}
        />
      </Row>
    </Layout>
  )
}
