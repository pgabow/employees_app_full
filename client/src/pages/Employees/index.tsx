import React, { useEffect } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { PlusCircleOutlined } from '@ant-design/icons'
import { CustomButton } from '../../components/CustomButton'
import { Employee } from '@prisma/client'
import { Paths } from '../../pathsRoutes/paths'
import { useNavigate } from 'react-router-dom'
import { useGetAllEmployeesQuery } from '../../app/serivices/employees'
import { Layout } from '../../components/Layout'
import { selectUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'


export const Employees = () => {

	const { t, i18n } = useTranslation()

const columns: ColumnsType<Employee> = [
  {
    title: t('table.firstName'),
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: (a, b) => a.firstName.length - b.firstName.length,
  },
  {
    title: t('table.lastName'),
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: (a, b) => a.lastName.length - b.lastName.length,
  },
  {
    title: t('table.age'),
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => parseInt(a.age) - parseInt(b.age),
  },
  {
    title: t('table.adress'),
    dataIndex: 'address',
    key: 'address',
    sorter: (a, b) => a.address.length - b.address.length,
  },
]

	const navigate = useNavigate()
  const user = useSelector(selectUser)
  const { data, isLoading } = useGetAllEmployeesQuery()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const goToAddUser = () => navigate(Paths.employeeAdd)

  return (
    <Layout>
      <CustomButton type='primary' onClick={goToAddUser} icon={<PlusCircleOutlined />}>
        {t('btn.add')}
      </CustomButton>
      <Table
        loading={isLoading}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          }
        }}
      />
    </Layout>
  )
}
