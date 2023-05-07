import { useEffect } from 'react'
import { Button, Result, Row } from 'antd'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Status = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  const Statuses: Record<string, string> = {
    created: t('other.addEmpl'),
    updated: t('other.editEmpl'),
    deleted: t('other.deleteEmpl'),
  }
  const { status } = useParams()

  return (
    <Row align='middle' justify='center' style={{ width: '100%' }}>
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : t('other.notFound')}
        extra={
          <Button key='dashboard'>
            <Link to='/'>{t('other.btnBack')}</Link>
          </Button>
        }
      />
    </Row>
  )
}
