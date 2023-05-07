import { Card, Form, Row, Space, Typography } from 'antd'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation, UserData } from '../../app/serivices/auth'
import { CustomButton } from '../../components/CustomButton'
import { CustomInput } from '../../components/CustomInput'
import { ErrorMessage } from '../../components/ErrorMessage'
import { Layout } from '../../components/Layout'
import { PasswordInput } from '../../components/PasswordInput'
import { selectUser } from '../../features/auth/authSlice'
import { Paths } from '../../pathsRoutes/paths'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { useTranslation } from 'react-i18next'

export const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const user = useSelector(selectUser)
  const [loginUser, loginUserResult] = useLoginMutation()
	const { t, i18n } = useTranslation()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()

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
        <Card title={t('login.signin')} style={{ width: '30rem' }}>
          <Form onFinish={login}>
            <CustomInput type='email' name='email' placeholder={t('login.email')} />
            <PasswordInput name='password' placeholder={t('login.password')} />
            <CustomButton type='primary' htmlType='submit' loading={loginUserResult.isLoading}>
              {t('login.login')}
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography.Text>
              {t('login.noaccount')} <Link to={Paths.register}>{t('login.registrationBtn')}</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}
