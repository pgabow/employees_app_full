import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Switch, Layout, Space, Typography } from 'antd'
import { TeamOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { logout, selectUser } from '../../features/auth/authSlice'
import { CustomButton } from '../CustomButton'
import { useTranslation } from 'react-i18next'
import style from './index.module.css'

const { Title } = Typography

export const Header = () => {
  const { t, i18n } = useTranslation()

const onChange = (checked: boolean) => {
	checked ? i18n.changeLanguage('ru') : i18n.changeLanguage('en')
}

  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogoutClick = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <Layout.Header className={style.header}>
      <Space>
        <TeamOutlined className={style.teamIcon} />
        <Link to='/'>
          <CustomButton type='ghost'>
            <Typography.Title level={1}>{t('header.title')}</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <Space>
          <CustomButton type='ghost' icon={<UserOutlined />}>
            {t('header.hi')} <span className={style.span_user}>{user.name}</span>!
          </CustomButton>
          <CustomButton type='ghost' icon={<LogoutOutlined />} onClick={onLogoutClick}>
            {t('header.logout')}
          </CustomButton>
          <Switch
            className={style.button_wrap}
            checkedChildren='Ru'
            unCheckedChildren='En'
            defaultChecked={i18n.language === 'ru'}
            onChange={onChange}
          />
        </Space>
      ) : (
        <Space>
          <Link to='/register'>
            <CustomButton type='ghost' icon={<UserOutlined />}>
              {t('header.registration')}
            </CustomButton>
          </Link>
          <Link to='/login'>
            <CustomButton type='ghost' icon={<LoginOutlined />}>
              {t('header.login')}
            </CustomButton>
          </Link>
          <Switch
            className={style.button_wrap}
            checkedChildren='Ru'
            unCheckedChildren='En'
            defaultChecked={i18n.language === 'ru'}
            onChange={onChange}
          />
        </Space>
      )}
    </Layout.Header>
  )
}
