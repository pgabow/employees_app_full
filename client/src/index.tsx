import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { store, persistor } from './app/store'
import { ConfigProvider as ConfigThemeProvider, theme } from 'antd'
import { AddEmployee } from './pages/AddEmployee'
import { EditEmployee } from './pages/EditEmployee'
import { Employee } from './pages/Employee'
import { Employees } from './pages/Employees'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Status } from './pages/Status'
import { Auth } from './features/auth/auth'
import { Paths } from './pathsRoutes/paths'
import { Spinner } from './components/Spinner'
import  SpinSuspense  from './ui/SpinSuspense'
import { PersistGate } from 'redux-persist/integration/react'
import './style/globalStyle.scss'
import './i18n'
import NotFound from './pages/NotFound'

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Suspense fallback={<SpinSuspense />}>
      <ReduxStoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigThemeProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <Auth>
              <RouterProvider router={router} />
            </Auth>
          </ConfigThemeProvider>
        </PersistGate>
      </ReduxStoreProvider>
    </Suspense>
  </React.StrictMode>
)
