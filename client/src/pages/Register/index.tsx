import { User } from '@prisma/client'
import { Card, Form, Row, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../app/serivices/auth'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { ErrorMessage } from '../../components/ErrorMessage'
import { Layout } from '../../components/Layout'
import { PasswordInput } from '../../components/PasswordInput'
import { selectUser } from '../../features/auth/authSlice'
import { Paths } from '../../pathsRoutes/paths'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { useTranslation } from 'react-i18next'

type RegisterData = Omit<User, 'id'> & { confirmPassword: string }

export const Register = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [error, setError] = useState('')
  const [registerUser] = useRegisterMutation()
	const { t, i18n } = useTranslation()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()

      navigate('/')
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
        <Card title={t('registration.signin')} style={{ width: '30rem' }}>
          <Form onFinish={register}>
            <CustomInput type='text' name='name' placeholder={t('table.firstName')} />
            <CustomInput type='email' name='email' placeholder={t('table.email')} />
            <PasswordInput name='password' placeholder={t('login.password')} />
            <PasswordInput name='confirmPassword' placeholder={t('login.confirmPassword')} />
            <CustomButton type='primary' htmlType='submit'>
              {t('registration.login')}
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              {t('registration.noaccount')}{' '}
              <Link to={Paths.login}>{t('registration.loginBtn')}</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
