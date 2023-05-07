import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout, Space, Typography } from 'antd'
import {
  TeamOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  ProfileOutlined,
} from '@ant-design/icons'
import style from './index.module.css'

const { Title } = Typography

export const Footer = () => {
  return (
    <Layout.Footer className={style.footer}>
      <Space>
        <ProfileOutlined className={style.teamIcon1} />
        <Title level={5}>(p) 2023</Title>
      </Space>
    </Layout.Footer>
  )
}
