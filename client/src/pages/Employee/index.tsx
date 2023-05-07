import { EditOutlined, DeleteOutlined, DoubleLeftOutlined } from '@ant-design/icons'
import { Descriptions, Space, Divider, Modal } from 'antd'
import { CustomButton } from '../../components/CustomButton'
import { useState } from 'react'
import { Paths } from '../../pathsRoutes/paths'
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom'
import { useGetEmployeeQuery, useRemoveEmployeeMutation } from '../../app/serivices/employees'
import { Layout } from '../../components/Layout'
import { isErrorWithMessage } from '../../utils/isErrorWithMessage'
import { ErrorMessage } from '../../components/ErrorMessage'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { Spinner } from '../../components/Spinner'
import { useTranslation } from 'react-i18next'

export const Employee = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const params = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading } = useGetEmployeeQuery(params.id || '')
  const [removeEmployee] = useRemoveEmployeeMutation()
  const user = useSelector(selectUser)
	const { t, i18n } = useTranslation()

  if (isLoading) {
    // return <span>Загрузка</span>
		return (
        <Spinner />
    )
  }

  if (!data) {
    return <Navigate to='/' />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteUser = async () => {
    hideModal()

    try {
      await removeEmployee(data.id).unwrap()

      navigate(`${Paths.status}/deleted`)
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
      <Descriptions title={t('other.info')} bordered>
        <Descriptions.Item
          label={t('table.name')}
          span={3}
        >{`${data.firstName} ${data.lastName}`}</Descriptions.Item>
        <Descriptions.Item label={t('table.age')} span={3}>
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item label={t('table.adress')} span={3}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      <p>&nbsp;</p>
      <Space direction='vertical' style={{ display: 'flex' }}>
        <Link to={`/`}>
          <CustomButton shape='round' type='default' icon={<DoubleLeftOutlined />}>
            {t('btn.back')}
          </CustomButton>
        </Link>
      </Space>

      {user?.id === data.userId && (
        <>
          <Divider orientation='left'>{t('other.action')}</Divider>
          <Space>
            <Link to={`/employee/edit/${data.id}`}>
              <CustomButton shape='round' type='default' icon={<EditOutlined />}>
                {t('btn.edit')}
              </CustomButton>
            </Link>
            <CustomButton shape='round' danger onClick={showModal} icon={<DeleteOutlined />}>
              {t('btn.delete')}
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title={t('modal.title')}
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText={t('btn.confirm')}
        cancelText={t('btn.cancel')}
      >
        {t('modal.desc')}
      </Modal>
    </Layout>
  )
}
