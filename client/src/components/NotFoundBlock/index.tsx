import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Result, Row } from 'antd'
import { useTranslation } from 'react-i18next'
import styles from './notFound.module.scss'

const NotFoundBlock: React.FC = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className={styles.root}>
      <div className={styles.smiley}>😕</div>
      <h1 className={styles.title}>{t('notFound.title')}</h1>
      <p className={styles.description}>{t('notFound.description')}</p>

      {/* <Link to='/'>
        <button className={styles.btn}>Вернуться на главную</button>
      </Link> */}
      <Button key='dashboard'>
        <Link to='/'>{t('notFound.back')}</Link>
      </Button>
    </div>
  )
}

export default NotFoundBlock
