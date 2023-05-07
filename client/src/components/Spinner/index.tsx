import React from 'react'
import { Space, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import './index.css'

export const Spinner: React.FC = () => {
  const { t, i18n } = useTranslation()
  return (
    <div className='wrapper-spinner'>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Space align='center'>
          <Spin tip={t('spinner.title')} size='large'>
            <div className='content-spinner' />
          </Spin>
        </Space>
      </Space>
    </div>
  )
}
